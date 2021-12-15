//isButton TURN************
import Range from "./buttonRangesFlop.js";

//canCheck, villain aggressor
const cBet = new Range(
  "cbet Btn Turn",
  "raise/check", //straight
  "raise/check", //threeKind
  "raise/check", //twoPair
  "check/raise", //topPair
  "check/raise", //pair
  "check/raise", //flushdraw
  "raise/check", //openEnded
  "raise/check", //dblGutter
  "check", //over
  "check" //air
);
//canCheck, !aggressor
//bet
const bet = new Range(
  "bet Btn Turn",
  "raise/check", //straight
  "raise/check", //threeKind
  "raise/check", //twoPair
  "check/raise", //topPair
  "check", //pair
  "check/raise", //flushdraw
  "raise/check", //openEnded
  "check/raise", //dblGutter
  "check/raise", //over
  "check" //air
);
//can't Check, !invested,
//vsbet
const vsBet = new Range(
  "vsBet Btn Turn",
  "raise/call", //straight
  "raise/call", //threeKind
  "raise/call", //twoPair
  "call", //topPair
  "call/fold", //pair
  "call/raise", //flushdraw
  "call/raise", //openEnded
  "call/raise", //dblGutter
  "fold", //overs
  "fold" //air
);
//can't Check, invested,
//vsRaise
const vsRaise = new Range(
  "vsRaise Btn Turn",
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

export const buttonRangesTurn = {
  cBet,
  bet,
  vsBet,
  vsRaise,
};

console.log(buttonRangesTurn);
