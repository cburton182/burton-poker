import { wait } from "./helpers.js";
import { state } from "./model.js";
import { getRange } from "./AI_Strategy/PreFlop/rangeSelectorPF.js";
import { calcMDF, calcRaise } from "./AI_Strategy/raiseCalculator.js";

import { categorizeHand } from "./AI_Strategy/PreFlop/helpersPF.js";

import {
  toNumericSmall,
  returnNumber,
} from "./AI_Strategy/PreFlop/helpersPF.js";

import {
  calcOpenEnded,
  calcDblGutShot,
  calcTopPairPlus,
  postFlopDecision,
} from "./AI_Strategy/PostFlop/helpersPost.js";

import { getRangePost } from "./AI_Strategy/PostFlop/postFlopRangeSelector.js";

import {
  mdfPre5,
  mdfPre10,
  mdfPre20,
} from "./AI_Strategy/PreFlop/SBRangesPF.js";

import { mdfPost85 } from "./AI_Strategy/PostFlop/buttonRangesFlop.js";

// import { BBRanges } from "./AI_Strategy/PreFlop/BB.js";

// const street = "pre";

// let aggressor = false;

export const villainAI = async function (
  villain,
  canCheck,
  street,
  pot,
  heroInvested,
  heroStack,
  heroIsAggressor
) {
  // console.log(villain);
  const MDF = calcMDF(pot, heroInvested);
  console.log("MDF = " + MDF);
  const raiseAmount = calcRaise(
    villain.stackSize,
    heroStack,
    pot,
    heroInvested,
    canCheck,
    villain.invested
  );
  console.log(street);
  console.log(raiseAmount);
  await wait(1);
  if (street === "preFlop") {
    let range;
    console.log(`****MDF**** ${MDF}`);
    const hand = getHandPre();
    if (MDF <= 0.05) {
      //mdf 5%
      console.log("5% RANGE");
      range = mdfPre5;
    } else if (MDF <= 0.1) {
      //mdf 10%
      console.log("10% RANGE");
      range = mdfPre10;
    } else if (MDF <= 0.2) {
      //mdf 20%
      console.log("20% RANGE");
      range = mdfPre20;
    } else {
      console.log("USING USUAL PF RANGES");
      range = getRange(villain.isButton, villain.action, canCheck);
    }
    const decision = range.get(hand);
    console.log(range);
    console.log("DECISION: " + decision);
    postFlopDecision(decision, raiseAmount, villain);
  } else {
    let range;
    const hand = getHandPost();
    console.log("GETHAND: " + hand);
    console.log("waiting for Villain");
    if (MDF >= 0.85 && MDF < 1) {
      console.log("MDF HIGH: using MDF Post Range");
      range = mdfPost85;
    } else {
      console.log("Using normal Post Ranges");
      range = getRangePost(
        villain.isButton,
        villain.action,
        canCheck,
        villain.aggressor,
        villain.invested,
        heroIsAggressor,
        street
      );
    }
    console.log(range);
    //const hand = getHandPost();
    const decision = range[hand];
    console.log("DECISION: " + decision);
    postFlopDecision(decision, raiseAmount, villain);
    //const range = getRangePost(isButton, action, aggressor, MDF, canCheck);
    // getRangePost.get(hand);
    //switch fold, check, call, raise.
    // if raise/ raise 75%, call 25%
    // if bluff/ raise 75%, fold 25%
    // if call/ call 100%
    //if fold fold 100%
    //in get hand Post return rank. if rank is 1
    //range = getRangePost(villain.isButtton, villain.action, canCheck)
  }
};

const getHandPre = function () {
  console.log(state.hands.villain.hand);
  const newFormat = categorizeHand(state.hands.villain.hand);
  console.log(newFormat);
  return newFormat;
};

