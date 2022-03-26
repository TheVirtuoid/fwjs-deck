import { Card } from '@virtuoid/cards';

export class Deck {
	#cards;

	get cards() {
		return this.#cards;
	}

	get count() {
		return this.#cards.length;
	}

	constructor(args) {
		this.#cards = [];
		if (!args) {
			return;
		}
		if (!(args instanceof Array)) {
			args = [args];
		}
		this.#cards = args;
	}

	getSuit(suit) {
		if (!this.#cards) {
			return [];
		}
		return this.#cards.filter((card) => card.suit === suit);
	}

	getRank(rank) {
		if (!this.#cards) {
			return [];
		}
		return this.#cards.filter((card) => card.rank === rank);

	}
	getValue(value) {
		if (!this.#cards) {
			return [];
		}
		return this.#cards.filter((card) => card.value === value);
	}

	add(card) {
		if (!(card instanceof Card)) {
			return;
		}
		this.#cards.push(card);
	}

	// returns Card if found, otherwise undefined
	remove(card) {
		if (!card) {
			return this.#cards.shift();
		}
		if (!isNaN(card)) {
			if (card <= 0 || card >= this.count) {
				return;
			}
			const removedCard = this.#cards.splice(card, 1);
			if (removedCard.length) {
				return removedCard[0];
			} else {
				return;
			}
		}
		if (!(card instanceof Card)) {
			return;
		}
		const foundCard = this.#cards.findIndex((currentCard) => currentCard.is(card));
		if (foundCard === -1) {
			return;
		}
		this.remove(foundCard);
	}

	shuffle() {
		let index = this.#cards.length;
		while (index) {
			const cardToRemove = Math.floor(Math.random() * index);
			const card = this.remove(cardToRemove);
			this.add(card);
			index--;
		}
	}

	deal(deck) {
		const card = this.remove();
		if (card) {
			deck.add(card);
		}
	}

	// sorting is left up to the classes that extend this class
	sort() {
		return undefined;
	}

}