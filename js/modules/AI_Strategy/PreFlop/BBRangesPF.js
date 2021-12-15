import {
  AceBluffs,
  AJUP,
  calcConnector,
  calcOneGapper,
  Ace3Up,
  Jack8Up,
  King3Up,
  King8Up,
  Queen9Up,
  JackTen,
  KingQueen,
  offSuitFold2Raise,
  pairsXUp,
  suitedRags,
  toNormal,
} from "./helpersPF.js";
import { pairs } from "./helpersPF.js";
import { suitedNumeric } from "./helpersPF.js";
import { offsuitNumeric } from "./helpersPF.js";

// export const matrix = values.map((value, i) => {
//   value >= values[1] && `${value}${value[i]}`;
// });

export const BBRanges = {
  SBLimp: new Map(),
  SBRFI: new Map(),
  SB4bet: new Map(),
};

/* SB Limp Range */
pairs.forEach((hand) => {
  BBRanges.SBLimp.set(hand, "raise");
});
suitedNumeric.forEach((hand) => {
  //   console.log(hand);
  Ace3Up(hand) ||
  King3Up(hand) ||
  Queen9Up(hand) ||
  Jack8Up(hand) ||
  calcOneGapper(hand)
    ? BBRanges.SBLimp.set(toNormal(hand), "raise")
    : BBRanges.SBLimp.set(toNormal(hand), "check");
});

offsuitNumeric.forEach((hand) => {
  if (Ace3Up(hand) || King8Up(hand) || Queen9Up(hand)) {
    BBRanges.SBLimp.set(toNormal(hand), "raise");
  } else {
    BBRanges.SBLimp.set(toNormal(hand), "check");
  }
});

/* SBRFI */
pairs.forEach((hand) => {
  pairsXUp(hand, "9")
    ? BBRanges.SBRFI.set(hand, "raise")
    : BBRanges.SBRFI.set(hand, "call");
});
suitedNumeric.forEach((hand) => {
  //   console.log(hand);
  if (AJUP(hand) || KingQueen(hand) || AceBluffs(hand) || calcConnector(hand))
    BBRanges.SBRFI.set(toNormal(hand), "raise");
  else if (suitedRags(hand)) BBRanges.SBRFI.set(toNormal(hand), "fold");
  else BBRanges.SBRFI.set(toNormal(hand), "call");
});

offsuitNumeric.forEach((hand) => {
  if (AJUP(hand)) {
    BBRanges.SBRFI.set(toNormal(hand), "raise");
  } else if (offSuitFold2Raise(hand)) {
    BBRanges.SBRFI.set(toNormal(hand), "fold");
  } else BBRanges.SBRFI.set(toNormal(hand), "call");
});

/* SB4bet */
pairs.forEach((hand) => {
  pairsXUp(hand, "8")
    ? BBRanges.SB4bet.set(hand, "call")
    : BBRanges.SB4bet.set(hand, "fold");
});
suitedNumeric.forEach((hand) => {
  //   console.log(hand);
  if (AJUP(hand) || KingQueen(hand) || AceBluffs(hand) || JackTen(hand))
    BBRanges.SB4bet.set(toNormal(hand), "call");
  else BBRanges.SB4bet.set(toNormal(hand), "fold");
});

offsuitNumeric.forEach((hand) => {
  if (AJUP(hand)) {
    BBRanges.SB4bet.set(toNormal(hand), "call");
  } else BBRanges.SB4bet.set(toNormal(hand), "fold");
});

// console.log(BBRanges.SB4bet);
// console.log(BBRanges.SBRFI)
// console.log(BBRanges.SBLimp);
