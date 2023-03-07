# Event Loop Yielder

A collection of strategies for yielding to the event loop, to avoid blocking for too long.

## Install

```sh
npm install --save event-loop-yielder
```

## Usage

The following functions will each make a different kind of yielder, you just call it and await its result, the yielder will decide on its own whether to actually yield to the event loop or not.

### `makeImmediateYielder`

An immediate yielder will yield to the main thread using a polyfilled `setImmediate`, which waits for microtasks, but not timeouts.

```ts
import {makeImmediateYielder} from 'event-loop-yielder';

const yielder = makeImmediateYielder ();

for ( let i = 0; i < 1000000; i++ ) {

  if ( i % 100 ) { // // Yielding every 100th iteration

    await yielder ();

  }

  runSomeComputation ();

}
```

### `makeIntervalYielder`

An interval yielder will yield to the event loop after at least `interval` number of milliseconds have elapsed since it last yielded.

It supports yielding via different strategies, by default it will use `setTimeout`.

```ts
import {makeIntervalYielder} from 'event-loop-yielder';

const yielder = makeIntervalYielder ( 16 ); // Yield after 16ms have elapsed since the last yield

for ( let i = 0; i < 1000000; i++ ) {

  await yielder (); // The yielder may or may not actually yield when you call it

  runSomeComputation ();

}
```

### `makeTimeoutYielder`

A timeout yielder will yield to the main thread using `setTimeout`, which usually gives a lot of time for the engine/browser to do its things.

```ts
import {makeTimeoutYielder} from 'event-loop-yielder';

const yielder = makeTimeoutYielder ();

for ( let i = 0; i < 1000000; i++ ) {

  if ( i % 100 ) { // // Yielding every 100th iteration

    await yielder ();

  }

  runSomeComputation ();

}
```

## License

MIT © Fabio Spampinato
