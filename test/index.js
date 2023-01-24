
/* IMPORT */

import {describe} from 'fava';
import {makeIntervalYielder} from '../dist/index.js';

/* MAIN */

describe ( 'Event Loop Yielder', () => {

  describe ( 'makeIntervalYielder', it => {

    it ( 'yields to the main thread after the interval elapses, immediately', async t => {

      let yields = 0;
      let intervalId = setInterval ( () => yields += 1, 1 );

      const yielder = makeIntervalYielder ( 16, 'immediate' );

      for ( let i = 0, l = 5000; i < l; i++ ) {

        await yielder ();

        2n ** 100000000n;

      }

      clearInterval ( intervalId );

      t.is ( yields, 0 );

    });

    it ( 'yields to the main thread after the interval elapses, with a timeout', async t => {

      let yields = 0;
      let intervalId = setInterval ( () => yields += 1, 1 );

      const yielder = makeIntervalYielder ( 16, 'timeout' );

      for ( let i = 0, l = 5000; i < l; i++ ) {

        await yielder ();

        2n ** 100000000n;

      }

      clearInterval ( intervalId );

      t.true ( yields > 10 );

    });

  });

});

setTimeout ( () => {

  process.exit ( 0 );

}, 12000 );
