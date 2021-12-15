const SUITS = ["club", "diamond", "heart", "spade"];
// prettier-ignore
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

// SUITS.flatMap((suit, i) => {
//   console.log({ suit, number: (i += 1) });
// });

////////////////////////////////////
//Helper Functions
const createDeck = function (suits, values) {
  let i = 0;
  return values.flatMap((value) =>
    suits.map((suit) => {
      const card = new Card(value, suit);
      card.number = ++i;
      const temp = `${card.value}${card.suit.slice(0, 1)}`;
      const shorthand = temp.replace("10", "T");
      // console.log(shorthand);

      card.shorthand = shorthand;
      return card;
    })
  );
};

// Random Number between 0 And 51 (indexes for cards)
const randomCard = function (deckLength) {
  return Math.floor(Math.random() * deckLength);
};
//////////////////////////////////////////

class Card {
  value;
  suit;
  // number;

  constructor(value, suit) {
    this.suit = suit;
    this.value = value;
    // this.number = number;
  }
}

//////////////////////////////////////////////

class Deck {
  #deck;

  constructor(newDeck = createDeck(SUITS, VALUES)) {
    this.newDeck = newDeck;
    // console.log(this.newDeck);
    this.reset();
    this.shuffle();
  }

  sendDeck() {
    return this.#deck;
  }

  reset() {
    this.#deck = this.newDeck;
  }

  shuffle() {
    const clone = [...this.#deck];
    // j = remaining cards (52 @ start)
    let j = clone.length,
      i;

    // while cards remain to be shuffled
    while (j) {
      // pick a remaining card
      i = Math.floor(Math.random() * j--);

      //and swap it with the first card
      [clone[j], clone[i]] = [clone[i], clone[j]];
    }
    this.#deck = clone;
    return this;
  }

  deal() {
    return this.#deck.pop();
  }

  showCards() {
    console.log(this.#deck);
    console.log(this.#deck.length);
  }
}

//////////////////////////////////////////////////

export const deck = new Deck();
// console.log(deck);

/* '2c': 1,
    '2d': 2,
    '2h': 3,
    '2s': 4,
    '3c': 5,
    '3d': 6,
    '3h': 7,
    '3s': 8,
    '4c': 9,
    '4d': 10,
    '4h': 11,
    '4s': 12,
    '5c': 13,
    '5d': 14,
    '5h': 15,
    '5s': 16,
    '6c': 17,
    '6d': 18,
    '6h': 19,
    '6s': 20,
    '7c': 21,
    '7d': 22,
    '7h': 23,
    '7s': 24,
    '8c': 25,
    '8d': 26,
    '8h': 27,
    '8s': 28,
    '9c': 29,
    '9d': 30,
    '9h': 31,
    '9s': 32,
    'tc': 33,
    'td': 34,
    'th': 35,
    'ts': 36,
    'jc': 37,
    'jd': 38,
    'jh': 39,
    'js': 40,
    'qc': 41,
    'qd': 42,
    'qh': 43,
    'qs': 44,
    'kc': 45,
    'kd': 46,
    'kh': 47,
    'ks': 48,
    'ac': 49,
    'ad': 50,
    'ah': 51,
    'as': 52 */
