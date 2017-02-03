
export function CreateWorker<T extends GenericWorker>(workerConstructor: GenericWorkerConstructor<T>, wallaby: any): T {

  return new workerConstructor(wallaby);

}

export interface GenericWorkerConstructor<T extends GenericWorker> {
    new (_wallaby: any): T;
}

export abstract class GenericWorker {

  constructor(private _wallaby: any) {

  }

  get wallaby() {

    return this._wallaby;

  }

  abstract onInit(): Promise<any>;

  abstract onEach(): Promise<any>;

}
