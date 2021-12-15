/* for AI: @ calcPlayerTurn call a function in the AI-Villain class that takes information and decides to bet, call etc.  This function will then call one of villain classes methods somehow
 */
import * as Script from "./modules/script.js";
import view from "./modules/view.js";
import { villainAI } from "./modules/villainAI.js";
import { wait } from "./modules/helpers.js";
import { calcEffective } from "./modules/AI_Strategy/raiseCalculator.js";

class Dealer {
  constructor(SB, BB, startingStacks, villainAI) {
    this.SB = SB;
    this.BB = BB;
    this.startingStacks = startingStacks;
    this.villainAI = villainAI;
    this.streets = ["preFlop", "flop", "turn", "river"];
    this.counter = 0;
    this.street = this.streets[this.counter];
    this.pot = 0;
    this.effective;
    this.players = [
      (this.hero = new Player("hero", this.startingStacks, false, false)),
      (this.villain = new Player("villain", this.startingStacks, true, false)),
    ];
  }

  findActive = function (players) {
    const active = players.find((player) => player.isActive);
    const inactive = players.find((player) => !player.isActive);

    return [active, inactive];
  };

  findWinner = function () {
    return this.players.find((player) => player.isWinner);
  };

  awardPotTo(str) {
    const winnerName = str.slice(0, str.indexOf(" ")).toLowerCase();

    const awardTo = this.players.find((player) => player.player === winnerName);

    return awardTo;
  }

  findButton = function (players) {
    return players.find((player) => player.isButton);
  };

  changeActivePlayer = function (players) {
    players.forEach((player) => (player.isActive = !player.isActive));
  };

  buttonInactive = function (players) {
    const btn = players.find((player) => player.isButton);
    const notBtn = players.find((player) => !player.isButton);

    btn.isActive = false;
    notBtn.isActive = true;
  };

  changeButton = function (players) {
    // console.log("Changing Button");
    players.forEach((player) => {
      player.isButton = !player.isButton;
      player.isActive = player.isButton ? true : false;
    });
    const button = this.findButton(players).player;
    view.changeButton(button);
  };

  postBlinds = function (players, SB, BB) {
    players.forEach((player) => {
      player.isButton ? player.postSB(SB) : player.postBB(BB);
    });
  };

  calcToCall = function (active, inactive) {
    let toCall =
      active.invested >= inactive.invested
        ? 0
        : inactive.invested - active.invested;

    if (toCall > active.stackSize) toCall = active.stackSize;
    active.toCall = toCall;
    return toCall;
  };

  promptActivePlayer = function (players, updateBtns, actions) {
    const active = players.find((player) => player.isActive);
    const inactive = players.find((player) => !player.isActive);
    const hero = players.find((player) => player.player === "hero");
    const villain = players.find((player) => player.player === "villain");

    console.log(`POT: ${this.pot}`);
    console.log(`action is on ${active.player}`);
    console.log(this.calcToCall(active, inactive) + " to call");
    console.log("");
    this.effective = calcEffective([
      hero.stackSize + hero.invested,
      villain.stackSize + villain.invested,
    ]);
    console.log(`EFFECTIVE STACK: ${this.effective}`);
    view.actionMsg(active.player, inactive); //remove inactive?
    const canCheck = active.toCall > 0 ? "no" : "yes";
    const arr = [
      hero,
      villain,
      actions,
      canCheck,
      active.toCall,
      this.effective,
    ];

    updateBtns(arr);
    view.input.value = "";
    view.input.focus();

    villain.isActive &&
      this.villainAI(
        villain,
        canCheck,
        this.street,
        this.pot,
        hero.invested,
        hero.stackSize,
        hero.aggressor
      );
  };

  resetAction = function (players) {
    players.forEach((player) => (player.action = false));
  };

  resetInvested = function (players) {
    players.forEach((player) => (player.invested = 0));
  };

