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
interface Item
{
    name: string;
    value?: string;
};

/** Builder to construct commands for a command line. */
export default class Command
{
    public readonly command: string;
    /** Option items following the root command. */
    private readonly items: Array<Item>;
    constructor(command: string)
    {
        this.command = command;
        this.items = [];
    };
    /** Adds an option to the command. */
    public add(name: string, value?: string)
    {
        const item: Item = { name };
        if (typeof value === 'string') item.value = value;
        this.items.push(item);
    };
    /** Compiles command into string. */
    public compile()
    {
        let command = this.command;
        for (let item of this.items)
        {
            command += ' ' + item.name;
            if (typeof item.value === 'string') command += ' ' + item.value;
        };
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