export function factorialSeq() {
	if (!this.n || !this.total) {
		this.n = 1;
		this.total = 1;
	}
	const base = this;
	return {
		next() {
			base.total = base.total * base.n++;
			return base.total
		}
	}
}

export function fibonacciSeq() {
	if (!this.a || !this.b) {
		this.a = 1;
		this.b = 0;
	}
	const base = this;
	return {
		next() {
			base.temp = base.a;
			base.a = base.a + base.b;
			base.b = base.temp;
			return base.a;
		}
	}
}

export function rangeSeq(start, step) {
	if (!this.start || !this.step) {
		this.start = start;
		this.step = step;
	}
	const base = this;
	return {
		next() {
			const value = base.start;
			base.start = base.start + base.step;
			return value;
		}
	}
}
