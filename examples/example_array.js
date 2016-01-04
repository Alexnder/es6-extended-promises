require('es6-extended-promises')(Promise);

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