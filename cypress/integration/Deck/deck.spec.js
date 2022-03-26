import { Deck } from './../../../src/Deck/Deck.js';

import { Card } from "@virtuoid/cards";

const tenCards = [];
tenCards.push(new Card({ suit: 'a', rank: 'a', value: 1 }));
tenCards.push(new Card({ suit: 'a', rank: 'b', value: 2 }));
tenCards.push(new Card({ suit: 'a', rank: 'c', value: 3 }));
tenCards.push(new Card({ suit: 'b', rank: 'a', value: 1 }));
tenCards.push(new Card({ suit: 'b', rank: 'b', value: 2 }));
tenCards.push(new Card({ suit: 'b', rank: 'c', value: 3 }));
tenCards.push(new Card({ suit: 'c', rank: 'a', value: 1 }));
tenCards.push(new Card({ suit: 'c', rank: 'b', value: 2 }));
tenCards.push(new Card({ suit: 'c', rank: 'c', value: 3 }));
tenCards.push(new Card({ suit: 'j' }));

const clone = (deck) => {
	return deck.map((card) => new Card({
		suit: card.suit,
		rank: card.rank,
		value: card.value
	}));
}

describe('Deck creation', () => {
	it('should create an empty deck', () => {
		const deck = new Deck();
		expect(deck.count).to.equal(0);
	});
	it('should create a deck with one card', () => {
		const card = new Card({
			suit: 'suit',
			rank: 'rank',
			value: 1
		});
		const deck = new Deck(card);
		expect(deck.count).to.equal(1);
		expect(deck.cards instanceof Array).to.be.true;
		expect(deck.cards[0].suit).to.equal('suit');
	});
	it('should create a deck with ten cards', () => {
		const cards = clone(tenCards);
		const deck = new Deck(cards);
		expect(deck.count).to.equal(10);
	});
});

describe('Deck Retrieval/Comparisons', () => {
	it('should get an array of suits', () => {
		const deck = new Deck(clone(tenCards));
		const suits = deck.getSuit('a');
		expect(suits.length).to.equal(3);
	});
	it('should get an array of ranks', () => {
		const deck = new Deck(clone(tenCards));
		const suits = deck.getRank('a');
		expect(suits.length).to.equal(3);
	});
	it('should get an array of values',  () => {
		const deck = new Deck(clone(tenCards));
		const suits = deck.getValue(1);
		expect(suits.length).to.equal(3);
	});
	it('should NOT get an array of suits when suit does not match',  () => {
		const deck = new Deck(clone(tenCards));
		const suits = deck.getSuit('z');
		expect(suits.length).to.equal(0);
	});
	it('should NOT get an array of ranks when rank does not match',  () => {
		const deck = new Deck(clone(tenCards));
		const suits = deck.getRank('z');
		expect(suits.length).to.equal(0);
	});
	it('should NOT get an array of values when value does not match',  () => {
		const deck = new Deck(clone(tenCards));
		const suits = deck.getValue(0);
		expect(suits.length).to.equal(0);
	});
});

describe('Deck add/remove', () => {
	it('should add a card to the bottom of the deck', () => {
		const deck = new Deck(clone(tenCards));
		const card = new Card({suit: 'q', rank: 'q', value: 1 });
		deck.add(card);
		expect(deck.count).to.equal(11);
		expect(deck.cards[10].suit).to.equal('q');
	});
	it('should NOT add a card if the argument is not a Card', () => {
		const deck = new Deck(clone(tenCards));
		deck.add({});
		expect(deck.count).to.equal(10);
	});
	it('should remove the specified card from the deck', () => {
		const deck = new Deck(clone(tenCards));
		deck.remove(new Card({ suit: 'c', rank: 'a', value: 1 }));
		expect(deck.count).to.equal(9);
		expect(deck.getSuit('c').length).to.equal(2);
		expect(deck.getRank('a').length).to.equal(2);
		expect(deck.getValue(1).length).to.equal(2);
	});
	it('should NOT remove the specified card if the card is not in the deck', () => {
		const deck = new Deck(clone(tenCards));
		deck.remove(new Card({ suit: 'q', rank: 'q', value: 1 }));
		expect(deck.count).to.equal(10);
	});
	it('should remove the card from the top of the deck when no argument is given', () => {
		const deck = new Deck(clone(tenCards));
		deck.remove();
		expect(deck.count).to.equal(9);
		expect(deck.getSuit('a').length).to.equal(2);
		expect(deck.getRank('a').length).to.equal(2);
		expect(deck.getValue(1).length).to.equal(2);
	});
	it('should remove the card from the given index number', () => {
		const deck = new Deck(clone(tenCards));
		deck.remove(3);
		expect(deck.count).to.equal(9);
		expect(deck.getSuit('b').length).to.equal(2);
		expect(deck.getRank('a').length).to.equal(2);
		expect(deck.getValue(1).length).to.equal(2);
	});
	it('should NOT remove the card if the index number is out of range', () => {
		const deck = new Deck(clone(tenCards));
		deck.remove(-1);
		expect(deck.count).to.equal(10);
		deck.remove(11);
		expect(deck.count).to.equal(10);
	});
});

describe('Deck shuffle/sort/deal', () => {
	it('should shuffle the deck', () => {
		const deck = new Deck(clone(tenCards));
		deck.shuffle();
		const isShuffled = deck.cards.every((card, index) => card.is(tenCards[index]));
		expect(isShuffled).to.be.false;
	});
	it('should deal a single card from the deck to another deck', () => {
		const deck1 = new Deck(clone(tenCards));
		const deck2 = new Deck();
		deck1.deal(deck2);
		expect(deck2.count).to.equal(1);
		expect(deck1.count).to.equal(9);
		const card = deck2.cards[0];
		expect(card.suit).to.equal('a');
		expect(card.rank).to.equal('a');
		expect(card.value).to.equal(1);
	});
	// sorting is undefined in the basic Deck class. We expect decks to have individual sorting routines.
	it('should NOT sort the deck as sorting is undefined at the basic class level', () => {
		const deck = new Deck(clone(tenCards));
		const card = deck.remove();
		deck.add(card);
		deck.sort();
		expect(deck.cards[0].rank).to.equal('b');
		expect(deck.cards[9].rank).to.equal('a');
	});
});
