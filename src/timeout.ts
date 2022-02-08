
/* IMPORT */

import {yieldNow} from './utils';
import {Yielder} from './types';

/* MAIN */

const makeTimeoutYielder = ( timeout: number ): Yielder => {

  let start = 0;

  return () => {

    const now = Date.now ();

    start = start || now;

    const elapsed = now - start;

    if ( elapsed < timeout ) return;

    start = 0;

    return yieldNow ();

  };

};

/* EXPORT */

export default makeTimeoutYielder;
