/**
 * The eases of CreateJS (createjs.Ease), computed as CreateJS computes them,
 * by name. Runtime content names the ease of an interpolated stretch of a
 * tween; the player computes the stretch's values with it once, when a symbol's
 * class is made. `get:<amount>` is Ease.get(amount) (Animate's classic ease).
 */

export type TEase = (t: number) => number;

function powIn(pow: number): TEase {
	return t => Math.pow(t, pow);
}

function powOut(pow: number): TEase {
	return t => 1 - Math.pow(1 - t, pow);
}

function powInOut(pow: number): TEase {
	return t => ((t *= 2) < 1 ? 0.5 * Math.pow(t, pow) : 1 - 0.5 * Math.abs(Math.pow(2 - t, pow)));
}

function backIn(amount: number): TEase {
	return t => t * t * ((amount + 1) * t - amount);
}

function backOut(amount: number): TEase {
	return t => --t * t * ((amount + 1) * t + amount) + 1;
}

function backInOut(amount: number): TEase {
	amount *= 1.525;
	return t => ((t *= 2) < 1 ? 0.5 * (t * t * ((amount + 1) * t - amount)) : 0.5 * ((t -= 2) * t * ((amount + 1) * t + amount) + 2));
}

function elasticIn(amplitude: number, period: number): TEase {
	const pi2 = 2 * Math.PI;
	return t => {
		if (t == 0 || t == 1) {
			return t;
		}
		const s = period / pi2 * Math.asin(1 / amplitude);
		return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
	};
}

function elasticOut(amplitude: number, period: number): TEase {
	const pi2 = 2 * Math.PI;
	return t => {
		if (t == 0 || t == 1) {
			return t;
		}
		const s = period / pi2 * Math.asin(1 / amplitude);
		return amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1;
	};
}

function elasticInOut(amplitude: number, period: number): TEase {
	const pi2 = 2 * Math.PI;
	return t => {
		const s = period / pi2 * Math.asin(1 / amplitude);
		return (t *= 2) < 1
			? -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period))
			: amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * pi2 / period) * 0.5 + 1;
	};
}

function bounceOut(t: number): number {
	return 1 / 2.75 > t ? 7.5625 * t * t
		: 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
		: 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
		: 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
}

function bounceIn(t: number): number {
	return 1 - bounceOut(1 - t);
}

/** Ease.get(amount): Animate's classic ease, amount from -1 (in) to 1 (out) */
function classic(amount: number): TEase {
	amount = amount < -1 ? -1 : amount > 1 ? 1 : amount;
	return t => (amount == 0 ? t : amount < 0 ? t * (t * -amount + 1 + amount) : t * ((2 - t) * amount + (1 - amount)));
}

const EASES: { [name: string]: TEase } = {
	linear: t => t,
	quadIn: powIn(2), quadOut: powOut(2), quadInOut: powInOut(2),
	cubicIn: powIn(3), cubicOut: powOut(3), cubicInOut: powInOut(3),
	quartIn: powIn(4), quartOut: powOut(4), quartInOut: powInOut(4),
	quintIn: powIn(5), quintOut: powOut(5), quintInOut: powInOut(5),
	sineIn: t => 1 - Math.cos(t * Math.PI / 2),
	sineOut: t => Math.sin(t * Math.PI / 2),
	sineInOut: t => -0.5 * (Math.cos(Math.PI * t) - 1),
	backIn: backIn(1.7), backOut: backOut(1.7), backInOut: backInOut(1.7),
	circIn: t => -(Math.sqrt(1 - t * t) - 1),
	circOut: t => Math.sqrt(1 - --t * t),
	circInOut: t => ((t *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)),
	bounceIn, bounceOut,
	bounceInOut: t => (0.5 > t ? 0.5 * bounceIn(2 * t) : 0.5 * bounceOut(2 * t - 1) + 0.5),
	elasticIn: elasticIn(1, 0.3), elasticOut: elasticOut(1, 0.3), elasticInOut: elasticInOut(1, 0.3 * 1.5)
};

/** The ease runtime content names (null for a name the player does not know) */
export function easeOf(id: string): TEase | null {
	if (id.indexOf('get:') === 0) {
		return classic(Number(id.slice(4)));
	}
	return Object.prototype.hasOwnProperty.call(EASES, id) ? EASES[id] : null;
}

/** The eases the generator tries for a stretch of a tween, by name: the named ones, then Ease.get(-1 .. 1) in hundredths */
export function easeIds(): string[] {
	const ids = Object.keys(EASES);
	for (let n = -100; n <= 100; n++) {
		ids.push('get:' + n / 100);
	}
	return ids;
}
