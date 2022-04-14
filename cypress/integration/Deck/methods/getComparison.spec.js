import { CardWithCompare, deckCards, deckCardsWithCompare } from "../../../fixtures/cards";
import Deck from "../../../../src/Deck";

const cardToCompare = new CardWithCompare({
	value: 1
});

describe('getComparison', () => {
	it('should get a deck of cards given the card', () => {
		const deck = new Deck({ cards: deckCardsWithCompare });
		const returnedDeck = deck.getComparison(cardToCompare);
		expect(returnedDeck instanceof Deck).to.be.true
		expect(returnedDeck.cardCount).to.equal(9);
	});
	it('should NOT get a deck of cards given the card', () => {
		const deck = new Deck({ cards: deckCardsWithCompare });
		const returnedDeck = deck.getComparison(new CardWithCompare());
		expect(returnedDeck.cardCount).to.equal(0);
	});
	it('should throw exception if argument is not a card', () => {
		const deck = new Deck({ cards: deckCardsWithCompare });
		try {
			deck.getComparison('bad');
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});