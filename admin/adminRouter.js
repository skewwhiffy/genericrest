"use strict";

let IoC = require("../infrastructure/ioc");

module.exports = function(
  healthController,
  entityDefinitionController) {
  let self = this;

  self.handle = (req, res, path) => {
    if (path.length < 1) return false;

    let controller = path[0];

    if (controller === "health") return healthController.handle(req, res, path);
    if (controller === "entity") return entityDefinitionController.handle(req, res, path);

    return false;
  }
}
