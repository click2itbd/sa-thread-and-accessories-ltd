const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");

// If running in standalone deploy directory
const standaloneServer = path.join(__dirname, ".next", "standalone", "server.js");
if (fs.existsSync(standaloneServer) && __filename !== standaloneServer) {
  require(standaloneServer);
} else {
  const port = parseInt(process.env.PORT || "3000", 10);
  const dev = process.env.NODE_ENV !== "production";
  const app = next({ dev });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, () => {
      console.log(`> Server ready on port ${port}`);
    });
  });
}
