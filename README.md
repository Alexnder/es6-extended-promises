# es6-extended-promises
Implements additional Promise functions

## Sample `series`
```
Promise.series([
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("First resolved");
        resolve();
      }, 1000);
    });
  },
  () => {
    console.log("1.5 resolved");
  },
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Second resolved");
        resolve();
      }, 700);
    });
  },
  () => {
    throw new Error("last err");
  },
])
.catch((err) => {
  console.log("error", err);
})
.then(() => {
  console.log("Finally");
});
```
### Output
```
First resolved
1.5 resolved
Second resolved
error Error: last err(…)
Finally
```

## Sample `series` with generator
```
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
```
### Output
```
0 resolved
1 resolved
2 resolved
3 resolved
error Error: 4 not resolved(…)
Finally
```
