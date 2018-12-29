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
