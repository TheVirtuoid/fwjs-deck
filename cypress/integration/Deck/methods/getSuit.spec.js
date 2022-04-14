import { deckCards } from "../../../fixtures/cards";
import Deck from "../../../../src/Deck";

describe('getSuit', () => {
	it('should return a deck of cards based upon the suit', () => {
		const deck = new Deck({ cards: deckCards });
		const returnedDeck = deck.getSuit('s1');
		expect(returnedDeck instanceof Deck).to.be.true;
		expect(returnedDeck.cardCount).to.equal(9);
	});
	it('should return an empty deck if suit does not match', () => {
		const deck = new Deck({ cards: deckCards });
		const returnedDeck = deck.getSuit('bad');
		expect(returnedDeck.cardCount).to.equal(0);
	});
});