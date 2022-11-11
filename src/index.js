const http = require("http");

const { JSON_TYPE } = require("./constants");
const responseFunctions = require("./requestHandlers");

const apiRoutes = require("./apiRoutes.json");

// Create a server object
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', "*");

  req.setEncoding("utf8");

  const responseFunctionKey = apiRoutes[req.method]?.[req.url];
  
  if (responseFunctionKey) {
    const responseFunction = responseFunctions[responseFunctionKey];
    responseFunction(req, res);
  } else {
    res.writeHead(404, JSON_TYPE);
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

// Start the server on port 3003
server.listen(3003, () => {
  console.log("Server running on port 3003");
});