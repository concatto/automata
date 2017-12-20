<template>
  <div class="hello">
    <h1>{{ machine.currentState }}</h1>
    <div class="tape">
      <div v-for="(symbol, index) of machine.getTape()"
        v-bind:key="index"
        v-bind:class="{active: isActive(index), blank: isBlank(symbol)}"
      >
        {{ isBlank(symbol) ? "Ø" : symbol }}
      </div>
    </div>
    <br/>
    
    <h2 v-on:click="test">Step</h2>
  </div>
</template>

<script>
import TuringMachine, { LEFT, RIGHT, BLANK } from '@/machines/turing';

const machine = new TuringMachine();
machine.when("q0", "0").then("q0", "0", RIGHT);
machine.when("q0", "1").then("q0", "1", RIGHT);
machine.when("q0", BLANK).then("q1", "0", RIGHT);
machine.setFinalStates("q1");
machine.prepare("1010010");

export default {
  name: 'TuringMachine',
  data() {
    return {
      machine,
    };
  },
  methods: {
    test() {
      this.machine.step();
    },
    isActive(index) {
      const val = index - this.machine.getOffset() === this.machine.position;
      console.log(index, val);
      return val;
    },
    isBlank(symbol) {
      return symbol === BLANK;
    }
  },
};
</script>

<style scoped>
div.tape > div {
  display: inline-block;
}

.tape .active {
  color: #007700;
  font-weight: bold;
}

.tape .blank {
  opacity: 0.333;
}
</style>