const getHandPost = function () {
  const handPost = state.hands.villain.finalHand;

  // console.log(`HOLE CARDS`);
  const holeCards = getHoleCards();
  console.log(holeCards);
  const boardCards = getBoardCards();
  console.log("BOARD CARDS");
  console.log(boardCards);
  const rank = handPost.rank;
  console.log(handPost);
  // console.log("RANK: " + rank);
  // console.log("RANK: " + typeof rank);
  const cardPool = handPost.cardPool.map((card) => card.rank);

  /*     range,
    straight,
    threeKind,
    twoPair,
    topPair,
    pair,
    flushDraw,
    openEnded,
    dblGutter,
    overs
    air */
  if (rank >= 5) {
    // villain has straight or better
    console.log("villain has a straight or better");
    return "straight";
  } else if (rank === 4) {
    // villain has set
    console.log("villain has a set");
    return "threeKind";
  } else if (rank === 3) {
    //villain has 2pair
    console.log("hand is two pair or better");
    return "twoPair";
  } else if (rank === 2) {
    console.log("hand is a pair");
    console.log(handPost.descr);
    const topPair = calcTopPairPlus(holeCards, boardCards);
    console.log("TOP PAIR: " + topPair);
    return topPair ? "topPair" : "pair";
    //over pairs
  } else {
    const flushDraw = calcFlushDraw(handPost.suits);
    const twoOvers = calcTwoOvers(holeCards, handPost.cardPool);
    const openEnded = calcOpenEnded(cardPool);
    const dblGutShot = calcDblGutShot(cardPool);
    console.log("hand is high card");
    console.log(handPost.descr);
    console.log("flush draw : " + flushDraw);
    console.log("two overs : " + twoOvers);
    console.log("open ended: " + openEnded);
    console.log("dbl gutShot: " + dblGutShot);
    if (flushDraw) return "flushDraw";
    else if (openEnded) return "openEnded";
    else if (dblGutShot) return "dblGutter";
    else if (twoOvers) return "overs";
    else return "air";
  }
  // get rank of hand.
  // if rank is 1, calc flush draw or overs. return 1 or bluff
  // if rank is 2, calc Pair Kings or Pair Aces. return 2 or Pair Aces/Kings
  // if rank > 2 return rank.
};

// const suitss = {
//   c: ["a"],
//   d: ["a", "a"],
//   s: ["a", "a"],
//   h: ["a", "a", "a", "a"],
// };

const calcFlushDraw = function (suits) {
  return Object.entries(suits).some((arr) => arr[1].length === 4);
};

const getHoleCards = function () {
  const [hole1, hole2] = state.hands.villain.hand;
  const temp = toNumericSmall([hole1, hole2]);
  const holeNumeric = temp.map((str) => +returnNumber(str));
  return holeNumeric.sort((a, b) => b - a);
};

const getBoardCards = function () {
  const board = state.hands.board.hand;
  console.log("BOARD :" + board);

  const temp = toNumericSmall(board);
  const boardNumeric = temp.map((str) => +returnNumber(str));
  return boardNumeric.sort((a, b) => b - a);
};

const calcTwoOvers = function (holeCards, cardPool) {
  return !cardPool.some((card) => {
    return card.rank > holeCards[1] - 1 && card.rank !== holeCards[0] - 1;
  });
};

// const ex1 = [11, 10];

// const testCards = [
//   { value: "J", suit: "c", rank: 10, wildValue: "J" },
//   { value: "9", suit: "h", rank: 8, wildValue: "9" },
//   { value: "6", suit: "d", rank: 5, wildValue: "6" },
//   { value: "5", suit: "s", rank: 4, wildValue: "5" },
//   { value: "3", suit: "h", rank: 2, wildValue: "3" },
// ];

// const arrTest = [2, 7, 8, 9, 10, 12];

// const openEnded = calcOpenEnded(arrTest);
// console.log("STRAIGHT DRAW: " + openEnded);
// const dblGutShot = calcDblGutShot(arrTest);
// console.log("DBLGS: " + dblGutShot);
