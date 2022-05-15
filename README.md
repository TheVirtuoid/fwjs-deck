# Fun With JavaScript - 'Deck' classes

This repository is for the 'Deck' class used in the Fun with JavaScript series (https://funwithjavascript.com).

## Versions

1.1.0 : New build and distribution version

1.0.3 : Modified to match tests

1.0.2 : Initial Version

## Installation

```
npm install --save @virtuoid/deck
```

## Dependencies

```@virtuoid/cards``` for the base Card class.

```uuid``` for unique IDs.

All cards within this deck must have as its base the Card class.

## Usage

```javascript
import Deck from '@virtuoid/deck';
import Card from '@virtuoid/cards'; // this can be any class that extends 'Card'

const deck = new Deck([
	new Card({ suit: 'Clubs', rank: 'A', value: 1 }),
	new Card({ suit: 'Diamonds', rank: 'A', value: 1 }),
	new Card({ suit: 'Hearts', rank: 'A', value: 1 }),
	new Card({ suit: 'Spades', rank: 'A', value: 1 })
]);
```
#### Properties
| Name      | R/W | Type   | Description                               |
|-----------|-----|--------|-------------------------------------------|
| id        | RO  | string | The ID for this deck                      |
| cardCount | RO  | number | The number of cards within the collection |

#### Methods
| Name                        | Returns   | Description                                                                                                                                     |
|-----------------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| getSuit(Card.suit)          | Deck      | Returns a new Deck of all cards that match the given suit, or an empty deck.                                                                    |
| getRank(Card.rank)          | Deck      | Returns a new Deck of all cards that match the given rank, or an empty deck.                                                                    |
| getValue(Card.value)        | Deck      | Returns a new Deck of all cards that match the given value, or an empty deck.                                                                   |
| getComparison(Card card)    | Deck      | Returns a new Deck of all cards that match the given card, using the card's ```compare()``` method                                              |
| findCard(Card card)         | number    | Returns index of card in deck, otherwise -1                                                                                                     |
| add(Card card)              | undefined | Adds a card to the deck. The card is placed as the last card in the deck                                                                        |
| remove()                    | Card      | Removes the top card from the deck. Returns ```undefined``` if no cards are in the deck.                                                        |
| remove(number cardPosition) | Card      | Removes a card from the deck based upon the position of the card given in the argument. Returns ```undefined``` if the card position is invalid |
| remove(Card card)           | Card      | Removes the card specified in the argument. Returns ```undefined``` if the card cannot be found.                                                |
| shuffle()                   | undefined | Shuffles the cards                                                                                                                              |
| sort(function sortFunction) | undefined | Sorts the cards. Uses same arguments as Array.sort() |
| deal(Deck deck)             | undefined | Deals a single card from the current deck to the deck in the argument. The card dealt is the top-most card in the collection (index = 0)        |

## Github

```
https://github.com/TheVirtuoid/fwjs-deck
```

