import Card from "@virtuoid/cards";
import Deck from "../../../../src/Deck";

describe('sorting the cards', () => {
	let card1, card2, card3, card4, card5, deck;
	beforeEach( () => {
		card1 = new Card({ suit: 'a', rank: 'b', value: 1 });
		card2 = new Card({ suit: 'a', rank: 'e', value: 2 });
		card3 = new Card({ suit: 'a', rank: 'd', value: 3 });
		card4 = new Card({ suit: 'a', rank: 'a', value: 4 });
		card5 = new Card({ suit: 'a', rank: 'c', value: 5 });
		deck = new Deck({ cards: [card4, card1, card5, card3, card2 ] });
	});
	it('should sort based upon function', () => {
		deck.sort((cardA, cardB) => {
			return cardA.value - cardB.value;
		});
		expect(deck.findCard(card1)).to.equal(0);
		expect(deck.findCard(card2)).to.equal(1);
		expect(deck.findCard(card3)).to.equal(2);
		expect(deck.findCard(card4)).to.equal(3);
		expect(deck.findCard(card5)).to.equal(4);
	});
	it('should do nothing if no function is passed', () => {
		deck.sort();
		expect(deck.findCard(card1)).to.equal(1);
		expect(deck.findCard(card2)).to.equal(4);
		expect(deck.findCard(card3)).to.equal(3);
		expect(deck.findCard(card4)).to.equal(0);
		expect(deck.findCard(card5)).to.equal(2);
	});
});