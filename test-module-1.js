// class Calculator {
//   add(a, b) {
//     return a + b;
//   }
//   sub(a, b) {
//     return a - b;
//   }
//   multiply(a, b) {
//     return a * b;
//   }
//   divide(a, b) {
//     return a / b;
//   }
// }

// module.exports = Calculator;

// -------------- YA DA --------------

module.exports = class {
  add(a, b) {
    return a + b;
  }
  sub(a, b) {
    return a - b;
  }
  multiply(a, b) {
    return a * b;
  }
  div(a, b) {
    return a / b;
  }
};
