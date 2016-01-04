function series(promises) {
  "use strict";

  let isGenerator = false;

  if (promises.constructor.name === 'GeneratorFunction') {
    isGenerator = true;
    promises = promises();
  }
  if (!isGenerator && typeof promises.shift !== "function") {
    throw new TypeError("series must implement shift() or be Generator");
  }

  function step() {
    return new Promise((resolve, reject) => {
      let currentPromise;
      if (isGenerator) {
        currentPromise = promises.next().value;
      } else {
        currentPromise = promises.shift();
      }

      if (currentPromise === undefined) {
        resolve();
      }

      Promise.resolve(isGenerator ? currentPromise : currentPromise())
      .then(step)
      .then(resolve)
      .catch(reject);
    });
  }

  return step();
}

function extendPromise(promise) {
  if (typeof promise == "undefined") {
    throw new Error("Parameter Promise required");
  }
  if (typeof promise.series !== "function") {
    promise.series = series;
  }
}

module.exports = extendPromise;