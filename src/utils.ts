
/* MAIN */

const yieldNow = (): Promise<void> => {

  return new Promise ( resolve => {

    setTimeout ( resolve, 0 );

  });

};

/* EXPORT */

export {yieldNow};
