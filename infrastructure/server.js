"use strict";

let express = require("express");
let bodyParser = require("body-parser");
let IoC = require("./ioc");
let IoCRegistration = require("./iocregistration");

module.exports = function(callback) {
  let self = this;

  let server;
  let ioc;
  let router;

  self.init = callback => {
    ioc = new IoC();
    let reg = new IoCRegistration();
    reg.register(ioc, () => {
      router = ioc.resolve("router");
      callback();
    });
  }

  self.start = (port, callback) => {
    self.init(() => {
      let app = express();
      app.use(bodyParser.json());
      app.all("*", router.handle);

      if (!port) port = 8080;
      server = app.listen(port);
      if (callback) callback();
    })
  }

  self.stop = () => {
    server.close();
  }

  self.getDb = () => ioc.resolve("db");
}
