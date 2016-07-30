"use strict";

let Server = require("../../infrastructure/server");

module.exports = function() {
  let self = this;

  let server = new Server();
  server.start();

  self.stop = function() {
    server.stop();
  }
}
