
/* IMPORT */

import type {Callback} from '~/types';

/* MAIN */

//TODO: Maybe publish this as a standalone module

let tasksId = 1;
let tasksExecuting = false;
let tasksMap = new Map<number, Callback> ();
let {port1, port2} = new MessageChannel ();

const setImmediate = ( callback: Callback ): number => {
  const taskId = tasksId++;
  tasksMap.set ( taskId, callback );
  port2.postMessage ( taskId );
  return taskId;
};

const clearImmediate = ( taskId: number ): void => {
  tasksMap.delete ( taskId );
};

const runImmediate = port1.onmessage = ( event: { data: number } ): void => {
  const taskId = event.data;
  const task = tasksMap.get ( taskId );
  if ( !task ) return;
  if ( tasksExecuting ) {
    setTimeout ( runImmediate, 0, taskId );
  } else {
    try {
      tasksExecuting = true;
      task ();
    } finally {
      tasksExecuting = false;
      clearImmediate ( taskId );
    }
  }
};

/* EXPORT */

export {setImmediate, clearImmediate};
