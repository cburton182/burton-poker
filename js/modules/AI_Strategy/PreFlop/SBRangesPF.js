import {
  AceBluffs,
  AJUP,
  AceTenUp,
  calcConnector,
  calcOneGapper,
  Ace3Up,
  Jack8Up,
  King3Up,
  King8Up,
  Queen9Up,
  JackTen,
  KingJackUp,
  KingQueen,
  QueenJack,
  King6Up,
  offSuitFold2Raise,
  pairsXUp,
  suitedRags,
  anyAce,
  anyKing,
  Queen8Up,
  Queen4Up,
  Jack5Up,
  Ten6Up,
  Nine6Up,
  connected8,
  toNormal,
  KingTenUp,
  AceKing,
} from "./helpersPF.js";
import { pairs } from "./helpersPF.js";
import { suitedNumeric } from "./helpersPF.js";
import { offsuitNumeric } from "./helpersPF.js";

// export const matrix = values.map((value, i) => {
//   value >= values[1] && `${value}${value[i]}`;
// });

export const SBRanges = {
  open: new Map(),
  vs3bet: new Map(),
};

/* Open Range */
pairs.forEach((hand) => {
  SBRanges.open.set(hand, "raise");
});
suitedNumeric.forEach((hand) => {
  anyAce(hand) ||
  anyKing(hand) ||
  Queen4Up(hand) ||
  Jack5Up(hand) ||
  Ten6Up(hand) ||
  Nine6Up(hand) ||
  calcOneGapper(hand)
    ? SBRanges.open.set(toNormal(hand), "raise")
    : SBRanges.open.set(toNormal(hand), "fold");
});
offsuitNumeric.forEach((hand) => {
  if (
    Ace3Up(hand) ||
    King8Up(hand) ||
    Queen9Up(hand) ||
    Jack8Up(hand) ||
    connected8(hand)
  ) {
    SBRanges.open.set(toNormal(hand), "raise");
  } else {
    SBRanges.open.set(toNormal(hand), "fold");
  }
});
/* ************************************** */

/* vs3bet */
pairs.forEach((hand) => {
  SBRanges.vs3bet.set(hand, "call");
});
suitedNumeric.forEach((hand) => {
  anyAce(hand) ||
  King6Up(hand) ||
  Queen8Up(hand) ||
  Jack8Up(hand) ||
  calcOneGapper(hand) ||
  connected8(hand)
    ? SBRanges.vs3bet.set(toNormal(hand), "call")
    : SBRanges.vs3bet.set(toNormal(hand), "fold");
});
offsuitNumeric.forEach((hand) => {
  if (AceTenUp(hand) || KingJackUp(hand) || QueenJack(hand)) {
    SBRanges.vs3bet.set(toNormal(hand), "call");
  } else {
    SBRanges.vs3bet.set(toNormal(hand), "fold");
  }
});

// console.log(SBRanges.open);
// console.log(SBRanges.vs3bet);

export const mdfPre20 = new Map(); //7.5x BB ex 75
/* SB4bet */
pairs.forEach((hand) => {
  pairsXUp(hand, "6") ? mdfPre20.set(hand, "call") : mdfPre20.set(hand, "fold");
});
suitedNumeric.forEach((hand) => {
  //   console.log(hand);
  if (Ace3Up(hand) || King8Up(hand) || Queen9Up(hand) || JackTen(hand))
    mdfPre20.set(toNormal(hand), "call");
  else mdfPre20.set(toNormal(hand), "fold");
});

offsuitNumeric.forEach((hand) => {
  if (AceTenUp(hand) || KingTenUp || QueenJack || JackTen) {
    mdfPre20.set(toNormal(hand), "call");
  } else mdfPre20.set(toNormal(hand), "fold");
}); /* ************************************** */

export const mdfPre10 = new Map(); // 15x BB ex 150
/* SB4bet */
pairs.forEach((hand) => {
  pairsXUp(hand, "8") ? mdfPre10.set(hand, "call") : mdfPre10.set(hand, "fold");
});
suitedNumeric.forEach((hand) => {
  //   console.log(hand);
  if (AceTenUp(hand) || KingTenUp(hand) || QueenJack(hand))
    mdfPre10.set(toNormal(hand), "call");
  else mdfPre10.set(toNormal(hand), "fold");
});

offsuitNumeric.forEach((hand) => {
  if (AJUP(hand)) {
    mdfPre10.set(toNormal(hand), "call");
  } else mdfPre10.set(toNormal(hand), "fold");
}); /* ************************************** */

export const mdfPre5 = new Map(); //30x BB ex 300
/* SB4bet */
pairs.forEach((hand) => {
  pairsXUp(hand, "8") ? mdfPre5.set(hand, "call") : mdfPre5.set(hand, "fold");
});
suitedNumeric.forEach((hand) => {
  //   console.log(hand);
  if (AJUP(hand) || KingQueen(hand)) mdfPre5.set(toNormal(hand), "call");
  else mdfPre5.set(toNormal(hand), "fold");
});

offsuitNumeric.forEach((hand) => {
  if (AceKing(hand)) {
    mdfPre5.set(toNormal(hand), "call");
  } else mdfPre5.set(toNormal(hand), "fold");
}); /* ************************************** */
