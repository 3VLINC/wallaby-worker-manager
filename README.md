# Wallaby Worker Manager

Simple script that makes it easy to perform a task upon initialization of a wallaby worker, and run a separate task on every subsequent run of a Wallaby worker.

## How it works

In order to speed up test runs Wallaby can be configured to spawn multiple worker processes.

This can have unintended consequences on your tests if, for example, the tests run against a database.

In this case, tests running in one worker will impact tests running at the same time in a separate worker and provide inconsistent results.

In order to isolate your test workers, you may want to perform some specific setup and cleanup on a worker by worker basis.

This can be done in the wallaby.config.js file, by using the wallaby.workerId variable.

While this is helpful it can get messy trying to keep track of your worker setup and cleanup actions. This package is designed to make that easier.

## Usage

1. Install `npm install wallaby-worker-manager`

2. Create a worker class in your project (code shown written in Typescript)

```
import { GenericWorker } from 'wallaby-worker-manager';

export class Worker extends GenericWorker {

  public async onInit()  {

    // Run any asychronous actions here that should take place when the Wallaby Worker is initialized
    // For example, create a new database server
    // You can access the wallaby variables with `this.wallaby`

  }

  public async onEach() {

    // Run any asynchronous actions here that should take place every time this Wallaby Worker starts a test run
    // For example, close any active/idle connections to the database server, truncate the data and run the migration script
    // You can access the wallaby variables with `this.wallaby`

  }

}
```

3. Update your wallaby.config.js

```
  setup: function(wallaby) {

    // Since this is a typescript project we are going to load our worker class from the projectCacheDir
    // where wallaby has compiled it into js

    var worker = require(wallaby.projectCacheDir + '/src/wallaby-worker.js'); // path to your Worker class

    // requeire this library
    var workerManager = require('wallaby-worker-manager');
    
    // initialize the worker manager by passing in the `wallaby` parameter, and the reference to your worker class.
    workerManager.Setup(wallaby, worker.Worker);

  },
```

## Notes

The `onInit` function will run the first time Wallaby spawns a worker then it will run the `onEach` function. From then on, only the `onEach` function will run in response to code changes.

Keep in mind, that `onEach` runs before a group of tests runs, not before each individual test. You still need to take care of resetting your data using the
`beforeEach` method of your testing framework of choice. 

For example, lets say you make a code change and Wallaby decides it needs to re-run three tests based on that change. The `onEach` method will run once and then the three tests will run.

Within the `onInit` and `onEach` functions you can access the wallaby variable from the setup function with `this.wallaby`. 

This is helpful for altering your configuration on a worker by worker basis. For example, you could use `this.wallaby.workerId` in order to have each worker spawn a docker postgres database attached to different ports.

From within your application code you can use the global variable `global['_wallabyWorker']` to access the instance of the worker class created for this worker.