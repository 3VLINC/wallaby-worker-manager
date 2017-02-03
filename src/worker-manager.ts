import { GenericWorker, GenericWorkerConstructor, CreateWorker } from './worker';
import { find, isUndefined } from 'lodash';

export class WorkerManager {

  private _workers: GenericWorker[] = [];

  constructor() {

  }

  private findWorker(workerId: number) {
  
    for(let worker of this._workers) {

      if (worker.wallaby.workerId === workerId) {
        
        return worker;

      }

    }

  }

  public async handleWorker<T extends GenericWorker>(wallaby: any, workerClass: GenericWorkerConstructor<T>): Promise<T> {

    let worker = this.findWorker(wallaby.workerId) as T;

    if (isUndefined(worker)) {
      
      worker = CreateWorker(workerClass, wallaby);
  
      await worker.onInit();

    }

    this._workers.push(worker);

    await worker.onEach();

    return worker;

  }
  
}