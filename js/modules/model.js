import { deck } from "./deck.js";

class State {
  constructor() {
    this.init();
  }

  init() {
    this.dealer = {
      // determines current betting street
      preFlopDealt: false,
      flopDealt: false,
      turnDealt: false,
      riverDealt: false,
      showDown: false,
    };
    this.cards = {
      // arrays containing full card objects
      hero: [],
      villain: [],
      board: [],
    };
    this.hands = {
      hero: {
        hand: [], // 'Ah' format : used for eval function
        finalHand: undefined, // ex. 'Two pair'
        isWinner: false,
      },
      villain: {
        hand: [], // 'Ah' format : used for eval function
        finalHand: undefined, // ex. 'Two pair'
        isWinner: false,
      },
      board: {
        hand: [], // 'Ah' format : used for eval function
        finalHand: undefined, // ex. 'Two pair'
      },
    };
    deck.reset();
    deck.shuffle();
  }

  // this function is not used preFlop
  dealBoard(card) {
    //if current street is flop
    if (!this.dealer.flopDealt) {
      // update hole cards with all board cards
      this.cards.hero.push(...this.cards.board);
      this.cards.villain.push(...this.cards.board);
    } else {
      // if current street is turn or river
      // hero, villain and board each get same card
      this.cards.board.push(card);
      this.cards.hero.push(card);
      this.cards.villain.push(card);
    }
  }

  // creates card array with 'Ah' format.  Used in updateHands().
  shorthand(arr) {
    return arr.map((card) => card.shorthand);
  }

  // used shorthand(). fills hand arrays with 'Ah' format
  updateHands() {
    this.hands.hero.hand = this.shorthand(this.cards.hero);
    this.hands.villain.hand = this.shorthand(this.cards.villain);
    this.hands.board.hand = this.shorthand(this.cards.board);
    // this.showHands();
  }

  // Logs hands with 'Ah' format to console.  For Dev purposes
  showHands() {
    console.log(`Hero | ${this.hands.hero.hand.join(" ")}`);
    console.log(`Villain | ${this.hands.villain.hand.join(" ")}`);
    this.cards.board.length > 0 &&
      console.log(`Board | ${this.hands.board.hand.join(" ")}`);
  }

  dealPreFlop() {
    // Pops card from deck deals to hero and villain 2x
    for (let i = 0; i < 2; i++) {
      this.cards.villain.push(deck.deal());
      this.cards.hero.push(deck.deal());
    }
    // converts hands to 'Ah' format
    this.updateHands();
    this.dealer.preFlopDealt = true;
  }

  dealFlop() {
    // Pops card from deck deals to board
    for (let i = 0; i < 3; i++) {
      this.cards.board.push(deck.deal());
    }
    // updates hero and villain cards with board cards
    this.dealBoard();
    // converts hands to 'Ah' format
    this.updateHands();
    this.dealer.flopDealt = true;
    return this.findDescription();
  }

  findDescription() {
    this.eval(this.hands.hero);
    this.eval(this.hands.villain);
    return this.hands.hero.finalHand.descr.replace(",", ":");
  }

  dealTurn() {
    const turnCard = deck.deal();
    this.dealBoard(turnCard);
    this.updateHands();
    this.dealer.turnDealt = true;
    return this.findDescription();
  }

  dealRiver() {
    const riverCard = deck.deal();
    this.dealBoard(riverCard);
    this.updateHands();
    this.dealer.riverDealt = true;
    // log hands with 'Ah' format to console
    this.showHands();
    //update finalHand variable ex 'two pair' for hero and villain
    return this.findDescription();
  }

  // determines finalHand, using dependecy. Takes hand array with 'Ah' format
  eval(player) {
    player.finalHand = Hand.solve(player.hand);
  }

  // calls eval() for hero and villains hands
  showDown() {
    //evaluate final hands
    this.eval(this.hands.hero);
    this.eval(this.hands.villain);
    // determine winner
    const winner = Hand.winners([
      this.hands.hero.finalHand,
      this.hands.villain.finalHand,
    ]);

    this.dealer.showDown = true;
    const winningHand = winner[0].descr.replace(",", ":");

    //  log winner to console / set isWinner (for pot collection)
    if (winner.length === 2) {
      return `Chop | ${winningHand}`;
    } else if (winner[0] === this.hands.hero.finalHand) {
      this.hands.hero.isWinner = true;
      return `Hero wins | ${winningHand}`;
    } else {
      this.hands.villain.isWinner = true;
      return `Villain wins | ${winningHand}`;
    }
  }
}

export const state = new State();
