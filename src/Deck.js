import { v4 as uuidV4 } from 'uuid';
import Card from "@virtuoid/cards";

export default class Deck {
	#id;
	#cards = [];

	/**
	 * Construct a new Deck
	 * @param {object} deckArguments Deck options to set initial values
	 * @param {Array<Card>} [deckArguments.cards] Cards to be initially inserted
	 * @param {string} [deckArguments.id] id of the deck
	 * @throws {TypeError} Throws if any one of the elements of 'cards' is not a Card
	 */
	constructor(deckArguments = {}) {
		let { cards = [], id = uuidV4() } = deckArguments;
		this.#validateCards(cards);
		this.#id = id;
		this.#cards = cards;
	}

	/**
	 * Getter for id (Read only, no setter)
	 * @returns {string}
	 */
	get id() {
		return this.#id;
	}

	/**
	 * Getter for number of cards (Read only, no setter)
	 * @returns {number}
	 */
	get cardCount() {
		return this.#cards.length;
	}

	/**
	 * Add a card to the deck
	 * @param {Card} card
	 * @throws {TypeError} Throws when argument is not a card
	 */
	add(card) {
		this.#validateCard(card);
		this.#cards.push(card);
	}

	/**
	 * Deal a card from the deck
	 * @param {Deck} toDeck
	 * @throws {TypeError} Throws when argument is not a Deck
	 *
	 * The card is dealt from the top of the deck and added to the deck in the argument
	 */
	deal(toDeck) {
		this.#validateDeck(toDeck);
		const removedCard = this.remove();
		if (removedCard) {
			toDeck.add(removedCard);
		}
	}

	/**
	 * Get a deck of cards using the Card.compare method
	 * @param {Card} card
	 * @returns {Deck}
	 * @throws {TypeError} Throws when the argument is not a Card
	 */
	getComparison(card) {
		this.#validateCard(card);
		return this.#compare('compare', card);
	}

	/**
	 * Get a deck of cards using the Card.isRank method
	 * @param {any} rank Works best as primitive value
	 * @returns {Deck}
	 */
	getRank(rank) {
		return this.#compare('isRank', rank);
	}

	/**
	 * Get a deck of cards using the Card.isSuit method
	 * @param {any} suit Works best as primitive value
	 * @returns {Deck}
	 */
	getSuit(suit) {
		return this.#compare('isSuit', suit);
	}

	/**
	 * Get a deck of cards using the Card.isValue method
	 * @param {any} value Works best as primitive value
	 * @returns {Deck}
	 */
	getValue(value) {
		return this.#compare('isValue', value);
	}

	/**
	 * Compares a propertyValue against a method on the card.
	 * @param {string} operator Represents the method to use
	 * @param {any} propertyValue The value on which the comparison is made
	 * @returns {Deck}
	 *
	 * This is a helper method for getComparison(), getSuit(), getRank(), and getValue()
	 */
	#compare(operator, propertyValue) {
		const retrievedCards = this.#cards.filter((deckCard) => deckCard[operator](propertyValue));
		return new Deck({ cards: retrievedCards });
	}

	/**
	 * Removes a card from the deck
	 * @param {Card | number | undefined }card See notes below
	 * @param {object} removeOptions
	 * @param {boolean} [removeOptions.compare] Use the 'compare' method instead of the 'is' method when searching
	 * @returns {Card | null} Returns null if the card cannot be found
	 * @throws {TypeError} When first argument is not one of the defined types
	 *
	 * This method can be called in one of three ways:
	 * 1. deck.remove() - Removes the top card (index 0)
	 * 2. deck.remove(number) - Removes the card referenced by an index (as in an array)
	 * 3. deck.remove(Card, [options]) - Removes a specified card, optionally using the remove options.
	 */
	remove(card, removeOptions = {}) {
		if (card === undefined) {
			return this.#removeBlank();
		}
		if (typeof(card) === 'number') {
			return this.#removeIndex(card);
		}
		if (card instanceof Card) {
			return this.#removeCard(card, removeOptions)
		}
		this.#validateCard(card);
	}

	/**
	 * Find a card in the deck
	 * @param {Card} card
	 * @param {object} findOptions
	 * @param {boolean} [findOptions.compare] Use 'compare' method instead of 'is' method when searching
	 * @returns {number} Returns -1 if the card cannot be found, otherwise the index number on the card
	 * @throws {TypeError} Throws if argument is not a Card
	 */
	findCard(card, findOptions = {}) {
		this.#validateCard(card);
		const { compare = false } = findOptions;
		return this.#cards.findIndex((deckCard) => {
			if (compare) {
				return card.compare(deckCard);
			} else {
				return card.is(deckCard);
			}
		});
	}

	/**
	 * Get the cards in the deck, return a cloned copy of them
	 * @returns {*[]}
	 */
	getCards() {
		return this.#cards.map((card) => card.clone());
	}

	/**
	 * Shuffle the deck
	 * Mutates the current deck by randomly shuffling the cards.
	 */
	shuffle() {
		let index = this.cardCount;
		while (index > 0) {
			const randomCardIndex = Math.floor(Math.random() * index);
			const tempCard = this.#cards[this.cardCount - 1];
			this.#cards[this.cardCount - 1] = this.#cards[randomCardIndex];
			this.#cards[randomCardIndex] = tempCard;
			index--;
		}
	}

	/**
	 * Sorts the deck
	 * @param {function} sortFunction
	 */
	sort(sortFunction) {
		if (typeof(sortFunction) !== 'function') {
			return;
		}
		this.#cards.sort(sortFunction);
	}

	/**
	 * Removes a card from the top of the deck
	 * @returns {Card | null} Returns null if card cannot be found;
	 */
	#removeBlank() {
		return this.#removeIndex(0);
	}

	/**
	 * Removes a card given a specified index
	 * @param {number} index
	 * @returns {Card | null}
	 */
	#removeIndex(index) {
		const cardToRemove = Math.trunc(index);
		if (index < 0 || index >= this.cardCount) {
			return null;
		}
		return this.#cards.splice(cardToRemove, 1)[0];
	}

	/**
	 * Removes a card
	 * @param {Card} card
	 * @param {object} removeOptions
	 * @param {boolean} [removeOptions.compare] Use 'compare' method instead of 'is' when searching
	 * @returns {Card | null}
	 */
	#removeCard(card, removeOptions) {
		const foundCard = this.findCard(card, removeOptions);
		return this.#removeIndex(foundCard);
	}

	/**
	 * Validate that the deck is an instance of Deck
	 * @param {Deck} deck
	 * @throws {TypeError} Throws if argument is not a deck
	 */
	#validateDeck(deck) {
		if (!(deck instanceof Deck)) {
			throw new TypeError(`"deck" argument is not an instance of Deck`);
		}
	}

	/**
	 * Validate that the card is an instance of Card
	 * @param {Card} card
	 * @throws {TypeError} Throws if argument is not a card
	 */
	#validateCard(card) {
		if (!(card instanceof Card)) {
			throw new TypeError(`"card" argument is not an instance of Card`);
		}
	}

	/**
	 * Validate that the array contains all instances of Card
	 * @param {Array<Card>} cards
	 * @throws {TypeError} Throws if argument is not an array OR if at least one element is not a Card instance
	 */
	#validateCards(cards) {
		if (!(cards instanceof Array)) {
			throw new TypeError(`"cards" argument must be an array`);
		}
		cards.every((card) => !!(this.#validateCard(card)));
	}
}