//isBB FLOP************
import Range from "./buttonRangesFlop.js";

//canCheck, aggressor
//cBet
const cBet = new Range(
  "cbet BB Flop",
  "raise/check", //straight
  "raise/check", //threeKind
  "raise/check", //twoPair
  "raise/check", //topPair
  "check/raise", //pair
  "check/raise", //flushdraw
  "raise/check", //openEnded
  "raise/check", //dblGutter
  "check/raise", //over
  "check" //air
);
//canCheck, !aggressor
//bet
const bet = new Range(
  "bet BB Flop",
  "raise/check", //straight
  "raise/check", //threeKind
  "raise/check", //twoPair
  "raise/check", //topPair
  "check", //pair
  "check/raise", //flushdraw
  "check/raise", //openEnded
  "check/raise", //dblGutter
  "check", //over
  "check" //air
);
//can't Check, !invested,
//vsbet
const vsBet = new Range(
  "vsBet BB Flop",
  "raise/call", //straight
  "raise/call", //threeKind
  "raise/call", //twoPair
  "call", //topPair
  "call", //pair
  "call/raise", //flushdraw
  "call/raise", //openEnded
  "call/raise", //dblGutter
  "call",
  "fold" //air
);
//can't Check, invested,
//vsRaise
const vsRaise = new Range(
  "vsRaise BB Flop",
  "call", //straight
  "call", //threeKind
  "call", //twoPair
  "call", //topPair
  "fold", //pair
  "call", //flushdraw
  "call", //openEnded
  "call", //dblGutter
  "fold", //overs
  "fold" //air
);

const heroAggression = new Range(
  "heroAggression BB Flop",
  "check", //straight
  "check", //threeKind
  "check", //twoPair
  "check", //topPair
  "check", //pair
  "check", //flushdraw
  "check", //openEnded
  "check", //dblGutter
  "check", //overs
  "check" //air
);

export const BBRangesFlop = {
  cBet,
  bet,
  vsBet,
  vsRaise,
  heroAggression,
};

// console.log(BBRangesFlop);
