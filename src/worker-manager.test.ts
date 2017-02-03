import * as chai from 'chai';
import {Setup} from './index';
import * as tdChai from 'testdouble-chai';
import * as td from 'testdouble';
import { GenericWorker } from './worker';
import { WorkerManager } from './worker-manager';
import { MockWorker } from './utils/mock-worker';
import { GetWallaby } from './utils/get-wallaby';

const expect = chai.expect;

describe('WorkerManager', () => {

  beforeEach(() => {
      
    td.reset();
    delete global['_wallabyWorkerManager'];

  });
  
  it('should call init and each on first run of each worker', async () => {

    const manager = new WorkerManager();

    const wallaby1 = GetWallaby(1);
    const wallaby2 = GetWallaby(2);

    const worker1 = await manager.handleWorker(wallaby1, MockWorker);
    const worker2 = await manager.handleWorker(wallaby2, MockWorker);

    td.verify(worker1.initPromise(), { times: 1 });
    td.verify(worker1.eachPromise(), { times: 1 });
    td.verify(worker2.initPromise(), { times: 1 });
    td.verify(worker2.eachPromise(), { times: 1 });

  });

  it('should call each on second run of a particular worker', async() => {

    const manager = new WorkerManager();

    const wallaby1 = GetWallaby(1);
    const wallaby2 = GetWallaby(2);

    const worker1 = await manager.handleWorker(wallaby1, MockWorker);
    const worker2 = await manager.handleWorker(wallaby2, MockWorker);

    // second run
    await manager.handleWorker(wallaby1, MockWorker);

    td.verify(worker1.initPromise(), { times: 1 });
    td.verify(worker1.eachPromise(), { times: 2 });
    td.verify(worker2.initPromise(), { times: 1 });
    td.verify(worker2.eachPromise(), { times: 1 });    

  });

});