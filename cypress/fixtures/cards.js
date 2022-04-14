import Card from "@virtuoid/cards";

const deckCards = [
	new Card({ suit: 's1', rank: 'r1', value: 1 }),
	new Card({ suit: 's1', rank: 'r1', value: 2 }),
	new Card({ suit: 's1', rank: 'r1', value: 3 }),
	new Card({ suit: 's1', rank: 'r2', value: 1 }),
	new Card({ suit: 's1', rank: 'r2', value: 2 }),
	new Card({ suit: 's1', rank: 'r2', value: 3 }),
	new Card({ suit: 's1', rank: 'r3', value: 1 }),
	new Card({ suit: 's1', rank: 'r3', value: 2 }),
	new Card({ suit: 's1', rank: 'r3', value: 3 }),
	new Card({ suit: 's2', rank: 'r1', value: 1 }),
	new Card({ suit: 's2', rank: 'r1', value: 2 }),
	new Card({ suit: 's2', rank: 'r1', value: 3 }),
	new Card({ suit: 's2', rank: 'r2', value: 1 }),
	new Card({ suit: 's2', rank: 'r2', value: 2 }),
	new Card({ suit: 's2', rank: 'r2', value: 3 }),
	new Card({ suit: 's2', rank: 'r3', value: 1 }),
	new Card({ suit: 's2', rank: 'r3', value: 2 }),
	new Card({ suit: 's2', rank: 'r3', value: 3 }),
	new Card({ suit: 's3', rank: 'r1', value: 1 }),
	new Card({ suit: 's3', rank: 'r1', value: 2 }),
	new Card({ suit: 's3', rank: 'r1', value: 3 }),
	new Card({ suit: 's3', rank: 'r2', value: 1 }),
	new Card({ suit: 's3', rank: 'r2', value: 2 }),
	new Card({ suit: 's3', rank: 'r2', value: 3 }),
	new Card({ suit: 's3', rank: 'r3', value: 1 }),
	new Card({ suit: 's3', rank: 'r3', value: 2 }),
	new Card({ suit: 's3', rank: 'r3', value: 3 }),
];

class CardWithCompare extends Card {
	constructor(args) {
		super(args);
	}
	compare(card) {
		return this.value === card.value;
	}
}

const deckCardsWithCompare = [
	new CardWithCompare({ suit: 's1', rank: 'r1', value: 1 }),
	new CardWithCompare({ suit: 's1', rank: 'r1', value: 2 }),
	new CardWithCompare({ suit: 's1', rank: 'r1', value: 3 }),
	new CardWithCompare({ suit: 's1', rank: 'r2', value: 1 }),
	new CardWithCompare({ suit: 's1', rank: 'r2', value: 2 }),
	new CardWithCompare({ suit: 's1', rank: 'r2', value: 3 }),
	new CardWithCompare({ suit: 's1', rank: 'r3', value: 1 }),
	new CardWithCompare({ suit: 's1', rank: 'r3', value: 2 }),
	new CardWithCompare({ suit: 's1', rank: 'r3', value: 3 }),
	new CardWithCompare({ suit: 's2', rank: 'r1', value: 1 }),
	new CardWithCompare({ suit: 's2', rank: 'r1', value: 2 }),
	new CardWithCompare({ suit: 's2', rank: 'r1', value: 3 }),
	new CardWithCompare({ suit: 's2', rank: 'r2', value: 1 }),
	new CardWithCompare({ suit: 's2', rank: 'r2', value: 2 }),
	new CardWithCompare({ suit: 's2', rank: 'r2', value: 3 }),
	new CardWithCompare({ suit: 's2', rank: 'r3', value: 1 }),
	new CardWithCompare({ suit: 's2', rank: 'r3', value: 2 }),
	new CardWithCompare({ suit: 's2', rank: 'r3', value: 3 }),
	new CardWithCompare({ suit: 's3', rank: 'r1', value: 1 }),
	new CardWithCompare({ suit: 's3', rank: 'r1', value: 2 }),
	new CardWithCompare({ suit: 's3', rank: 'r1', value: 3 }),
	new CardWithCompare({ suit: 's3', rank: 'r2', value: 1 }),
	new CardWithCompare({ suit: 's3', rank: 'r2', value: 2 }),
	new CardWithCompare({ suit: 's3', rank: 'r2', value: 3 }),
	new CardWithCompare({ suit: 's3', rank: 'r3', value: 1 }),
	new CardWithCompare({ suit: 's3', rank: 'r3', value: 2 }),
	new CardWithCompare({ suit: 's3', rank: 'r3', value: 3 }),
];

const cloneDeckCards = () => {
	const returnedDeck = []
	deckCards.forEach( (card) => {
		returnedDeck.push(new Card({ suit: card.suit, rank: card.rank, value: card.value }));
	})
	return returnedDeck;
}

const cloneDeckCardsWithCompare = () => {
	const returnedDeck = []
	deckCardsWithCompare.forEach( (card) => {
		returnedDeck.push(new CardWithCompare({ suit: card.suit, rank: card.rank, value: card.value }));
	})
	return returnedDeck;
}

export { deckCardsWithCompare, deckCards, CardWithCompare, cloneDeckCardsWithCompare, cloneDeckCards };


