const http = require("http");
const cluster = require("cluster");
const process = require("process");

const { JSON_TYPE, RESPONSE_MESSAGES } = require("./constants");
const apiRoutes = require("./apiRoutes.json");
const responseFunctions = require("./requestHandlers");

// Check if the current process is the master process
// Disabling cluster for free hosting
// if (cluster.isPrimary) {
//   const numCPUs = require("os").cpus().length;

//   console.log(`Primary ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("online", (worker) => {
//     console.log(`Worker ${worker.process.pid} is online`);
//   });

//   cluster.on('exit', (worker) => {
//     console.log(`Worker ${worker.process.pid} died. Restarting...`);
//     cluster.fork();
//   });

// } else {

const { connectToDB } = require("./db");
const { sendError } = require("./httpHelpers");
const auth = require("./authHandler");

// Connect to mongo db
connectToDB()

// Create a server object
const server = http.createServer((req, res) => {
  let endpoint = req.url;
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  req.setEncoding("utf8");

  // Handle preflight requests
  if(req.method === "OPTIONS") {
    res.writeHead(200, JSON_TYPE);
    res.end();
    return;
  }

  // Remove the query params from the endpoint
  if (endpoint.includes("?")) {
    endpoint = endpoint.split("?")[0];
  }

  const endpointRouteConfigs = apiRoutes[req.method]?.[endpoint];

  if (endpointRouteConfigs) {

    // Check if the endpoint requires authorization
    if (endpointRouteConfigs?.auth) {
      auth(req)
        .then((decoded) => {
          req.user = decoded;
          const responseFunction = responseFunctions[endpointRouteConfigs.route];
          responseFunction(req, res);

        }).catch((err) => {
          sendError(res, err);
        });
    } else {

      // Call the response function without authorization
      const responseFunction = responseFunctions[endpointRouteConfigs.route];
      responseFunction(req, res);
    }

  } else {
    res.writeHead(404, JSON_TYPE);
    res.end(JSON.stringify({ message: RESPONSE_MESSAGES.NOT_FOUND }));
  }
});

// Start the server on port 3003
server.listen(3003, () => {
  console.log(`Server running on port 3003 with process id ${process.pid}`);
});
// }
