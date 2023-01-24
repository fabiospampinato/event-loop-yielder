
/* IMPORT */

import {setImmediate} from '~/immediate';
import type {Yielder} from '~/types';

/* MAIN */

const makeImmediateYielder = (): Yielder => {

  return () => {

    return new Promise ( setImmediate );

  };

};

/* EXPORT */

export default makeImmediateYielder;
