'use strict';

// External Modules
import { promisify } from 'util';
import { exec as executeCallback, spawn } from 'child_process';
const execute = promisify(executeCallback);

// Types
import { ExecException, SpawnOptions } from 'child_process';
export interface Result
{
    stderr: string;
    stdout: string;
};
export interface ExecuteError extends ExecException, Result {};

/** Builder to construct commands for a command line. */
export default class Command
{
    public readonly command: string;
    private map: Map<string, string>;
    constructor(command: string)
    {
        this.command = command;
    };
    public set(name: string, value = '')
    {
        this.map.set(name, value);
    };
    public delete(name: string)
    {
        this.map.delete(name);
    };
    /** Compiles command into string. */
    public compile()
    {
        let command = this.command;
        for (let item of this.map) command += ' ' + item[0] + ' ' + item[1];
        return command;
    };
    /** Compiles and executes command as a child process. */
    public async execute()
    {
        const command = this.compile();
        const result: Result = await execute(command);
        return result;
    };
    /** Compiles and spawns command as a child process. */
    public spawn(options: SpawnOptions = {})
    {
        const command = this.compile();
        const process = spawn(command, options);
        return process;
    };
};