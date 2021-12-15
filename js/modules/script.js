"use strict";
// import { dealer } from "./dealer.js";
import view from "./view.js";
import { state } from "./model.js";

export const dealPreFlop = function () {
  state.dealPreFlop();
  view.dealPreFlop("hero", state.cards.hero);
  // console.log("Hero hole: ");
  // console.log(state.cards.hero);
  // console.log("Villain hole: ");
  // console.log(state.cards.villain);
  // view.dealPreFlop("villain", state.cards.villain);
};

export const dealFlop = function () {
  const description = state.dealFlop();
  view.dealFlop(state.cards.board, description);
};

export const dealTurn = function () {
  const description = state.dealTurn();
  view.dealTurnOrRiver(state.cards.board[3], description);
};

export const dealRiver = function () {
  const description = state.dealRiver();
  view.dealTurnOrRiver(state.cards.board[4], description);
};

export const flipVillainCards = function () {
  // view.flipVillainCards();
  // console.log("villain hole cards showdown");
  // console.log(state.cards.villain[0]);
  // console.log(state.cards.villain[1]);
  // console.log([state.cards.villain[0], state.cards.villain[1]]);

  view.flipVillainCards([state.cards.villain[0], state.cards.villain[1]]);
};

export const showDown = function () {
  return view.showDown(state.showDown());
};

export const handleDeal = function () {
  try {
    if (!state.dealer.preFlopDealt) {
      dealPreFlop();
    } else if (!state.dealer.flopDealt) {
      dealFlop();
    } else if (!state.dealer.turnDealt) {
      dealTurn();
    } else if (!state.dealer.riverDealt) {
      dealRiver();
    } else if (!state.dealer.showDown) {
      showDown();
    } else console.log("Hand is over!");
  } catch (err) {
    console.error(err);
  }
};

export const init = function () {
  state.init();
  // view.addHandlerDeal(handleDeal);
};
// init();
