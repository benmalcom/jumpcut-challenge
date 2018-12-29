import {
	generator,
	isEven,
	factorialSeq,
	fibonacciSeq,
	partialSumSeq,
	pipedSeq,
	rangeSeq,
	primeSeq, accumulator
} from '../utils/sequencers';

describe('Test factorialSeq generator: ', () => {
	it('Generates expected sequence', () => {
		const gen = generator(factorialSeq);
		expect(gen).toHaveProperty('next');
		expect(gen.next()).toEqual(1);
		expect(gen.next()).toEqual(2);
		expect(gen.next()).toEqual(6);
		expect(gen.next()).toEqual(24);
	});
});

describe('Test fibonacciSeq generator: ', () => {
	it('Generates expected sequence', () => {
		const gen = generator(fibonacciSeq);
		expect(gen).toHaveProperty('next');
		expect(gen.next()).toEqual(1);
		expect(gen.next()).toEqual(2);
		expect(gen.next()).toEqual(3);
		expect(gen.next()).toEqual(5);
		expect(gen.next()).toEqual(8);
	});
});

describe('Test rangeSeq generator: ', () => {
	it('Generates expected sequence', () => {
		const gen = generator(rangeSeq, 1, 2);
		expect(gen).toHaveProperty('next');
		expect(gen.next()).toEqual(1);
		expect(gen.next()).toEqual(3);
		expect(gen.next()).toEqual(5);
		expect(gen.next()).toEqual(7);
	});
});

describe('Test partialSumSeq generator: ', () => {
	it('Generates expected sequence', () => {
		const gen = generator(partialSumSeq, 1, 3, 7, 2, 0);
		expect(gen).toHaveProperty('next');
		expect(gen.next()).toEqual(1);
		expect(gen.next()).toEqual(4);
		expect(gen.next()).toEqual(11);
		expect(gen.next()).toEqual(13);
		expect(gen.next()).toEqual(13);
		expect(gen.next()).toEqual('end');
	});
});

describe('Test primeSeq generator: ', () => {
	it('Generates expected sequence', () => {
		const gen = generator(primeSeq);
		expect(gen).toHaveProperty('next');
		expect(gen.next()).toEqual(3);
		expect(gen.next()).toEqual(5);
		expect(gen.next()).toEqual(7);
		expect(gen.next()).toEqual(11);
		expect(gen.next()).toEqual(13);
	});
});

describe('Test rangeSeq generator with pipeline(accumulator): ', () => {
	it('Generates expected sequence', () => {
		const _pipedSeq = pipedSeq.call(pipedSeq, rangeSeq, 2, 3) // 2, 5, 8, 11
			.pipeline(accumulator) // 2, 7(5+2), 15(7+8), 26(15+11)
			.invoke();
		const gen = generator(_pipedSeq);
		expect(gen.next()).toEqual(9);
		expect(gen.next()).toEqual(20);
	});
});
