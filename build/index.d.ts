/// <reference types="node" />
/** Builder to construct commands for a command line. */
export default class Command {
    readonly command: string;
    private map;
    constructor(command: string);
    set(name: string, value?: string): void;
    delete(name: string): void;
    execute(): Promise<{
        stdout: string;
        stderr: string;
    }>;
    private generateCommand;
}