  startStreet = function (players) {
    this.resetInvested(players);
    view.hideAction();
    this.resetAction(players);

    if (this.street === "preFlop") {
      console.log("");
      console.log("------------------------");
      console.log("starting new hand");
      console.log("------------------------");
      console.log("");
      this.changeButton(players);
      // console.log("setting pot to 0");
      this.pot = 0;
      // console.log("posting Blinds");
      // console.log("");
      this.postBlinds(players, this.SB, this.BB);
      players.forEach((player) =>
        view.updateStacks(player.player, player.stackSize)
      );
      //might need
      view.updatePot(this.pot);
      view.showBets(this.hero.invested, this.villain.invested);
    }

    if (this.street !== "preFlop") {
      this.buttonInactive(players);
    }
    console.log(`Current Street | ${this.street}`);
    console.log(`-----------------------`);
    Script.handleDeal(); // make await with timeout
    this.promptActivePlayer(players, view.updateBettingBtns, view.actions);
  };

  newStreet = function () {
    this.counter === 3 ? (this.counter = 0) : ++this.counter;
    this.street = this.streets[this.counter];
  };

  calcPlayerTurn = async function (players) {
    const [active, inactive] = this.findActive(players);
    // view.updatePot(this.pot);
    view.updateBets(active.player, active.invested);
    view.showBets(this.hero.invested, this.villain.invested);
    view.updateStacks(active.player, active.stackSize);

    if (
      !inactive.action ||
      (active.action &&
        inactive.action &&
        active.invested !== inactive.invested)
    ) {
      this.changeActivePlayer(players);
      this.promptActivePlayer(players, view.updateBettingBtns, view.actions);
    } else {
      view.actions.classList.add("hide"); // NEW
      // if villain acted last, wait 1 seconds
      // if (this.villain.isActive) await wait(1);
      await wait(1);
      view.pushBets();
      // await wait(0.5); // NEW
      view.updatePot(this.pot); //NEW
      if (this.street === "river") this.showDown();
      else if (!active.stackSize || !inactive.stackSize) {
        console.log("going to early showdown***********");
        this.earlyShowDown();
      } else {
        this.newStreet();
        this.startStreet(players);
      }
    }
  };

  heroActionsManager(e) {
    e.preventDefault(e);

    if (
      e.target.classList.contains("input") ||
      e.target.classList.contains("actions")
    )
      return;

    const btn = e.target.classList[0];

    switch (btn) {
      case "fold":
        console.log("PLAYER FOLDS");
        this.hero.fold();
        break;
      case "check":
        console.log("PLAYER CHECKS");
        this.hero.check();
        break;
      case "call":
        console.log("PLAYER CALLS");
        this.hero.call();
        break;
      case "raise":
        console.log("HERO RAISES");
        console.log("INPUT VALUE" + view.input.value);
        console.log(view.input.value);
        //convert input from String to Number
        this.hero.raise(+view.input.value);
        view.input.value = "";
        break;
    }
  }

  addActionsListener(el) {
    el.addEventListener("click", this.heroActionsManager.bind(this));
  }

  async showDown(showDown = true) {
    // await wait(0.1);
    view.pushBets();
    switch (showDown) {
      case false:
        this.findActive(this.players)[1].isWinner = true;
        //push players cards in
        //set street to preFlop
        this.counter = 0;
        view.winner.classList.add("hide");

        break;
      case true:
        await wait(0.5);
        Script.flipVillainCards();
        await wait(0.5);

        console.log("Going to show down!");
        const awardStr = Script.showDown();
        const whoWon = this.awardPotTo(awardStr) || undefined;
        if (whoWon) whoWon.isWinner = true;
    }
    await wait(1);
    const winningPlayer = this.findWinner() || "chop";
    console.log("ENDING HAND");
    if (winningPlayer === "chop") {
      this.hero.stackSize += this.pot / 2;
      this.villain.stacksize += this.pot / 2;
    } else {
      winningPlayer.stackSize += this.pot;
      view.pot.classList.add(`award-${winningPlayer.player}`);
    }

    if (!this.hero.stackSize || !this.villain.stackSize) {
      view.winner.textContent = `${
        !this.villain.stackSize ? "villain" : "hero"
      } busted. gg.`;
      view.actions.classList.add("hide");
    } else {
      if (!showDown) {
        await wait(1.5);

        this.newHand();
        return;
      }

      if (showDown) {
        this.newStreet();
        view.renderDealButton();
      }
    }
  }

