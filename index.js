const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

const notesRoutes = require("./notes/notesRoutes.js");

server.use("/api", notesRoutes);

server.listen(3300, () => console.log("\nrunning on port 3300\n"));
