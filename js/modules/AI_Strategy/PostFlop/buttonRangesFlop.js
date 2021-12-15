//isButton FLOP************

export default class Range {
  constructor(
    range,
    straight,
    threeKind,
    twoPair,
    topPair,
    pair,
    flushDraw,
    openEnded,
    dblGutter,
    overs,
    air
  ) {
    this.range = range;
    this.straight = straight;
    this.threeKind = threeKind;
    this.twoPair = twoPair;
    this.topPair = topPair;
    this.pair = pair;
    this.flushDraw = flushDraw;
    this.openEnded = openEnded;
    this.dblGutter = dblGutter;
    this.overs = overs;
    this.air = air;
  }
}

//canCheck, agressor
//cbet

const cBet = new Range(
  "cBet Btn Flop",
  "raise/check",
  "raise/check",
  "raise/check",
  "raise/check",
  "check/raise",
  "raise/check",
  "raise/check",
  "raise/check",
  "raise/check",
  "check"
);

//canCheck !agressor
//bet

const bet = new Range(
  "bet Btn Flop",
  "raise/check", //straight
  "raise/check", //threeKind
  "raise/check", //twoPair
  "raise/check", //topPair
  "check/raise", //pair
  "check/raise", //flushdraw
  "raise/check", //openEnded
  "raise/check", //dblGutter
  "check",
  "check" //air
);

//can't check and !action
//vs bet
const vsBet = new Range(
  "vsBet Btn Flop",
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
//can't check and action
// vs raise (call/fold) strategy
const vsRaise = new Range(
  "vs3bet Btn Flop",
  "call", //straight
  "call", //threeKind
  "call", //twoPair
  "call", //topPair
  "fold", //pair
  "call", //flushdraw
  "call", //openEnded
  "call", //dblGutter
  "fold",
  "fold" //air
);

// console.log(vs3bet);

export const buttonRangesFlop = {
  cBet,
  bet,
  vsBet,
  vsRaise,
};

export const mdfPost85 = new Range(
  "MDF15",
  "raise/call", //straight
  "raise/call", //threeKind
  "raise/call", //twoPair
  "raise/call", //topPair
  "call", //pair
  "call/raise", //flushdraw
  "call/raise", //openEnded
  "call/raise", //dblGutter
  "call", //overs
  "call/fold" //air
);
// console.log(buttonRangesFlop);
