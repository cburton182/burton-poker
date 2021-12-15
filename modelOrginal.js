/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

/* export const state = {
  dealer: {
    preFlopDealt: false,
    flopDealt: false,
    turnDealt: false,
    riverDealt: false,
  },
  cards: {
    hero: [],
    villain: [],
    board: [],
  },
  handRank: {
    hero: [],
    villain: [],
  },
};

const updateHands = function (card) {
  if (!state.dealer.flopDealt) {
    state.cards.hero.push(...state.cards.board);
    state.cards.villain.push(...state.cards.board);
  } else {
    state.cards.board.push(card);
    state.cards.hero.push(card);
    state.cards.villain.push(card);
  }
};

const shortHand = (arr) => arr.map((card) => card.shorthand);

const showHands = function () {
  console.log(`Hero | ${shortHand(state.cards.hero).join(" ")}`);
  console.log(`Villain | ${shortHand(state.cards.villain).join(" ")}`);
  state.cards.board.length > 0 &&
    console.log(`Board | ${shortHand(state.cards.board).join(" ")}`);
};

export const dealPreFlop = function () {
  for (let i = 0; i < 2; i++) {
    state.cards.villain.push(deck.deal());
    state.cards.hero.push(deck.deal());
  }
  showHands();
  state.dealer.preFlopDealt = true;
};

export const dealFlop = function () {
  for (let i = 0; i < 3; i++) {
    state.cards.board.push(deck.deal());
  }
  updateHands();
  state.dealer.flopDealt = true;
};

export const dealTurn = function () {
  const turnCard = deck.deal();
  updateHands(turnCard);

  state.dealer.turnDealt = true;
};

export const dealRiver = function () {
  const riverCard = deck.deal();
  updateHands(riverCard);
  showHands();
  state.handRank.hero.push(...shortHand(state.cards.hero));
  console.log(state.handRank.hero);
  state.dealer.riverDealt = true;
};

export const init = function () {
  state.dealer.preFlopDealt = false;
  state.dealer.flopDealt = false;
  state.dealer.turnDealt = false;
  state.dealer.riverDealt = false;

  state.cards.hero = [];
  state.cards.villain = [];
  state.cards.board = [];
};
 */
