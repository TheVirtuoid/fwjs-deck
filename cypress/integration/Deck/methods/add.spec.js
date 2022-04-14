import Deck from "../../../../src/Deck";
import Card from "@virtuoid/cards";

describe('add', () => {
	it('should add a card to a deck', () => {
		const deck = new Deck();
		deck.add(new Card());
		expect(deck.cardCount).to.equal(1);
	});
	it('should throw exception if argument is not a card', () => {
		const deck = new Deck();
		try {
			deck.add('bad');
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
})