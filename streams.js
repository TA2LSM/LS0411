const fs = require("fs");
// require("http") returns an object and stored in the server variable
const server = require("http").createServer();

// req is readable stream, res is writable stream
server.on("request", (req, res) => {
  // Solution 1: loads entire file to the memory (into data variable) and send back to browser. Not a good way !!!
  // data will be a readable stream
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //---------------------------------
  //---------------------------------
  // Solution 2: Streams (Back pression, readable stream, res writable stream'inden kat ve kat daha hızlı)
  // Bu nedenle gelen isteklerin cevabının dönmesi datanın okunmasından çok daha yavaş olduğu için
  // çoklu request'lerde sıkıntı olacaktır.
  //   const readable = fs.createReadStream("test-file2.txt");
  //   //const readable = fs.createReadStream("test-file.txt", "utf-8");

  //   // "data" emit'ini dinle
  //   // burada parça parça (chunk by chunk) verileri readable stream'ine yazıyor. İşi bitince de .end() emit ediyor.
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   // "end" emit'ini dinle
  //   //.end() emit edildiğinde res'e yazılacak daha fazla data yok demektir.
  //   readable.on("end", () => {
  //     res.end();
  //   });

  //   // "data" ve ardından "end" event'i yazılmalı. Yoksa browser'a cevap gitmez

  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });
  //---------------------------------
  //---------------------------------
  // Solution 3: Using pipe()
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res); // >> readableStrem.pipe(writableDestination);  writableDestination is a duplex OR a transform stream
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server started. Listening on 8000...");
});
