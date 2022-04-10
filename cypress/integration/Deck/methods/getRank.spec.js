import { deckCards } from "../../../fixtures/cards";
import Deck from "../../../../src/Deck/Deck";

describe('getRank', () => {
	it('should return a deck of cards based upon the rank', () => {
		const deck = new Deck({ cards: deckCards });
		const returnedDeck = deck.getRank('r1');
		expect(returnedDeck instanceof Deck).to.be.true;
		expect(returnedDeck.cardCount).to.equal(9);
	});
	it('should return an empty deck if rank does not match', () => {
		const deck = new Deck({ cards: deckCards });
		const returnedDeck = deck.getRank('bad');
		expect(returnedDeck.cardCount).to.equal(0);
	});
});