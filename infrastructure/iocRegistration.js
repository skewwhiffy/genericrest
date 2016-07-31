"use strict";

// Controllers
let HealthController = require("../admin/controllers/healthController");
let EntityDefinitionController = require("../admin/controllers/entityDefinitionController");
let EntityController = require("../entity/entitycontroller");

// Routers
let Router = require("./router");
let AdminRouter = require("../admin/adminRouter");

module.exports = function() {
  let self = this;

  self.register = ioc => {
    // Controllers
    ioc.registerSingleton("healthController", HealthController);
    ioc.registerSingleton("entityDefinitionController", EntityDefinitionController);
    ioc.registerSingleton("entityController", EntityController);

    // Routers
    ioc.registerSingleton("adminRouter", AdminRouter);
    ioc.registerSingleton("router", Router);
  }
}
