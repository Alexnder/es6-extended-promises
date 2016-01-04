# es6-extended-promises
Implements additional Promise functions to Promise object. Witout other dependenties. Based on es6 promises.

## Installation

`npm install --save https://github.com/Alexnder/es6-extended-promises.git`

## Methods
### `series` method
Accept array with functions which return promises or generator which return promises or something else.
Method returns Promise.

```
require('es6-extended-promises')(Promise);

Promise.series([...]);

Promise.series(generator)
.catch((err) => {
  console.log("error", err);
})
.then(() => {
  console.log("Finally");
});
```

## Examples
See full examples in [examples](examples) folder