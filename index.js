const express = require("express");
const helmet = require("helmet");

const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

const notesRoutes = require("./notes/notesRoutes.js");

server.use("/api/notes", notesRoutes);

server.listen(3300, () => console.log("\nrunning on port 3300\n"));
