const app = require("./app");
const http = require('http');
require("./config/db")

const myServer = http.createServer(app)

const PORT = 3000;
myServer.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});