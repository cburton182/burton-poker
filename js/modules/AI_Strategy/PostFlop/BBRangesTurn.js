//isBB TURN************
import Range from "./buttonRangesFlop.js";

//canCheck, aggressor
//cBet
const cBet = new Range(
  "cbet BB Turn",
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
//canCheck, !aggressor hero or villain
//bet
const bet = new Range(
  "bet BB Turn",
  "raise/check", //straight
  "raise/check", //threeKind
  "raise/check", //twoPair
  "raise/check", //topPair
  "check", //pair
  "check/raise", //flushdraw
  "check/raise", //openEnded
  "check/raise", //dblGutter
  "check", //overs
  "check" //air
);
//can't Check, !invested,
//vsbet
const vsBet = new Range(
  "vsBet BB Turn",
  "raise/call", //straight
  "raise/call", //threeKind
  "call/raise", //twoPair
  "call", //topPair
  "call", //pair
  "call/raise", //flushdraw
  "call/raise", //openEnded
  "call/raise", //dblGutter
  "call/fold", //overs
  "fold" //air
);
//can't Check, invested,
//vsRaise
const vsRaise = new Range(
  "vsRaise BB Turn",
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
  "heroAggression BB Turn",
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

export const BBRangesTurn = {
  cBet,
  bet,
  vsBet,
  vsRaise,
  heroAggression,
};

// console.log(BBRangesTurn);
