// console.log(arguments);
// console.log("-----------------");
// console.log(require("module").wrapper);

// module.exports
// class için genelde (upper case name) kullanılıyor.
const C = require("./test-module-1"); //import all object in here
const calc1 = new C();

console.log(calc1.add(2, 5));

//--------------------------------------------------------------------
// exports
//const calc2 = require("./test-module-2");
//console.log(calc2.multiply(2, 5));

const { add, sub, multiply, div } = require("./test-module-2");
console.log(div(2, 5));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
