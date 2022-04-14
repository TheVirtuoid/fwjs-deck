import { cloneDeckCards, deckCards } from "../../../fixtures/cards";
import Deck from "../../../../src/Deck";

const deckShuffleCards = cloneDeckCards();

describe('shuffle', () => {
	it('should shuffle the cards', () => {
		const deck = new Deck({ cards: deckCards });
		deck.shuffle();
		const isDeckNotShuffled = deckShuffleCards.every((card, index) => {
			const targetCard = deck.findCard(card);
			return targetCard === index;
		});
		expect(isDeckNotShuffled).to.be.false;
	});
});