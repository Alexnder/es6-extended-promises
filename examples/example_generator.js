require('es6-extended-promises')(Promise);

function* genTimeout() {
  for (var i = 0; i < 4; i++) {
    yield new Promise((resolve) => {
      setTimeout(() => {
        console.log(i + " resolved");
        resolve();
      }, 1000);
    });
  }
  throw new Error("4 not resolved");
}

Promise.series(genTimeout)
.catch((err) => {
  console.log("error", err);
})
.then(() => {
  console.log("Finally");
});

/** OUTPUT
0 resolved
1 resolved
2 resolved
3 resolved
error [Error: 4 not resolved]
Finally
*/