const randomNumber = function () {
  return Math.floor(Math.random() * 100);
};

export const calcOpenEnded = function (arr) {
  arr.sort((a, b) => a - b);
  let straightDraw = false;

  for (let i = 3; i <= 5; i++) {
    if (!arr[i]) break;

    //   console.log(arr[i] - arr[i - 3]);
    if (arr[i] - arr[i - 3] !== 3) continue;

    if ((arr[i] + arr[i - 2]) / 2 === arr[i - 1]) {
      straightDraw = true;
      break;
    }
  }
  arr.sort((a, b) => b - a);
  return straightDraw;
};

export const calcDblGutShot = function (arr) {
  arr.sort((a, b) => a - b);

  let dblGutShot = false;

  for (let i = 3; i <= 4; i++) {
    if (!arr[i + 1]) {
      break;
    }

    if ((arr[i] + arr[i - 2]) / 2 !== arr[i - 1]) continue;

    if (arr[i] - 4 === arr[i - 3] && arr[i] + 2 === arr[i + 1]) {
      dblGutShot = true;
      break;
    }
  }
  arr.sort((a, b) => b - a);
  return dblGutShot;
};

export const calcTopPairPlus = function (holeCards, boardCards) {
  if (holeCards[1] > boardCards[0]) return true;
  else {
    return holeCards.some((card) => {
      return card === boardCards[0];
    });
  }
};

export const postFlopDecision = function (decision, raiseAmount, villain) {
  switch (decision) {
    case "fold":
      villain.fold();
      break;
    case "check":
      villain.check();
      break;
    case "call":
      villain.call();
      break;
    case "raise":
      villain.raise(raiseAmount);
      break;
    case "call/fold":
      randomNumber() >= 30 ? villain.call() : villain.fold();
      break;
    case "call/raise":
      randomNumber() >= 30 ? villain.call() : villain.raise(raiseAmount);
      break;
    case "raise/check":
      randomNumber() >= 25 ? villain.raise(raiseAmount) : villain.check();
      break;
    case "raise/call":
      randomNumber() >= 25 ? villain.raise(raiseAmount) : villain.call();
      break;
    case "check/raise":
      randomNumber() >= 30 ? villain.check() : villain.raise(raiseAmount);
      break;
    case "raise/fold":
      randomNumber() >= 25 ? villain.raise(raiseAmount) : villain.fold();
      break;
  }
};
