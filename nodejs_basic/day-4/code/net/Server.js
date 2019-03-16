const net = require("net");

const server = net.createServer();

let clients = {}; // 所有在线的客户端
let name = 0;

server.on("connection", sock => {
  sock.name = ++name;
  clients[sock.name] = sock;

  sock.setEncoding("utf-8");
  sock.on("data", msg => {
    console.log(msg);
    sock.write("hello, too");
    broadcast(sock, msg);
  });
});

server.on("error", err => {
  console.error(err);
});

server.on("close", () => {
  console.log("Server closed.");
});

server.listen(1234, err => {
  if (err) return console.error(err);
  console.log("Server running.");
});

function broadcast(curClient, msg) {
  for (var name in clients) {
    if (clients[name] != curClient) {
      clients[name].write(curClient.name + ": " + msg);
    }
  }
}
