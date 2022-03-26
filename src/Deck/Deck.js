import { Card } from '@virtuoid/cards';

export class Deck {
	#cards = [];

	/**
	 * Get the current collection
	 * @returns {Array<Card>}
	 */
	get cards() {
		return this.#cards;
	}

	/**
	 * Gets the current number of cards in the collection
	 * @returns {number}
	 */
	get count() {
		return this.#cards.length;
	}

	/**
	 * Constructs a new instance of the Deck class
	 * @param args {Array<Card>}
	 */
	constructor(args) {
		this.#cards = [];
		if (!args) {
			return;
		}
		if (!(args instanceof Array)) {
			args = [args];
		}
		args.forEach((card) => {
			if (card instanceof Card) {
				this.#cards.push(card);
			}
		});
		this.#cards = args;
	}

	/**
	 * Get a collection of cards that matches the given suit
	 * @param suit {*}
	 * @returns {Array<Card>}
	 */
	getSuit(suit) {
		return this.#cards.filter((card) => card.isSuit(suit));
	}

	/**
	 * Get a collection of cards that matches the given rank
	 * @param rank {*}
	 * @returns {Array<Card>}
	 */
	getRank(rank) {
		return this.#cards.filter((card) => card.isRank(rank));
	}

	/**
	 * Get a collection of cards that matches the given value
	 * @param value {*}
	 * @returns {Array<Card>}
	 */
	getValue(value) {
		return this.#cards.filter((card) => card.isValue(value));
	}

	/**
	 * Get a collection of cards using the compare method on the card
	 * @param cardToCompare {Card}
	 * @returns {Array<Card>}
	 */
	getComparison(cardToCompare) {
		return this.#cards.filter((card) => card.compare(cardToCompare));
	}

	/**
	 * Add a card to the 'end' or 'bottom' of the collection
	 * @param card {Card}
	 */
	add(card) {
		if (!(card instanceof Card)) {
			return;
		}
		this.#cards.push(card);
	}

	/**
	 * Remove a card from the collection
	 * @param card {Card | number | undefined}
	 * @returns {Card | undefined}
	 *
	 * There are three ways to call this routine:
	 * 		1. card === undefined: Removes and returns the 'top' card from the collection (indedx === 0)
	 * 		2. card === number: Removes and returns the card in lexical position based upon the value of 'card'
	 * 	 	3. card === Card: Removes and returns the specified card.
	 */
	remove(card = undefined) {
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

	/**
	 * Shuffles the deck.
	 */
	shuffle() {
		let index = this.#cards.length;
		while (index) {
			const cardToRemove = Math.floor(Math.random() * index);
			const card = this.remove(cardToRemove);
			this.add(card);
			index--;
		}
	}

	/**
	 * Deals a single card
	 * @param deck {Deck} Deck into which the card is dealt
	 *
	 * The card dealt will always come from the 'top' of deck (see the remove() method, Option 1)
	 */
	deal(deck) {
		const card = this.remove();
		if (card) {
			deck.add(card);
		}
	}

	/**
	 * Sorts the deck;
	 * @returns {undefined}
	 *
	 * This is an abstract method to be implemented by extending classes.
	 */
	sort() {
		return undefined;
	}

}