import { deckCards } from "../../../fixtures/cards";
import Deck from "../../../../src/Deck";
import Card from "@virtuoid/cards";

const cardToTest = new Card({
	suit: 's1',
	rank: 'r1',
	value: 1
});

describe('deal', () => {
	it('should deal 1 card off top to the other deck', () => {
		const sourceDeck = new Deck({ cards: deckCards });
		const sourceDeckCardCount = sourceDeck.cardCount;
		const destinationDeck = new Deck();
		sourceDeck.deal(destinationDeck);
		expect(sourceDeckCardCount - sourceDeck.cardCount).to.equal(1);
		expect(destinationDeck.cardCount).to.equal(1);
		expect(destinationDeck.findCard(cardToTest)).to.equal(0);
	});
	it('should throw exception if deck argument is invalid', () => {
		const sourceDeck = new Deck({ cards: deckCards });
		try {
			sourceDeck.deal('bad');
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
});