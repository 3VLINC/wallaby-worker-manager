import * as chai from 'chai';
import {Setup} from './index';
import * as tdChai from 'testdouble-chai';
import * as td from 'testdouble';
import { GenericWorker, CreateWorker, GenericWorkerConstructor } from './worker';
import { WorkerManager } from './worker-manager';
import { MockWorker } from './utils/mock-worker';
import { GetWallaby } from './utils/get-wallaby';


const expect = chai.expect;

describe('WorkerManager', () => {

  describe('CreateWorker', () => {

    const wallaby = GetWallaby(1);

    const result = CreateWorker(MockWorker, wallaby);

    result.initPromise();

  });

});