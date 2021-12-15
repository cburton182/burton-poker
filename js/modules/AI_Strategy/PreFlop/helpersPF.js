export const values = [
  "2", //0
  "3", //1
  "4", //2
  "5", //3
  "6", //4
  "7", //5
  "8", //6
  "9", //7
  "T", //8
  "J", //9
  "Q", //10
  "K", //11
  "A", //12
];

/* SB & BB ****************************************** */
// returns true for connectors
export const calcConnector = function (hand) {
  if (hand[0] - hand[1] < 2 && hand[1] >= +"4") return true;
  else return false;
};

// console.log(calcConnector(["12", "11", "s"]));
export const calcOneGapper = function (hand) {
  if (hand[0] - hand[1] < 3) return true;
  else return false;
};

export const pairsXUp = function (hand, num) {
  if (hand[0] >= num) return true;
  else return false;
};
/* *************************************** */

export const AQUP = function (hand) {
  if (hand[0] === "14" && hand[1] >= +"12") return true;
  else return false;
};

export const AJUP = function (hand) {
  if (hand[0] === "14" && hand[1] >= +"11") return true;
  else return false;
};

export const AceBluffs = function (hand) {
  if (hand[0] === "14" && hand[1] >= +"2" && hand[1] <= +"5") return true;
  else return false;
};

export const KingQueen = function (hand) {
  if (hand[0] === "13" && hand[1] === "12") return true;
  else return false;
};

export const AceKing = function (hand) {
  if (hand[0] === "14" && hand[1] === "13") return true;
  else return false;
};

export const JackTen = function (hand) {
  if (hand[0] === "11" && hand[1] === "10") return true;
  else return false;
};

export const Ace3Up = function (hand) {
  if (hand[0] === "14" && hand[1] > +"3") return true;
  else return false;
};

export const King3Up = function (hand) {
  if ((hand[0] === "13" && hand[1] > +"3") || hand[1] === "13") return true;
  else return false;
};

export const King8Up = function (hand) {
  if ((hand[0] === "13" && hand[1] >= +"8") || hand[1] === "13") return true;
  else return false;
};

export const hasQueen = function (hand) {
  if (hand[0] === "12" || hand[1] === +"12") return true;
  else return false;
};

export const Queen9Up = function (hand) {
  if (hand[0] === "12" && hand[1] >= +"9") return true;
  else return false;
};

export const Jack8Up = function (hand) {
  if (hand[0] === "11" && hand[1] >= +"8") return true;
  else return false;
};

export const suitedRags = function (hand) {
  if (
    (hand[1] === "2" || hand[1] === "3") &&
    hand[0] >= +"5" &&
    hand[0] <= +"10"
  )
    return true;
  else return false;
};

export const offSuitFold2Raise = function (hand) {
  if (
    hand[1] >= +"2" &&
    hand[1] <= +"6" &&
    hand[0] !== "14" &&
    !calcConnector(hand)
  )
    return true;
  else return false;
};
/* SB Open ************************************** */

export const anyAce = function (hand) {
  if (hand[0] === "14") return true;
  else return false;
};

export const anyKing = function (hand) {
  if (hand[0] === "13") return true;
  else return false;
};

export const Queen4Up = function (hand) {
  if (hand[0] === "12" && hand[1] >= 4) return true;
  else return false;
};

export const Jack5Up = function (hand) {
  if (hand[0] === "11" && hand[1] >= 5) return true;
  else return false;
};

export const Ten6Up = function (hand) {
  if (hand[0] === "10" && hand[1] >= 6) return true;
  else return false;
};

export const Nine6Up = function (hand) {
  if (hand[0] === "9" && hand[1] >= 6) return true;
  else return false;
};

export const connected8 = function (hand) {
  if (hand[1] === "8" && (hand[0] === "9" || hand[0] === "10")) return true;
  else return false;
};

/* ****************************************** */

/* SB vs 3bet ******************************** */

export const King6Up = function (hand) {
  if (hand[0] === "13" && hand[1] >= 6) return true;
  else return false;
};

export const Queen8Up = function (hand) {
  if (hand[0] === "12" && hand[1] >= 8) return true;
  else return false;
};

export const AceTenUp = function (hand) {
  if (hand[0] === "14" && hand[1] >= 10) return true;
  else return false;
};

export const KingJackUp = function (hand) {
  if (hand[0] === "13" && hand[1] >= 11) return true;
  else return false;
};

export const KingTenUp = function (hand) {
  if (hand[0] === "13" && hand[1] >= 10) return true;
  else return false;
};

export const QueenJack = function (hand) {
  if (hand[0] === "12" && hand[1] === "11") return true;
  else return false;
};

/* ****************************************** */
export let matrix = [];
export let pairs = [];
export let suited = [];
export let offsuit = [];

for (let i = 12; i >= 0; i--) {
  for (let j = i; j >= 0; j--) {
    // matrix.push(`${values[i]}${values[j]}`);
    values[i] === values[j] && pairs.push(`${values[i]}${values[j]}`);

    values[i] !== values[j] && suited.push(`${values[i]}${values[j]}s`);

    values[i] !== values[j] && offsuit.push(`${values[i]}${values[j]}o`);
  }
}

matrix = [...pairs.concat(suited).concat(offsuit)];

/* use toNumeric for multiple hands */
const toNumeric = function (arr) {
  return arr.map((hand) => {
    const toArr = Array.from(hand);
    const newArr = toArr.map((str) =>
      str
        .replaceAll("T", "10")
        .replaceAll("J", "11")
        .replaceAll("Q", "12")
        .replaceAll("K", "13")
        .replaceAll("A", "14")
    );
    return newArr;
    // return toArr.join("");
  });
};

export const toNormal = function (arr) {
  const newArr = arr.map((str) =>
    str
      .replaceAll("10", "T")
      .replaceAll("11", "J")
      .replaceAll("12", "Q")
      .replaceAll("13", "K")
      .replaceAll("14", "A")
  );
  return newArr.join("");
};

export const returnNumber = function (str) {
  return str.length > 2 ? str.slice(0, 2) : str.slice(0, 1);
};

const sorted = (hand) => {
  const value1 = returnNumber(hand[0]);
  const value2 = returnNumber(hand[1]);
  const sortedArr = [value1, value2].sort((a, b) => b - a);
  const final = toNormal(sortedArr);
  return final;
};
/* use toNumericSmall when only a single hand */
export const toNumericSmall = function (arr) {
  return arr.map((str) => {
    const newStr = str
      .replaceAll("T", "10")
      .replaceAll("J", "11")
      .replaceAll("Q", "12")
      .replaceAll("K", "13")
      .replaceAll("A", "14");
    return newStr;
  });
};

export const categorizeHand = function (hand) {
  if (hand[0][1] === hand[1][1])
    //suited
    return `${sorted(toNumericSmall(hand))}s`;
  else if (hand[0][0] === hand[1][0])
    // pair
    return `${sorted(toNumericSmall(hand))}`;
  // unsuited
  else return `${sorted(toNumericSmall(hand))}o`;
};

export const pairsNumeric = toNumeric(pairs);
export const suitedNumeric = toNumeric(suited);
export const offsuitNumeric = toNumeric(offsuit);
