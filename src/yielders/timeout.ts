
/* IMPORT */

import type {Yielder} from '~/types';

/* MAIN */

const makeTimeoutYielder = (): Yielder => {

  return () => {

    return new Promise ( resolve => {

      setTimeout ( resolve, 0 );

    });

  };

};

/* EXPORT */

export default makeTimeoutYielder;
