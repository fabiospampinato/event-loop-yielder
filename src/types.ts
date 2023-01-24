
/* MAIN */

type Callback = () => void;

type Yielder = () => Promise<void> | void;

/* EXPORT */

export type {Callback, Yielder};
