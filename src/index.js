const http = require("http");
const cluster = require("cluster");
const process = require("process");

const { JSON_TYPE, RESPONSE_MESSAGES } = require("./constants");
const apiRoutes = require("./apiRoutes.json");
const responseFunctions = require("./requestHandlers");

// Check if the current process is the master process
if (cluster.isPrimary) {
  const numCPUs = require("os").cpus().length;

  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs / 2; i++) {
    cluster.fork();
  }

  cluster.on("online", (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {

  const { connectToDB } = require("./db");

  // Connect to mongo db
  connectToDB()

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
      res.end(JSON.stringify({ message: RESPONSE_MESSAGES.NOT_FOUND }));
    }
  });

  // Start the server on port 3003
  server.listen(3003, () => {
    console.log(`Server running on port 3003 with process id ${process.pid}`);
  });
}
