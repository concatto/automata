export const LEFT = Symbol("left");
export const RIGHT = Symbol("right");
export const BLANK = Symbol("blank");

class TuringMachine {
  constructor() {
    this.rewind();
  }

  rewind() {
    this.transitions = {};
    this.finalStates = new Set();
    this.initialState = undefined;
    this.positiveTape = [];
    this.negativeTape = [];
    this.currentState = undefined;
    this.position = 0;
  }

  when(state, symbol) {
    return {
      then: (nextState, replacement, movement) => {
        if (this.transitions[state] === undefined) {
          this.transitions[state] = {};
        }

        this.transitions[state][symbol] = { nextState, replacement, movement };
      }
    };
  }

  exists(state) {
    // TODO should check for states that have no outgoing edges
    return this.transitions[state] !== undefined;
  }

  setFinalStates(...states) {
    for (const state of states) {
      this.finalStates.add(state);
    }
  }

  setInitialState(state) {
    if (this.exists(state)) {
      this.initialState = state;
    } else {
      throw new Error("This state does not exist.");
    }
  }

  readSymbol() {
    let value;
    if (this.position >= 0) {
      value = this.positiveTape[this.position];
    } else {
      value = this.negativeTape[-this.position];
    }

    return value !== undefined ? value : BLANK;
  }

  replaceSymbol(replacement) {
    if (this.position >= 0) {
      this.positiveTape[this.position] = replacement;
    } else {
      this.negativeTape[-this.position] = replacement;
    }
  }

  resizeTapes() {
    const tape = this.position >= 0 ? this.positiveTape : this.negativeTape;
    
    if (tape.length <= Math.abs(this.position)) {
      tape.push(undefined);
    }
  }

  step() {
    const symbol = this.readSymbol();
    const available = this.transitions[this.currentState] || {};
    const transition = available[symbol];

    if (transition !== undefined) {
      this.replaceSymbol(transition.replacement);
      this.currentState = transition.nextState;
      this.position += (transition.movement === RIGHT) ? 1 : -1;

      this.resizeTapes();

      console.log(`Moved to position ${this.position} with state as ${this.currentState}.`);
      return true;
    }
    
    console.log(`Halt: the state ${this.currentState} does not have a transition for symbol`, symbol);
    console.log("The input was", this.finalStates.has(this.currentState) ? "accepted" : "rejected");

    return false;
  }

  prepare(input) {
    this.positiveTape = [...input];
    this.negativeTape = [undefined];
    this.position = 0;
    this.currentState = this.initialState || Object.keys(this.transitions)[0];
  }

  run(input) {
    this.prepare(input);

    while (this.step()) {
      this.printMachineState();
    }
  }

  printMachineState() {
    console.log("Positive tape:", this.positiveTape);
    console.log("Negative tape:", this.negativeTape);
    console.log("Position:", this.position);
    console.log("Current state:", this.currentState);
  }

  getTape() {
    const tape = this.negativeTape.slice(1).reverse().concat(this.positiveTape);

    return tape.map(v => (v === undefined ? BLANK : v));
  }

  getOffset() {
    return this.negativeTape.length - 1;
  }
}

export default TuringMachine;
