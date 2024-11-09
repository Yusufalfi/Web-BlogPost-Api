const http = require("http");;
const app = require("./app");
const {port} = require("./config/kyes");

// create server 
const server = http.createServer(app);

//listen server
server.listen(port, () => console.log(`server Running on port ${port}`));

