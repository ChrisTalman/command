/// <reference types="node" />
import { ExecException, SpawnOptions } from 'child_process';
export interface Result {
    stderr: string;
    stdout: string;
}
export interface ExecuteError extends ExecException, Result {
}
/** Builder to construct commands for a command line. */
export default class Command {
    readonly command: string;
    /** Option items following the root command. */
    private readonly items;
    constructor(command: string);
    /** Adds an argument to the command. */
    add(name: string, value?: string): void;
    /** Compiles whole command into string. */
    compile(): string;
    /** Compiles and executes command as a child process. */
    execute(): Promise<Result>;
    /** Compiles and spawns command as a child process. */
    spawn(options?: SpawnOptions): import("child_process").ChildProcess;
    /** Compiles arguments of command into string. */
    private compileArguments;
}
