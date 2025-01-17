
/* IMPORT */

import makeImmediateYielder from './immediate';
import makeTimeoutYielder from './timeout';
import type {Yielder} from '../types';

/* MAIN */

const makeIntervalYielder = ( interval: number, strategy: 'immediate' | 'timeout' = 'timeout' ): Yielder => {

  const yieldNow = ( strategy === 'timeout' ) ? makeTimeoutYielder () : makeImmediateYielder ();

  let start = 0;

  return () => {

    const now = Date.now ();

    start = start || now;

    const elapsed = now - start;

    if ( elapsed < interval ) return;

    start = 0;

    return yieldNow ();

  };

};

/* EXPORT */

export default makeIntervalYielder;
