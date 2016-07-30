"use strict";

let express = require("express");

module.exports = function() {
  let self = this;

  let server;

  self.start = function(port) {
    let app = express();
    app.get("/_/health/check", (req, res) => {
      res.json({status: "OK"});
    })

    if (!port) port = 8080;
    server = app.listen(port);
  }

  self.stop = function() {
    server.close();;
  }
}
