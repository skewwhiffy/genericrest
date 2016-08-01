"use strict";

let Server = require("./infrastructure/server");

let server = new Server();
server.start(80);
