import Deck from "../../../../src/Deck/Deck";

describe('id', () => {
	it('should NOT change the id', () => {
		const deck = new Deck();
		try {
			deck.id = 'bad';
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});