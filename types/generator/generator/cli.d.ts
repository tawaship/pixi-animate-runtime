export interface ICliIO {
    stdout(text: string): void;
    stderr(text: string): void;
    /** Asks a question and gives the answer; absent when nobody can answer (not a terminal) */
    ask?(question: string): Promise<string>;
    /** The directory relative paths are taken from */
    cwd?: string;
}
/**
 * The command line tool. Returns the exit code: 0 when every content was
 * written, 1 when some could not be (unsupported features without --force,
 * images the content uses that are missing) or the user declined, 2 for
 * usage and loading errors.
 */
export declare function runCli(args: string[], io: ICliIO): Promise<number>;
