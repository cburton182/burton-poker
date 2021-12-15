//isButton River************
import Range from "./buttonRangesFlop.js";

//canCheck, villain aggressor
const cBet = new Range(
  "cbet Btn River",
  "raise", //straight
  "raise", //threeKind
  "raise/check", //twoPair
  "check", //topPair
  "check", //pair
  "raise", //flushdraw
  "raise", //openEnded
  "raise", //dblGutter
  "check", //over
  "check/raise" //air
);
//canCheck, !aggressor
//bet
const bet = new Range(
  "bet Btn River",
  "raise", //straight
  "raise", //threeKind
  "raise/check", //twoPair
  "check/raise", //topPair
  "check", //pair
  "raise", //flushdraw
  "raise", //openEnded
  "raise", //dblGutter
  "check", //over
  "check/raise" //air
);
//can't Check, !invested,
//vsbet
const vsBet = new Range(
  "vsBet Btn River",
  "raise/call", //straight
  "raise/call", //threeKind
  "call", //twoPair
  "call/fold", //topPair
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
  "vsRaise Btn River",
  "call", //straight
  "call", //threeKind
  "call", //twoPair
  "call/fold", //topPair
  "fold", //pair
  "fold", //flushdraw
  "fold", //openEnded
  "fold", //dblGutter
  "fold", //overs
  "fold" //air
);

export const buttonRangesRiver = {
  cBet,
  bet,
  vsBet,
  vsRaise,
};

// console.log(buttonRangesRiver);
