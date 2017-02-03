import { GenericWorker } from '../worker';
import * as td from 'testdouble';

export class MockWorker extends GenericWorker {

    public initPromise: Function;
    public eachPromise: Function;

    constructor(_wallaby: any) {

      super(_wallaby);

      this.initPromise = td.function('onInit');
      this.eachPromise = td.function('onEach');

    }

    onInit() {
      
      return this.initPromise();

    }

    onEach() {

      return this.eachPromise();

    }

  }
