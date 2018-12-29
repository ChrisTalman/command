'use strict';

// External Modules
import { promisify } from 'util';
import { exec as executeCallback } from 'child_process';
const execute = promisify(executeCallback);

// Types
import { ExecException } from 'child_process';
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
    public async execute()
    {
        const command = this.generateCommand();
        const result: Result = await execute(command);
        return result;
    };
    private generateCommand()
    {
        let command = this.command;
        for (let item of this.map) command += ' ' + item[0] + ' ' + item[1];
        return command;
    };
};