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

export function primeSeq() {
	if (!this.nextPrime) {
		this.nextPrime = 2;
	}
	let notPrime = true;
	let n = this.nextPrime + 1;
	const base = this;
	return {
		next() {
			while (notPrime) {
				let i = 2;
				let isPrime = true;
				while (i < n) {
					if (n % i === 0) {
						isPrime = false;
						break;
					}
					i++;
				}
				if (isPrime) {
					base.nextPrime = n;
					break;
				}
				n++;
			}
			return base.nextPrime;
		}
	}
}

export function partialSumSeq(...args) {
	if (!this.index || !this.current) {
		this.index = 0;
		this.current = 0;
	}
	if (!isNaN(args[this.index])) {
		this.current += args[this.index];
	} else if (this.current === 'end') {
		return;
	} else {
		this.current = 'end';
	}
	const base = this;
	return {
		next() {
			base.index++;
			return base.current;
		}
	}
}
