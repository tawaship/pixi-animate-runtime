export interface ICliIO {
    stdout(text: string): void;
    stderr(text: string): void;
    /** Asks a question and gives the answer; absent when nobody can answer (not a terminal) */
    ask?(question: string): Promise<string>;
    /** The directory relative paths are taken from */
    cwd?: string;
}
/**
 * The command line tool: {@link planGeneration}, the plan listed (and, in a
 * terminal, confirmed; without one, written only with -y), then
 * {@link writeGeneration}. Returns the exit code: 0 when every content was
 * written, 1 when some could not be (unsupported features without --force,
 * images the content uses that are missing) or nothing was written for want of
 * a "y", 2 for usage and loading errors.
 */
export declare function runCli(args: string[], io: ICliIO): Promise<number>;
