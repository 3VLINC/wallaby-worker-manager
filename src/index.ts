import { WorkerManager } from './worker-manager';
import { GenericWorkerConstructor, GenericWorker } from './worker';

export async function Setup<T extends GenericWorker>(wallaby:any, worker: GenericWorkerConstructor<T>) {

  wallaby.delayStart();

  if (!global['_wallabyWorkerManager']) {

    global['_wallabyWorkerManager'] = new WorkerManager();

  }

  global['_wallabyWorker'] = await global['_wallabyWorkerManager'].handleWorker(wallaby, worker);

  wallaby.start();

}