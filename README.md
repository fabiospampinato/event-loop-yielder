# Event Loop Yielder

A collection of strategies for yielding to the event loop, to avoid blocking for too long.

## Install

```sh
npm install --save event-loop-yielder
```

## Usage

The following functions will each make a different kind of yielder, you just call it and await its result, the yielder will decide on its own wether to actually yield to the event loop or not.

### `makeTimeoutYielder`

A timeout yielder will yield to the event loop after at least `timeout` number of milliseconds have elapsed since it last yielded.

```ts
import {makeTimeoutYielder} from 'event-loop-yielder';

const yielder = makeTimeoutYielder ( 16 ); // Yield after 16ms have elapsed since the last yield

for ( let i = 0; i < 1000000; i++ ) {

  await yielder (); // The yielder may or may not actually yield when you call it

  runSomeComputation ();

}
```

If you need to perform some quick computation a gazillion times this would be slightly more efficient:

```ts
import {makeTimeoutYielder} from 'event-loop-yielder';

const yielder = makeTimeoutYielder ( 16 );

for ( let i = 0; i < 1000000; i++ ) {

  if ( i % 100 === 0 ) { // Call the yielder only every 100th iteration

    await yielder ();

  }

  runSomeComputation ();

}
```

## License

MIT © Fabio Spampinato
