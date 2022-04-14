import Deck from "../../../../src/Deck";

describe('cardCount', () => {
	it('should NOT change the cardCount', () => {
		const deck = new Deck();
		try {
			deck.cardCount = 2;
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});