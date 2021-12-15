// const vStack = 200;
// const hStack = 200;
// const pot = 25;
// const hInvested = 0;
// const vInvested = 0;

export const calcEffective = (stacksArr) => stacksArr.sort((a, b) => a - b)[0];

export const calcRaise = function (
  vStack,
  hStack,
  pot,
  hInvested,
  canCheck,
  vInvested
) {
  const effective = calcEffective([vStack + vInvested, hStack + hInvested]);
  const bet = Math.round((pot * 0.66) / 5) * 5;
  const raise = hInvested * 2.5;
  const openPre = 30;

  console.log("EFFECTIVE: " + effective);
  console.log("2/3 bet :" + pot * 0.66);
  console.log("2.5x raise:" + hInvested * 2.5);
  console.log("Hero invested? : " + hInvested);
  // if pot is 15 return 30
  //else if !hInvested return bet or effective
  //else return raise or effective
  if (pot === 15) return openPre - effective > 0 ? effective : openPre;
  else if (!hInvested) return bet - effective > 0 ? effective : bet;
  else return raise - effective > 0 ? effective : raise;
};

// const amount = calcRaise(vStack, hStack, pot, hInvested, vInvested);
// console.log(amount);
// const effectiveStack = calcEffective([100, 90]);
// console.log(effectiveStack);

export const calcMDF = function (potSize, betSize) {
  const MDF = 1 - betSize / potSize;
  return MDF;
};

// const MDF = calcMDF(45, 30);
// console.log(`***********************************`);
// console.log(MDF);
