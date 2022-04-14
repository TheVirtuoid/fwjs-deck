// deck.findCard(card)
//  returns index of the card in the array, or -1 if not found
//
// deck.findCard(card, { compare: true });

import { CardWithCompare, deckCards, deckCardsWithCompare } from "../../../fixtures/cards";
import Deck from "../../../../src/Deck";
import Card from "@virtuoid/cards";

const cardToTest = new Card({
	suit: 's1',
	rank: 'r1',
	value: 1
});

const cardCompareToTest = new CardWithCompare({
	suit: 's1',
	rank: 'r1',
	value: 1
});

describe('findCard', () => {
	it('should find the card', () => {
		const deck = new Deck({ cards: deckCards });
		const foundCard = deck.findCard(cardToTest);
		expect(foundCard).to.equal(0);
	});
	it('should NOT find the card', () => {
		const deck = new Deck({ cards: deckCards });
		const foundCard = deck.findCard(new Card());
		expect(foundCard).to.equal(-1);
	});
	it('should throw exception if argument is not a card', () => {
		const deck = new Deck({ cards: deckCards });
		try {
			deck.findCard('bad');
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError')
		}
	});
	it('should find the card using compare', () => {
		const deck = new Deck({ cards: deckCardsWithCompare });
		const foundCard = deck.findCard(cardCompareToTest, { compare: true });
		expect(foundCard).to.equal(0);
	});
	it('should NOT find the card using compare', () => {
		const deck = new Deck({ cards: deckCardsWithCompare});
		const foundCard = deck.findCard(new CardWithCompare(), { compare: true });
		expect(foundCard).to.equal(-1);
	});
});
