
/* IMPORT */

const {describe} = require ( 'fava' );
const {makeTimeoutYielder} = require ( '../dist' );

/* MAIN */

describe ( 'Event Loop Yielder', () => {

  describe ( 'makeTimeoutYielder', it => {

    it ( 'yields to the main thread after the timeout elapses', async t => {

      let yields = 0;
      let intervalId = setInterval ( () => yields += 1, 1 );

      const yielder = makeTimeoutYielder ( 16 );

      for ( let i = 0, l = 5000; i < l; i++ ) {

        await yielder ();

        2n ** 100000000n;

      }

      clearInterval ( intervalId );

      t.true ( yields > 10 );

    });

  });

});
