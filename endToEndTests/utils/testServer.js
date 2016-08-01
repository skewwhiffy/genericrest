"use strict";

let Server = require("../../infrastructure/server");

module.exports = function(callback) {
  let self = this;

  let server = new Server();
  server.start(false, callback);

  self.stop = function() {
    server.stop();
    let db = server.getDb();
    db.dropDatabase();
    db.close();
  }
}
