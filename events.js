const EventEmitter = require("events"); // "EventEmitter" is a standard name for requiring emitter modules
const http = require("http");

// //-----------------------------------------------
// //const myEmitter = new EventEmitter();

// //------------- YA DA ---------------------------

// // ES6 tabanlı code. EventEmitter class'tı burada Sales adlı bir class daha oluşturduk ve bu
// // EventEmitter'ın içerdiklerini içeriyor. (inherit) Sales: parentClass, EventEmitter: superClass
// class Sales extends EventEmitter {
//   // constructor, obje oluşturulur oluşturulmaz çalışan kod
//   constructor() {
//     super(); // bunu çalıştırarak EventEmitter'in tüm methotlarına erişebiliyoruz
//   }
// }

// const myEmitter = new Sales();
// //-----------------------------------------------

// // Aynı sinyali dinleyen birden fazla kod varsa yazılış sırası ile çalışırlar.
// // "newSale" adındaki event sinyallerini yakala (listener / observer)
// myEmitter.on("newSale", () => {
//   console.log("There was a new sale!");
// });

// myEmitter.on("newSale", () => {
//   console.log("Customer name: TA2LSM");
// });

// // "stock" is an argument for callback function
// myEmitter.on("newSale", (stock) => {
//   console.log(`There are now ${stock} items left in the stock.`);
// });

// myEmitter.emit("newSale", 9); // "newSale" adında bir sinyal yay

// //------------------------------------------------------------------

const server = http.createServer();

// .on ile listener açılmış olunuyor. Burada request istekleri dinleniyor.
server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received"); //sadece bir tane cevap (response) yollanabilir. Alttaki koda bunu yazsak hata verebilir
});

server.on("request", (req, res) => {
  console.log("Another request :)");
});

server.on("close", () => {
  console.log("Server closed!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server started. Waiting for requests...");
});
