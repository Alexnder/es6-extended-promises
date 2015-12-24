Promise.series = (promises) => {
  if (typeof promises.shift !== "function") {
    throw new TypeError("series must implement shift()");
  }

  function step() {
    return new Promise((resolve, reject) => {
      let currentPromise = promises.shift();
      if (currentPromise === undefined) {
        resolve();
      }

      Promise.resolve(currentPromise())
      .then(step)
      .then(resolve)
      .catch(reject);
    });
  }

  return step();
};
