"use strict";

let IoC = require("../infrastructure/ioc");

module.exports = function(
  healthController,
  entityDefinitionController) {
  let self = this;

  self.handle = (req, res, path, callback) => {
    if (path.length < 1) return false;

    let controller = path[0];

    if (controller === "health") callback(false, healthController.handle(req, res, path));
    else if (controller === "entity") callback(false, entityDefinitionController.handle(req, res, path));
    else callback(false, false);
  }
}
