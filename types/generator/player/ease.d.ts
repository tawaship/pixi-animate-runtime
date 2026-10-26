/**
 * The eases of CreateJS (createjs.Ease), computed as CreateJS computes them,
 * by name. Runtime content names the ease of an interpolated stretch of a
 * tween; the player computes the stretch's values with it once, when a symbol's
 * class is made. `get:<amount>` is Ease.get(amount) (Animate's classic ease).
 */
export type TEase = (t: number) => number;
/** The ease runtime content names (null for a name the player does not know) */
export declare function easeOf(id: string): TEase | null;
/** The eases the generator tries for a stretch of a tween, by name: the named ones, then Ease.get(-1 .. 1) in hundredths */
export declare function easeIds(): string[];
