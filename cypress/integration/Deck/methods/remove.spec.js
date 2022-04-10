// deck.remove(card)		- removes a Card
// deck.remove(index)		- remove a card from an index
// deck.remove()				- remove 1st card from the deck

// deck.remove(card, { compare: true })		 - remove the card based upon compare method

// return the card removed (or null)

import {
	CardWithCompare,
	cloneDeckCards,
	cloneDeckCardsWithCompare,
	deckCards,
	deckCardsWithCompare
} from "../../../fixtures/cards";
import { Card } from "@virtuoid/cards";
import Deck from "../../../../src/Deck/Deck";

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


describe('remove', () => {
	it('should remove the card based upon a Card argument', () => {
		const deck = new Deck({ cards: cloneDeckCards() });
		const deckCardCount = deck.cardCount;
		const removedCard = deck.remove(cardToTest);
		expect(removedCard.is(cardToTest)).to.be.true;
		expect(deckCardCount - deck.cardCount).to.equal(1);
	});
	it('should remove the card based upon an index argument', () => {
		const deck = new Deck({ cards: cloneDeckCards() });
		const deckCardCount = deck.cardCount;
		const removedCard = deck.remove(0);
		expect(removedCard.is(cardToTest)).to.be.true;
		expect(deckCardCount - deck.cardCount).to.equal(1);
	});
	it('should remove the top card based upon no argument', () => {
		const deck = new Deck({ cards: cloneDeckCards() });
		const deckCardCount = deck.cardCount;
		const removedCard = deck.remove();
		expect(removedCard.is(cardToTest)).to.be.true;
		expect(deckCardCount - deck.cardCount).to.equal(1);
	});
	it('should remove the card using the compare option', () => {
		const deck = new Deck({ cards: cloneDeckCardsWithCompare() });
		const deckCardCount = deck.cardCount;
		const removedCard = deck.remove(cardCompareToTest);
		expect(removedCard.is(cardCompareToTest)).to.be.true;
		expect(deckCardCount - deck.cardCount).to.equal(1);
	});
	it('should throw exception if argument specified is not number nor card', () => {
		const deck = new Deck();
		try {
			deck.remove('bad');
			expect(true).to.be.false;
		} catch (err) {
			expect(err.name).to.equal('TypeError');
		}
	});
	it('should return null if card is not removed', () => {
		const deck = new Deck({ cards: deckCards });
		const deckCardCount = deck.cardCount;
		const removedCard = deck.remove(-1);
		expect(removedCard).to.be.null
	});
});