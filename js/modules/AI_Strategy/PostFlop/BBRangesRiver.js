//isBB River************
import Range from "./buttonRangesFlop.js";

//canCheck, aggressor
//cBet
const cBet = new Range(
  "cbet BB River",
  "raise", //straight
  "raise/check", //threeKind
  "check/raise", //twoPair
  "check/raise", //topPair
  "check", //pair
  "raise", //flushdraw
  "raise", //openEnded
  "raise", //dblGutter
  "check", //over
  "check/raise" //air
);
//canCheck, !aggressor hero or villain
//bet
const bet = new Range(
  "bet BB River",
  "raise", //straight
  "raise/check", //threeKind
  "check/raise", //twoPair
  "check/raise", //topPair
  "check", //pair
  "raise", //flushdraw
  "raise", //openEnded
  "raise", //dblGutter
  "check", //overs
  "check" //air
);
//can't Check, !invested,
//vsbet
const vsBet = new Range(
  "vsBet BB River",
  "raise/call", //straight
  "raise/call", //threeKind
  "call", //twoPair
  "call", //topPair
  "fold", //pair
  "raise/fold", //flushdraw
  "raise/fold", //openEnded
  "raise/fold", //dblGutter
  "fold", //overs
  "fold" //air
);
//can't Check, invested,
//vsRaise
const vsRaise = new Range(
  "vsRaise BB River",
  "call", //straight
  "call", //threeKind
  "call/fold", //twoPair
  "fold", //topPair
  "fold", //pair
  "fold", //flushdraw
  "fold", //openEnded
  "fold", //dblGutter
  "fold", //overs
  "fold" //air
);

const heroAggression = new Range(
  "heroAggression BB River",
  "check/raise", //straight
  "check", //threeKind
  "check", //twoPair
  "check", //topPair
  "check", //pair
  "check", //flushdraw
  "check/raise", //openEnded
  "check", //dblGutter
  "check", //overs
  "check" //air
);

export const BBRangesRiver = {
  cBet,
  bet,
  vsBet,
  vsRaise,
  heroAggression,
};

// console.log(BBRangesRiver);
