/// <reference types="node" />
import { ExecException } from 'child_process';
export interface Result {
    stderr: string;
    stdout: string;
}
export interface ExecuteError extends ExecException, Result {
}
/** Builder to construct commands for a command line. */
export default class Command {
    readonly command: string;
    private map;
    constructor(command: string);
    set(name: string, value?: string): void;
    delete(name: string): void;
    /** Compiles command into string. */
    compile(): string;
    /** Compiles and executes command as a child process. */
    execute(): Promise<Result>;
    /** Compiles and spawns command as a child process. */
    spawn(): import("child_process").ChildProcess;
}
