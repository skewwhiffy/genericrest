"use strict";

let express = require("express");
let IoC = require("./ioc");
let IoCRegistration = require("./iocregistration");

module.exports = function() {
  let self = this;

  let server;
  let ioc;
  let router;

  self.init = () => {
    ioc = new IoC();
    let reg = new IoCRegistration();
    reg.register(ioc);
    router = ioc.resolve("router");
  }

  self.start = port => {
    let app = express();
    app.all("*", router.handle);

    if (!port) port = 8080;
    server = app.listen(port);
  }

  self.stop = () => {
    server.close();;
  }

  self.init();
}
