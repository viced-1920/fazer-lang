#!/usr/bin/env node
"use strict";

/*
  Fazer v2 — interpreter "batteries included"
  - Chevrotain lexer/parser → AST
  - Runtime with scopes, functions, pipes, lists/maps, property/index access
  - Stdlib: fs/path/crypto/encoding/ui
*/

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { Lexer, createToken, EmbeddedActionsParser } = require("chevrotain");

/* ────────────────────────────────────────────────────────────────────────── */
/* Tokens                                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /[ \t\r\n]+/, group: Lexer.SKIPPED });
const Comment = createToken({ name: "Comment", pattern: /(#|\/\/)[^\n]*/, group: Lexer.SKIPPED });

const Assign = createToken({ name: "Assign", pattern: /:=/ });

const Arrow = createToken({ name: "Arrow", pattern: /->|→/ });
const DoublePipe = createToken({ name: "DoublePipe", pattern: /->>|\|>|→>/ });

const Case = createToken({ name: "Case", pattern: /case\b/ });
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
        { ALT: () => $.SUBRULE($.whileStmt) },
        { ALT: () => $.SUBRULE($.tryStmt) },
        {
          GATE: () => {
            const t1 = $.LA(1).tokenType;
            if (t1 === Mut) return true;
            const t2 = $.LA(2).tokenType;
            return t1 === Identifier && t2 === Assign;
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
      $.CONSUME(Assign);
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

    $.RULE("block", () => {
      const stmts = [];
      $.MANY(() => {
        const s = $.SUBRULE($.statement);
        if (s) stmts.push(s);
      });
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
      const op = $.OR([
        { ALT: () => $.CONSUME(GreaterEq).image },
        { ALT: () => $.CONSUME(LessEq).image },
        { ALT: () => $.CONSUME(Greater).image },
        { ALT: () => $.CONSUME(Less).image },
        { ALT: () => $.CONSUME(Eq).image },
        { ALT: () => $.CONSUME(NotEq).image },
      ]);
      const rhs = $.SUBRULE($.expression);
      return node("cmpPat", { op, rhs });
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
        const op = $.OR([
          { ALT: () => $.CONSUME(Eq).image },
          { ALT: () => $.CONSUME(NotEq).image },
        ]);
        const right = $.SUBRULE2($.relExpr);
        left = node("bin", { op, left, right, loc: left.loc ?? null });
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
            const tok = $.CONSUME(Not);
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
      ])
    );

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

    // register builtins in global scope
    const builtins = {
      println: (x = "") => (console.log(String(x)), null),
      print: (x = "") => (process.stdout.write(String(x)), null),
      ask: (prompt = "") => {
        process.stdout.write(String(prompt));
        const buf = Buffer.alloc(1);
        let str = "";
        try {
          while (true) {
            const n = fs.readSync(0, buf, 0, 1, null);
            if (n === 0) {
              if (str === "") return null;
              break;
            }
            const c = buf.toString();
            if (c === "\r") continue;
            if (c === "\n") break;
            str += c;
          }
          return str;
        } catch (e) {
          return null;
        }
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
          console.log("Exporting vars from module...");
          for (const [k, v] of rt.global.vars) {
              console.log("Exporting:", k, v);
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
      
      str_split: (s, d) => String(s).split(String(d)),
      str_replace: (s, a, b) => String(s).split(String(a)).join(String(b)), // simple replace all
      str_trim: (s) => String(s).trim(),
      str_upper: (s) => String(s).toUpperCase(),
      str_lower: (s) => String(s).toLowerCase(),
      
      random: () => Math.random(),
      round: (x) => Math.round(Number(x)),
      floor: (x) => Math.floor(Number(x)),
      ceil: (x) => Math.ceil(Number(x)),
      
      ls: (p) => { try { return fs.readdirSync(path.resolve(String(p || "."))); } catch(e) { return []; } },
      rm: (p) => { try { fs.rmSync(path.resolve(String(p)), { recursive: true, force: true }); return true; } catch(e) { return false; } },
      mkdir: (p) => { try { fs.mkdirSync(path.resolve(String(p)), { recursive: true }); return true; } catch(e) { return false; } },
      
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
          return null;
        }
      },
      
      server: (port, handlerName) => {
        const srv = http.createServer(async (req, res) => {
           // We need to call the Fazer function `handlerName`
           // But `this._call` requires scope context.
           // This is tricky in a sync interpreter loop.
           // For now, simple static server or basic response?
           // To do it properly, we need to invoke the runtime from the callback.
           // Since we are inside the class, we can do it!
           
           // We need to find the function in `this.fns`
           const fn = this.fns.get(handlerName);
           if (!fn) {
             res.writeHead(500);
             res.end("Handler not found");
             return;
           }
           
           // Construct request object
           const reqObj = {
             method: req.method,
             url: req.url,
             headers: req.headers
           };
           
           // Call handler(req) -> { status, body, headers }
           try {
             const inner = new Scope(fn.closure);
             inner.set(fn.params[0], reqObj, true); 
             const result = await this._execBlock(fn.body, inner);
             const out = (result instanceof ReturnSignal) ? result.value : result;
             
             const status = (out && out.status) || 200;
             const body = (out && out.body) || "";
             const headers = (out && out.headers) || {};
             
             res.writeHead(status, headers);
             res.end(String(body));
           } catch (e) {
             console.error(e);
             res.writeHead(500);
             res.end("Internal Server Error");
           }
        });
        srv.listen(Number(port));
        console.log(`Server listening on port ${port}`);
      },

      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, Number(ms))),
      
      fetch: async (url, opts = {}) => {
        return new Promise((resolve, reject) => {
           const req = https.request(url, { method: opts.method || "GET", headers: opts.headers || {} }, (res) => {
             let data = "";
             res.on("data", (chunk) => data += chunk);
             res.on("end", () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
           });
           req.on("error", reject);
           if (opts.body) req.write(String(opts.body));
           req.end();
        });
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
      
      window: (title, w, h, icon) => {
          this.native_ui_state.widgets = [{ type: 'window', title, w, h, icon }];
          return "window";
      },
      
      button: (id, text, x, y, w, h) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'Button', id, text, x, y, w, h });
          return id;
      },
      
      label: (id, text, x, y, w, h) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'Label', id, text, x, y, w, h });
          return id;
      },
      
      entry: (id, text, x, y, w, h) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'TextBox', id, text, x, y, w, h });
          return id;
      },

      textarea: (id, text, x, y, w, h) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'RichTextBox', id, text, x, y, w, h });
          return id;
      },
      
      checkbox: (id, text, x, y, w, h) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'CheckBox', id, text, x, y, w, h });
          return id;
      },
      
      progress: (id, val, x, y, w, h) => {
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'ProgressBar', id, text: val, x, y, w, h });
          return id;
      },
      
      combo: (id, items, x, y, w, h) => {
          // items should be comma separated string or list (handled in UI gen)
          const itemList = Array.isArray(items) ? items.join(",") : String(items);
          this.native_ui_state.widgets.push({ type: 'widget', cls: 'ComboBox', id, text: itemList, x, y, w, h });
          return id;
      },
      
      set_text: (id, val) => {
          if (!this.native_ui_state.updates.set_text) this.native_ui_state.updates.set_text = {};
          this.native_ui_state.updates.set_text[id] = val;
          return val;
      },
      
      msgbox: (msg) => {
           this.native_ui_state.updates.msgbox = String(msg);
           return true;
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
                      this.native_ui_state.updates = {}; // Reset
                      
                      if (handler) {
                          await this._call(handler, [event], this.global);
                      }
                      
                      res.writeHead(200, { "Content-Type": "application/json" });
                      res.end(JSON.stringify(this.native_ui_state.updates));
                  } catch(e) {
                      console.error(e);
                      res.writeHead(500); res.end("{}");
                  }
              }
         });
         
         srv.listen(port);
     
         // Generate PowerShell Script
         let ps = `
         Add-Type -AssemblyName System.Windows.Forms
         Add-Type -AssemblyName System.Drawing
         $url = "http://localhost:${port}/event"
         
         function Send-Event($id, $type, $val) {
             $body = @{id=$id; type=$type; value=$val} | ConvertTo-Json -Compress
             try {
                 $res = Invoke-RestMethod -Uri $url -Method POST -Body $body -ContentType "application/json"
                 if ($res.set_text) {
                     foreach($k in $res.set_text.PSObject.Properties) {
                         $c = $form.Controls.Find($k.Name, $true)
                         if ($c) { $c[0].Text = $k.Value }
                     }
                 }
                 if ($res.msgbox) { [System.Windows.Forms.MessageBox]::Show($res.msgbox) }
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
     
         ps += `
         $form = New-Object System.Windows.Forms.Form
         $form.Text = "${win.title}"
         ${iconCmd}
         $form.Width = ${win.w}
         $form.Height = ${win.h}
         $form.StartPosition = "CenterScreen"
         $form.BackColor = [System.Drawing.Color]::FromArgb(30, 30, 30)
         $form.ForeColor = [System.Drawing.Color]::White
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

             ps += `
             $${w.id} = New-Object System.Windows.Forms.${w.cls}
             $${w.id}.Name = "${w.id}"
             ${textProp}
             $${w.id}.Left = ${w.x}
             $${w.id}.Top = ${w.y}
             $${w.id}.Width = ${w.w}
             $${w.id}.Height = ${w.h}
             $${w.id}.Font = New-Object System.Drawing.Font("Segoe UI", 10)
             ${extra}
             `;
             
             if (w.cls === 'Button') {
                ps += `
                $${w.id}.FlatStyle = "Flat"
                $${w.id}.BackColor = [System.Drawing.Color]::FromArgb(60, 60, 60)
                $${w.id}.FlatAppearance.BorderSize = 0
                $${w.id}.Add_Click({ Send-Event "${w.id}" "click" "" })
                `;
            } else if (w.cls === 'TextBox' || w.cls === 'RichTextBox') {
                 ps += `
                 $${w.id}.BorderStyle = "FixedSingle"
                 $${w.id}.BackColor = [System.Drawing.Color]::FromArgb(50, 50, 50)
                 $${w.id}.ForeColor = [System.Drawing.Color]::White
                 $${w.id}.Add_TextChanged({ Send-Event "${w.id}" "change" $this.Text })
                 `;
            } else if (w.cls === 'CheckBox') {
                 ps += `
                 $${w.id}.ForeColor = [System.Drawing.Color]::White
                 $${w.id}.Add_CheckedChanged({ Send-Event "${w.id}" "change" $this.Checked })
                 `;
            } else if (w.cls === 'ComboBox') {
                 ps += `
                 $${w.id}.BackColor = [System.Drawing.Color]::FromArgb(50, 50, 50)
                 $${w.id}.ForeColor = [System.Drawing.Color]::White
                 $${w.id}.FlatStyle = "Flat"
                 $${w.id}.Add_SelectedIndexChanged({ Send-Event "${w.id}" "change" $this.SelectedItem })
                 `;
            }
             
             ps += `$form.Controls.Add($${w.id})\n`;
         }
     
         ps += `
         [void]$form.ShowDialog()
         `;
     
         // Run PS
         const b64 = Buffer.from(ps, 'utf16le').toString('base64');
         require('child_process').spawn('powershell', ['-EncodedCommand', b64], { stdio: 'inherit' });
         
         return new Promise(r => {}); 
      },

      argv: argvFn,
      env: envFn,
      cwd: cwdFn,
      input: (p) => builtins.ask(p),
      nowMs: () => Date.now(),
      
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
         const fullPath = path.resolve(String(p));
         if (!fs.existsSync(fullPath)) throw new FazerError(`Module not found: ${p}`);
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
         const http_req = builtins.http_req;
         return await http_req(url, opts);
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
    };

    this.global.set("__builtins__", builtins, false);
    // Also expose builtins as top-level identifiers (fast path)
    for (const [k, v] of Object.entries(builtins)) this.global.set(k, v, false);
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
    switch (stmt.type) {
      case "assign": {
        const val = await this._eval(stmt.value, scope);
        if (scope.hasHere(stmt.name)) {
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
           inner.set(stmt.errVar, { type: "str", value: e.message || String(e) }, false);
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

  const code = fs.readFileSync(filePath, "utf8");
  const lex = lexer.tokenize(code);
  if (lex.errors.length) {
    console.error("Lexer error:", lex.errors[0].message || String(lex.errors[0]));
    process.exit(1);
  }

  const parser = new FazerParser();
  parser.input = lex.tokens;
  const ast = parser.program();

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
