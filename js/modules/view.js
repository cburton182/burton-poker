class View {
  #data;
  options = document.querySelector(".options");
  table = document.querySelector(".table");
  community = document.querySelector(".community");
  curColor = "green";
  hero = document.querySelector(".hero");
  villain = document.querySelector(".villain");
  pot = document.querySelector(".pot");
  winner = document.querySelector(".winner");
  playerAction = document.querySelector(".player-action");
  handDescription = document.querySelector(".hand-description");
  // messages = [this.winner, this.handDescription];
  detail = document.querySelector(".detail");
  dealerBtn = document.querySelector(".dealer-btn");
  heroStack = document.querySelector(".hero-stack");
  villainStack = document.querySelector(".villain-stack");
  bets = document.querySelectorAll(".bets");
  heroBet = document.querySelector(".hero-bet");
  villainBet = document.querySelector(".villain-bet");
  actions = document.querySelector(".actions");
  btnfold = document.querySelector(".fold");
  btnCheck = document.querySelector(".check");
  btnCall = document.querySelector(".call");
  btnRaise = document.querySelector(".raise");
  input = document.querySelector(".input");
  btnNewHand = document.querySelector(".new-hand-btn");
  btns = [this.btnfold, this.btnCheck, this.btnCall, this.btnRaise, this.input];
  btnsCheckFold = [this.btnfold, this.btnCheck];
  messages = document.querySelectorAll(".message");
  btnNewGame = document.querySelector(".new-game");

  // btnDeal = document.querySelector(".deal");
  /* SCRIPT */
  dealPreFlop(player, cards, description) {
    this._renderCards(this._findPlayer(player), cards);
    this.hideVillainCards();

    // this._renderHandDescription(description);
  }

  hideVillainCards() {
    const markup = this._generateBackCard();
    this.villain.insertAdjacentHTML("beforeend", markup);
  }

  flipVillainCards(cards) {
    this.villain.innerHTML = "";
    this._renderCards(this.villain, cards);
  }

  /* SCRIPT */
  dealFlop(cards, description) {
    this._renderCards(this.community, cards);
    this._renderHandDescription(description);
  }

  /* SCRIPT */
  dealTurnOrRiver(card, description) {
    this._renderCard(this.community, card);
    this._renderHandDescription(description);
  }

  /* SCRIPT */
  showDown(str) {
    // this.winner.classList.remove("hide");
    this.winner.textContent = str;
    if (str.slice(0, 1) === "C") {
      this.__addGlow(this.hero);
      this.__addGlow(this.villain);
    } else {
      const player = this._findPlayer(str);
      this.__addGlow(player);
    }
    this.awardPot(str);
    return str;
  }

  /* DEALER */
  awardPot(str) {
    const awardTo = str.slice(0, str.indexOf(" ")).toLowerCase();
    this.pot.classList.add(`award-${awardTo}`);
  }

  unawardPot() {
    this.pot.classList.remove(`award-hero`);
    this.pot.classList.remove(`award-villain`);
  }

  /* DEALER */
  addHandlerNewHand(handler) {
    window.addEventListener("keyup", function (e) {
      if (e.key !== "z") return;
      handler();
    });

    this.btnNewHand.addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerNewGame(handler) {
    this.btnNewGame.textContent = "New Game";
    this.btnNewGame.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(e.target);
      e.target.classList.add("hide");
      handler();
    });
  }

  addListenerRaise(btnRaise) {
    window.addEventListener("keyup", function (e) {
      if (e.key !== "Enter") return;
      btnRaise.click();
      // console.log(btnRaise);
    });
  }
  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

  /* DEALER */
  updateBettingBtns(arr) {
    const [hero, villain, actions, canCheck, toCall, effective] = arr;
    if (!hero.isActive) {
      actions.classList.add("hide");
    } else {
      const btns = Array.from(actions.children);
      btns.forEach((btn) => {
        btn.style.flexBasis = `${canCheck === "yes" ? "33%" : "32%"}`;

        btn.dataset.canCheck === canCheck || btn.dataset.canCheck === "raise"
          ? btn.classList.remove("hide")
          : btn.classList.add("hide");

        // if (canCheck === "no" && btn.classList.contains("raise"))
        //   btn.textContent = "Bet";
        if (btn.classList.contains("raise")) {
          btn.textContent = `${
            hero.invested < villain.invested ? "Raise" : "Bet"
          }`;
        }

        if (canCheck === "no" && btn.classList.contains("call"))
          btn.textContent = `Call ${toCall}`;

        if (btn.classList.contains("input")) {
          btn.placeholder =
            effective < (hero.invested + toCall) * 2
              ? effective
              : (hero.invested + toCall) * 2;
          btn.min = btn.placeholder;
          btn.max = hero.stackSize;
        }

        actions.classList.remove("hide");
      });
    }
  }

  /* DEALER */
  renderDealButton() {
    this.actions.classList.add("hide");
    this.btnNewHand.classList.remove("hide");
  }

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  /* DEALER */
  updatePot(amount) {
    this.pot.textContent = `Pot: $${amount}`;
  }
  /* 
  updateStacks(hero, villain) {
    this.heroStack.textContent = hero;
    this.villainStack.textContent = villain;
  } */

  /* DEALER */
  updateStacks(player, stack) {
    player.slice(0, 1) === "h"
      ? (this.heroStack.textContent = `$${stack}`)
      : (this.villainStack.textContent = `$${stack}`);
  }

  /* DEALER */
  updateBets(player, amount) {
    player.slice(0, 1) === "h"
      ? (this.heroBet.textContent = amount)
      : (this.villainBet.textContent = amount);
  }

  _clearBet(bet) {
    bet.textContent = "";
    bet.classList.remove("push");
  }

  /* DEALER */
  showBets(hero, villain) {
    this.heroBet.textContent = hero;
    this.villainBet.textContent = villain;

    this.bets.forEach((bet) => {
      +bet.textContent !== 0 && bet.classList.remove("push");
    });
  }

  /* DEALER */
  pushBets() {
    this.bets.forEach((bet) => {
      bet.classList.add("push");
      // bet.textContent = "";
      // bet.classList.add("hide");
      // bet.classList.remove("push");
    });
  }

  /* DEALER */
  actionMsg(player, inactive) {
    this.winner.classList.remove("hide");
    this.winner.textContent = `Action is on ${player}`;
    0;
  }

  /* DEALER */
  hideAction() {
    this.playerAction.classList.add("hide");
  }

  /* DEALER */
  //needs work****
  displayAction(el, playerName, action) {
    el.classList.remove("hide");
    el.textContent = `${playerName} ${action}`;
  }

  /* ALL? */
  removeHidden(el) {
    el.classList.remove("hide");
  }

  /* ALL */
  addHidden(el) {
    el.classList.add("hide");
  }

  /* DEALER */
  toggleCheckFold(btnsCheckFold) {
    btnsCheckFold.forEach((btn) => btn.classList.toggle("hide"));
  }

  /* DEALER */
  foldCards(parent) {
    this._findPlayer(parent).classList.add(`fold-${parent}`);
    // const cards = Array.from(this._findPlayer(parent).children);
    // console.log(cards);
    // cards.forEach((card) => card.classList.add("fold-hero"));
  }

  /* DEALER */
  newHand() {
    this.community.innerHTML = "";
    this.hero.innerHTML = "";
    this.villain.innerHTML = "";
    this.hero.classList.remove(`fold-hero`);
    this.villain.classList.remove("fold-villain");
    this.hero.classList.remove("winning-hand");
    this.villain.classList.remove("winning-hand");
    this.handDescription.classList.add("hide");
    this.unawardPot();
  }

  /* DEALER */
  init(stackSizes) {
    this.community.innerHTML = "";
    this.hero.innerHTML = "";
    this.villain.innerHTML = "";
    // this.updatePot(0);
    // this.pot.textContent = "Pot: $0";
    // this.pushBets();
    this.messages.forEach((mess) => {
      mess.textContent = "";
      mess.classList.remove("hide");
    });
    this.handDescription.classList.add("hide");
    this._addHandlerDealerBtn();
    this._addHandlerBackgroundColor();
    this.addListenerRaise(this.btnRaise);
    this.heroStack.textContent = "$" + stackSizes;
    this.villainStack.textContent = "$" + stackSizes;
    // this.input.select();
    // this.addListener(this.actions);
  }

  /* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */
  /* SCRIPT */
  _renderCard(parent, card) {
    const markup = this._generateMarkup(card.value, card.suit);
    parent.insertAdjacentHTML("beforeend", markup);
  }
  /* SCRIPT */
  _renderCards(parent, cards) {
    cards.forEach((card) => {
      this._renderCard(parent, card);
    });
  }
  /* SCRIPT */
  _renderHandDescription(description) {
    this.handDescription.textContent = description;
    !description
      ? this.handDescription.classList.add("hide")
      : this.handDescription.classList.remove("hide");
  }

  /* ALL */
  _findPlayer(player) {
    const parent =
      player.slice(0, 1).toLowerCase() === "h" ? this.hero : this.villain;
    return parent;
  }
  /* DEALER */
  _toggleBackgroundColor(e) {
    if (!e.target.classList.contains("btn")) return;

    const newColor = e.target.id;
    if (newColor === this.curColor) return;
    this.table.classList.remove(this.curColor);
    this.table.classList.add(newColor);
    this.curColor = newColor;
  }
  /* SCRIPT */
  _generateMarkup(value, suit) {
    return `
    <div class="card ${
      suit === "diamond" || suit === "heart" ? "red" : "black"
    }">
    <h1>${value}</h1>
    <div class="suit ${suit}"></div>
    <h1>${value}</h1>
    </div>
    `;
  }

  _generateBackCard() {
    return `<div class="card">
    <div class="card-back"></div>
  </div>
  <div class="card">
    <div class="card-back"></div>
  </div>`;
  }
  /* SCRIPT */
  __addGlow(hand) {
    hand.classList.add("winning-hand");
  }
  /* DEALER */
  changeButton(player) {
    this.winner.classList.remove("hide");
    // this.winner.textContent = "Action is on Hero";
    this.detail.classList.add(`rotate-${player}`);
    this.dealerBtn.classList.add(`${player}-flip`);

    this.detail.classList.remove(
      `rotate-${player === "hero" ? "villain" : "hero"}`
    );
    this.dealerBtn.classList.remove(
      `${player === "hero" ? "villain" : "hero"}-flip`
    );

    // this.detail.classList.toggle(`rotate-villain`);
    // this.dealerBtn.classList.toggle(`villain-flip`);
  }
  /* DEV */
  _addHandlerDealerBtn() {
    window.addEventListener(
      "keyup",
      function (e) {
        if (e.key !== "q") return;
        this.detail.classList.toggle("rotate-dealer");
        this.detail.classList.toggle("rotate-villain");
        this.dealerBtn.classList.toggle("dealer-flip");
        this.dealerBtn.classList.toggle("villain-flip");
      }.bind(this)
    );
  }
  /* SELF */
  _addHandlerBackgroundColor() {
    this.options.addEventListener(
      "click",
      this._toggleBackgroundColor.bind(this)
    );
  }
}

export default new View();
