"use strict";

// Controllers
let HealthController = require("../admin/controllers/healthController");
let EntityDefinitionController = require("../admin/controllers/entityDefinitionController");
let EntityController = require("../entity/entitycontroller");

// Repositories
let EntityDefinitionRepository = require("../repository/entityDefinitionRepository");
let EntityDefinitionSanitizer = require("../repository/sanitizer/EntityDefinitionSanitizer");

// Services
let EntityDefinitionService = require("../service/entityDefinitionService");

// Routers
let AdminRouter = require("../admin/adminRouter");
let Router = require("./router");

// Infrastructure
let MongoDb = require("mongodb");

module.exports = function() {
  let self = this;

  self.register = (ioc, callback) => {
    // Controllers
    ioc.registerSingleton("healthController", HealthController);
    ioc.registerSingleton("entityDefinitionController", EntityDefinitionController);
    ioc.registerSingleton("entityController", EntityController);

    // Repositories
    ioc.registerSingleton("entityDefinitionRepository", EntityDefinitionRepository);
    ioc.registerSingleton("entityDefinitionSanitizer", EntityDefinitionSanitizer);

    // Services
    ioc.registerSingleton("entityDefinitionService", EntityDefinitionService);

    // Routers
    ioc.registerSingleton("adminRouter", AdminRouter);
    ioc.registerSingleton("router", Router);

    // Infrastructure
    let mongoClient = MongoDb.MongoClient;
    let dbUrl = "mongodb://127.0.0.1:27017/genericRest";
    mongoClient.connect(dbUrl, (e, c) => {
      if (e) throw e;
      ioc.registerSingleton("db", function() { return c; });
      callback();
    });
  }
}