  async earlyShowDown() {
    while (this.street !== "river") {
      console.log("STREET STREET" + this.street);
      console.log("COUNTER COUNTER: " + this.counter);
      this.newStreet();
      Script.handleDeal();
      await wait(1);
    }
    this.showDown();
  }

  newHand() {
    view.btnNewHand.classList.add("hide");
    const clearWinner = this.findWinner();
    if (clearWinner) {
      clearWinner.isWinner = !clearWinner.isWinner;
    }
    this.counter = 0;
    this.street = this.streets[this.counter];
    Script.init();
    view.newHand();
    this.startStreet(this.players);
  }

  init = function () {
    // Script.init();
    view.init(dealer.startingStacks);
    this.addActionsListener(view.actions);
    view.addHandlerNewHand(this.newHand.bind(this));
    this.newHand();
  };
}

class Player {
  toCall = 0;
  invested = 0;
  action = false;
  isWinner = false;
  constructor(player, stackSize, isButton, isActive) {
    this.player = player;
    this.stackSize = stackSize;
    this.isButton = isButton;
    this.isActive = isActive;
  }

  postSB(SB) {
    dealer.pot += SB;
    this.stackSize -= SB;
    this.invested += SB;
  }

  postBB(BB) {
    dealer.pot += BB;
    this.stackSize -= BB;
    this.invested += BB;
  }

  raise(amount) {
    try {
      const inactive = dealer.findActive(dealer.players)[1];
      console.log("***************************");
      console.log(`TO CALL: ${this.toCall}`);
      console.log(`AMOUNT PASSED IN: ${amount}`);
      console.log(`ACTIVE STACK: ${this.stackSize}`);
      console.log(`INACTIVE STACK: ${inactive.stackSize}`);
      console.log(`EFFECTIVE STACK: ${dealer.effective}`);
      console.log("***************************");
      // player acted out of turn
      if (!this.isActive) return;
      // input = 0;
      if (amount < 1) return;
      // facing an all-in
      if (!inactive.stackSize) {
        console.log("vs all-in changing raise to call****");
        return this.call();
      }
      if (
        amount < (this.toCall + this.invested) * 2 &&
        amount < dealer.effective
      )
        throw new Error("Bets must be 2x the previous bet");
      if (amount > this.stackSize + this.invested)
        throw new Error("Cannot bet more than your stack size");
      // if raise is more than effective stack
      if (amount > dealer.effective) amount = dealer.effective;

      dealer.pot += amount - this.invested;
      this.stackSize -= amount - this.invested;
      this.invested = amount;
      console.log(this.player + ` raised ` + amount);
      // this.invested = amount;
      this.action = true;
      this.aggressor = true;
      view.displayAction(view.playerAction, this.player, "raised");

      dealer.calcPlayerTurn(dealer.players);
    } catch (err) {
      view.winner.textContent = err.message;
      console.error(err);
    }
  }

  call() {
    if (!this.isActive) return;
    console.log(this.player + ` calls ` + this.toCall);
    dealer.pot += this.toCall;
    this.stackSize -= this.toCall;
    this.invested += this.toCall;
    this.action = true;
    this.aggressor = false;
    view.displayAction(view.playerAction, this.player, "called");
    dealer.calcPlayerTurn(dealer.players);
  }

  check() {
    if (!this.isActive) return;
    console.log(this.player + " checked");
    this.action = true;
    this.aggressor = false;
    view.displayAction(view.playerAction, this.player, "checked");
    // await wait(1);
    dealer.calcPlayerTurn(dealer.players);
  }

  fold() {
    this.aggressor = false;
    view.actions.classList.add("hide");
    view.foldCards(this.player);
    view.displayAction(view.playerAction, this.player, "folds");
    dealer.showDown(false);
  }
}

const dealer = new Dealer(5, 10, 1000, villainAI);

const newGame = function () {
  dealer.init();
};
window.addEventListener("load", function (e) {
  console.log(e);
  view.addHandlerNewGame(newGame);
});

// dealer.init();
// console.log(view.villain.children);

// Array.from(view.villain.children).forEach((child) => console.log("loop works"));

// view.init();
