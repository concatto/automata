import Vue from 'vue';
import Router from 'vue-router';
import TuringMachine from '@/components/TuringMachine';
// import TuringMachine, { LEFT, RIGHT, BLANK } from '@/machines/turing';

// window.machine = new TuringMachine();
// window.LEFT = LEFT;
// window.RIGHT = RIGHT;
// window.BLANK = BLANK;

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: TuringMachine
    }
  ]
})
