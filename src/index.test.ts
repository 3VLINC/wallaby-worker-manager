import * as chai from 'chai';
import {Setup} from './index';
import * as tdChai from 'testdouble-chai';
import * as td from 'testdouble';
import { GenericWorker } from './worker';
import { MockWorker } from './utils/mock-worker';
import { GetWallaby } from './utils/get-wallaby';

chai.use(tdChai(td));

const expect = chai.expect;

describe(
  'index', () => {

    beforeEach(() => {
      
      td.reset();
      delete global['_wallabyWorkerManager'];

    });

    describe('Setup', () => {
      
      it('should start wallaby and call delay start then start.', async () => {

        const wallaby = td.object(GetWallaby(1));

        const setup = await Setup(wallaby, MockWorker);

        td.verify(wallaby.delayStart());
        td.verify(wallaby.start());
        
      });

    });

  }
);
