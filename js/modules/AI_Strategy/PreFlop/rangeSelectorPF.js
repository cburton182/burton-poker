import { BBRanges } from "./BBRangesPF.js";
import { SBRanges } from "./SBRangesPF.js";

export const getRange = function (isButton, action, canCheck) {
  switch (isButton) {
    case false: // if villain is BB
      console.log("villain is in BB");
      return villainBB(action, canCheck);
    case true:
      console.log("waiting for villain in SB");
      return villainSB(action);
  }
};

/* if Villain is BB */
const villainBB = function (action, canCheck) {
  console.log(`CAN CHECK: ` + canCheck);
  switch (canCheck) {
    /* and can Check */
    case "yes":
      return BBRanges.SBLimp;
    /* and can't check */
    case "no":
      /* facing 2bet or 4bet? */
      return !action ? BBRanges.SBRFI : BBRanges.SB4bet;
  }
};

/* if Villain is SB */
const villainSB = function (action) {
  switch (action) {
    /* and can Check */
    case false:
      console.log("returning open range");
      return SBRanges.open;
    /* and can't check */
    case true:
      console.log("returning vs3bet range");

      /* facing 2bet or 4bet? */
      return SBRanges.vs3bet;
  }
};
