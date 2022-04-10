import { deckCards } from "../../../fixtures/cards";
import Deck from "../../../../src/Deck/Deck";

describe('getValue', () => {
	it('should return a deck of cards based upon the value', () => {
		const deck = new Deck({ cards: deckCards });
		const returnedDeck = deck.getValue(1);
		expect(returnedDeck instanceof Deck).to.be.true;
		expect(returnedDeck.cardCount).to.equal(9);
	});
	it('should return an empty deck if value does not match', () => {
		const deck = new Deck({ cards: deckCards });
		const returnedDeck = deck.getValue(4);
		expect(returnedDeck.cardCount).to.equal(0);
	});
});