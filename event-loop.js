const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

// libUV kütüphanesi thread pool size default olarak 4'tür. Aşağıdaki kriptolama işlemleri hemen hemen
// aynı süreyi alır çünkü hepsi 4 ayrı thread altına atılarak orada yürütülür. Biz burada thread pool size
// değerini 1 yaparsak süreler uzayacaktır. ilki 2. saniyede biterse diğeri 4., öteki 6. gibi. Değeri 2
// yaparsak ilk ikisi 2. saniyede biterse diğer ikisi 4. saniye bitecek gibi düşünülebilir.
process.env.UV_THREADPOOL_SIZE = 4; //sonuç olarak bu kod bende işe yaramadı. versiyon farkından olabilir !!!

// These 2 timers below are not in an event loop. Because they don't called by a callback function
setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

const readedFile = fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("-------------------------");
  // These 2 timers below are in an event loop. They called by a callback function (readFile's callback)
  setTimeout(() => console.log("Timer 2 finished"), 0); //work for 0 sec
  setTimeout(() => console.log("Timer 3 finished"), 1000); //work for 1 secs (my computer is fast so I used 1 sec)
  setImmediate(() => console.log("Immediate 2 finished"));

  //bu işlev microTask sınıfından olduğu için event loop adım aralıklarında işlenebilir.
  process.nextTick(() => console.log("Process.nextTick"));

  // This code below will block the code even nextTick !!!
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log("Time Passed:", Date.now() - start, "ms. Password encrypted");

  //   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  //     console.log("Time Passed:", Date.now() - start, "ms. Password encrypted");
  //   });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log("Time Passed:", Date.now() - start, "ms. Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log("Time Passed:", Date.now() - start, "ms. Password encrypted");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log("Time Passed:", Date.now() - start, "ms. Password encrypted");
  });
});

// Top-level code can be anywhere in code block
console.log("Hello from the top-level code");
