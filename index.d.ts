export class FazerRuntime {
    constructor(options?: { filename?: string, code?: string, argv?: string[] });
    run(ast: any): Promise<any>;
    global: Scope;
}

export class FazerError extends Error {
    constructor(message: string, meta?: any);
}

export class FazerParser {
    constructor();
    program(): any;
    input: any[];
    errors: any[];
}

export const lexer: {
    tokenize(code: string): { tokens: any[], errors: any[] };
};

export function prettyError(err: Error | FazerError, filename: string, code: string): string;

export class Scope {
    constructor(parent?: Scope);
    get(name: string): any;
    set(name: string, value: any, mut?: boolean): void;
    assign(name: string, value: any): void;
}
