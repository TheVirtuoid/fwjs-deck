import Card from "@virtuoid/cards";
import Deck from "../../../../src/Deck";

describe('get a cloned copy of the cards', () => {
	it('should create a clone copy of the deck', () => {
		const cardA = new Card({ suit: 's1', rank: 'r1', value: 'v1' });
		const cardB = new Card({ suit: 's2', rank: 'r2', value: 'v2' });
		const cardC = new Card({ suit: 's3', rank: 'r3', value: 'v3' });
		const deck = new Deck({ cards: [cardA, cardB, cardC]});
		const clonedCards = deck.getCards();
		expect(clonedCards.length).to.equal(3);
		// this section checks to make sure the cards are NOT the exact same cards;
		expect(clonedCards.some((card) => card === cardA)).to.be.false;
		expect(clonedCards.some((card) => card === cardB)).to.be.false;
		expect(clonedCards.some((card) => card === cardC)).to.be.false;
		// this section checks to make sure the cards MATCH
		expect(clonedCards.some((card) => card.is(new Card({ suit: 's1', rank: 'r1', value: 'v1' })))).to.be.true;
		expect(clonedCards.some((card) => card.is(new Card({ suit: 's2', rank: 'r2', value: 'v2' })))).to.be.true;
		expect(clonedCards.some((card) => card.is(new Card({ suit: 's3', rank: 'r3', value: 'v3' })))).to.be.true;
	});
});