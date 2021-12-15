import { buttonRangesFlop } from "./buttonRangesFlop.js";
import { BBRangesFlop } from "./BBRangesFlop.js";
import { buttonRangesTurn } from "./buttonRangesTurn.js";
import { BBRangesTurn } from "./BBRangesTurn.js";
import { BBRangesRiver } from "./BBRangesRiver.js";
//cbet, bet, vsBet, vs3bet

const streetSelector = {
  flop: {
    buttonRanges: buttonRangesFlop,
    BBRanges: BBRangesFlop,
  },
  turn: {
    buttonRanges: buttonRangesTurn,
    BBRanges: BBRangesTurn,
  },
  river: {
    buttonRanges: buttonRangesFlop,
    BBRanges: BBRangesRiver,
  },
};

console.log(streetSelector);

export const getRangePost = function (
  isButton,
  action,
  canCheck,
  villainIsAggressor,
  invested,
  heroIsAggressor,
  street
) {
  console.log("CAN CHECK: " + canCheck);
  console.log("VILLAIN NOT INVESTED: " + !invested);
  console.log("VILLAIN AGGRESSOR:" + villainIsAggressor);
  console.log("HERO AGGRESSOR:" + heroIsAggressor);

  if (isButton) {
    //villain is Button
    if (canCheck === "yes") {
      //villain can check
      return villainIsAggressor
        ? //villain is aggressor
          streetSelector[street].buttonRanges.cBet
        : //villain is not aggressor
          streetSelector[street].buttonRanges.bet;
    } else {
      //villain can't check
      return action
        ? //villain already acted/ facing raise
          streetSelector[street].buttonRanges.vsRaise
        : //villain has not acted yet/ facing bet
          streetSelector[street].buttonRanges.vsBet;
    }
  } else {
    //villain is BB
    if (canCheck === "yes") {
      // villain can Check
      if (!villainIsAggressor && !heroIsAggressor) {
        //no aggressors prev street
        //BBbet Range
        return streetSelector[street].BBRanges.bet;
      } else {
        //hero or villain is aggressor
        return heroIsAggressor
          ? //hero agressor, check to aggressor
            streetSelector[street].BBRanges.heroAggression
          : //villain aggressor, cbet
            streetSelector[street].BBRanges.cBet;
      }
    } else {
      // villain can't check
      return invested
        ? // vilain has bet already, facing raise
          streetSelector[street].BBRanges.vsRaise
        : // villain has not bet, facing bet
          streetSelector[street].BBRanges.vsBet;
    }
  }

  /*   if (isButton && canCheck === "yes" && villainIsAggressor)
    return buttonRangesFlop.cBet;
  if (isButton && canCheck === "yes" && !villainIsAggressor)
    return buttonRangesFlop.bet;
  if (isButton && canCheck === "no" && !action) return buttonRangesFlop.vsBet;
  if (isButton && canCheck === "no" && action) return buttonRangesFlop.vsRaise;

  if (
    !isButton &&
    canCheck === "yes" &&
    !villainIsAggressor &&
    !heroIsAggressor
  )
    return BBRangesFlop.bet;
  if (!isButton && canCheck === "yes" && villainIsAggressor)
    return BBRangesFlop.cBet;
  if (!isButton && canCheck === "yes" && heroIsAggressor)
    return BBRangesFlop.heroAggression;
  if (!isButton && canCheck === "no" && !invested) return BBRangesFlop.vsBet;
  if (!isButton && canCheck === "no" && invested) return BBRangesFlop.vsRaise; */
};
