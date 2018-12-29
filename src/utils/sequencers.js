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
		}, reset() {
			base.total = 1;
			base.n = 1;
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
		},
		reset() {
			base.a = 1;
			base.b = 0;
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
		}, reset() {
			base.start = start;
			base.step = step;
		}

	}
}

export function primeSeq() {
	if (!this.nextPrime) {
		this.nextPrime = 1;
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
		},
		reset() {
			base.nextPrime = 2;
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
	} else {
		throw new Error('Sequence is out of values');
	}
	const base = this;
	return {
		next() {
			base.index++;
			return base.current;
		}, reset() {
			base.index = 0;
			base.current = 0;
		}
	}
}

export function generator(sequencerFunction, ...rest) {
	const func = sequencerFunction.bind(sequencerFunction);
	return {
		next() {
			return func(...rest).next()
		}, reset() {
			func(...rest).reset();
		}

	}
}

export function pipedSeq(sequencer, ...args) {
	const boundSequencer = sequencer.bind(sequencer);
	const updatedSequencer = (pipe) => {
		return () => {
			return {
				next() {
					return pipe(boundSequencer(...args).next());
				}, reset() {
					boundSequencer(...args).reset();
					pipe(boundSequencer(...args), true);
				}

			}
		};
	};
	const base = this;
	return {
		pipeline(pipe) {
			if (!base.pipe) {
				base.pipe = pipe();
			}
			if (!base.modifiedSeq) {
				base.modifiedSeq = updatedSequencer(base.pipe)
			}
			return this;
		},
		invoke() {
			return base.modifiedSeq;
		}
	}
}
export const accumulator = () => {
	let sum = 0;
	return function (value, reset = false) {
		if (reset) {
			sum = 0;
		} else {
			sum += value;
		}
		return sum;
	}
};

export const isEven = () => {
	return function (value) {
		return {status: (value % 2 === 0), number: value};
	}
};

export const pipelinesConfig = [
	{id: 1, label: 'Accumulator', pipelineRef: accumulator},
	{id: 2, label: 'isEven', pipelineRef: isEven},
];

const sequencersConfig = [
	{id: 1, label: 'Factorial', functionRef: factorialSeq, arguments: 0, dynamicArgs: false,},
	{id: 2, label: 'Fibonacci', functionRef: fibonacciSeq, arguments: 0, dynamicArgs: false,},
	{
		id: 3,
		label: 'Range',
		functionRef: rangeSeq,
		arguments: 2,
		dynamicArgs: false,
		instruction: 'Enter your function arguments in the inputs below and press the Next button below repeatedly to generate sequence of values'
	},
	{id: 4, label: 'Prime', functionRef: primeSeq, arguments: 0, dynamicArgs: false,},
	{
		id: 5,
		label: 'Partial Sum',
		functionRef: partialSumSeq,
		arguments: 5,
		dynamicArgs: true,
		instruction: 'Enter your function arguments in the inputs below and press the Next button below repeatedly to generate sequence of values'
	},
];

export default sequencersConfig;
