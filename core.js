"use strict";

function isGeneratorFunction(target) {
  return target.constructor.name === 'GeneratorFunction';
}

function nextTask(target) {
  if (isGeneratorFunction(target)) {
    return target.next().value;
  } else {
    return target.shift();
  }
}

function series(promises) {
  let isGenerator = isGeneratorFunction(promises);

  if (isGenerator) {
    promises = promises();
  } else if (typeof promises.shift !== "function") {
    throw new TypeError("series must implement shift() or be Generator");
  }

  function step() {
    return new Promise((resolve, reject) => {
      let currentPromise = nextTask(promises);

      if (currentPromise === undefined) {
        resolve();
      }

      if (!isGenerator) {
        currentPromise = currentPromise();
      }

      Promise.resolve(currentPromise)
      .then(step)
      .then(resolve)
      .catch(reject);
    });
  }

  return step();
}

function parallel(promises) {
  // Max parallel tasks
  let parallelLimit = 100;

  let isGenerator = isGeneratorFunction(promises);
  let results = [];
  let tasks = [];

  if (isGenerator) {
    promises = promises();
  } else if (typeof promises.shift !== "function") {
    throw new TypeError("series must implement shift() or be Generator");
  }

  let i = 0;

  do {
    let num = i++;
    let currentPromise = nextTask(promises);

    if (currentPromise === undefined) {
      break;
    }

    if (num > parallelLimit) {
      throw new Error("Limit of parallel promises exhausted");
    }

    if (!isGenerator) {
      currentPromise = currentPromise();
    }

    let task = Promise.resolve(currentPromise)
    .then((result) => {
      results[num] = result;
    });

    results.push(undefined);
    tasks.push(task);
  } while (true);

  return Promise.all(tasks)
    .then(() => {
      return results;
    });
}

function extendPromise(promise) {
  if (typeof promise == "undefined") {
    throw new Error("Parameter Promise required");
  }
  if (typeof promise.series !== "function") {
    promise.series = series;
  }
  if (typeof promise.parallel !== "function") {
    promise.parallel = parallel;
  }
}

module.exports = extendPromise;