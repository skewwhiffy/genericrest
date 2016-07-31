"use strict";

let AdminHealthController = require("../admin/controllers/healthController");

let Router = require("./router");
let AdminRouter = require("../admin/adminRouter");

module.exports = function() {
  let self = this;

  self.register = ioc => {
    // Admin controllers
    ioc.registerSingleton("adminHealthController", AdminHealthController);

    // Routers
    ioc.registerSingleton("adminRouter", AdminRouter);
    ioc.registerSingleton("router", Router);
  }
}
