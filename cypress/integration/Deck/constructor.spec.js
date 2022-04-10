
// new Deck({ id: string, cards: Array<string> });

import Deck from "../../../src/Deck/Deck";
import { Card } from "@virtuoid/cards";

describe('constructor', () => {
	it('should create a deck class', () => {
		const deck = new Deck();
		expect(deck instanceof Deck).to.be.true;
	});

	it('should create a deck class with zero cards', () => {
		const deck = new Deck({ cards: [] });
		expect(deck.cardCount).to.equal(0);
	});

	it('should create a deck class with one card', () => {
		const deck = new Deck({ cards: [new Card()] });
		expect(deck.cardCount).to.equal(1);
	});

	it('should throw exception if cards is not an array', () => {
		try {
			const deck = new Deck({ cards: 'bad' });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should throw exception if cards does not contain instances of cards', () => {
		try {
			const deck = new Deck({ cards: ['a', 'b', 'c'] });
			expect(true).to.be.false;
		} catch(err) {
			expect(err.name).to.equal('TypeError');
		}
	});

	it('should NOT be able to access "cards" property at all', () => {
		const deck = new Deck();
		const cards = deck.cards;
		expect(cards).to.be.undefined;
	});

	it('should create a "string" id as default', () => {
		const deck = new Deck()
		expect(typeof(deck.id)).to.equal('string');
	});

	it('should create an specified id', () => {
		const deck = new Deck({ id: 'id' })
		expect(deck.id).to.equal('id');
	});
});