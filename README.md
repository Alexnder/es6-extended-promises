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
