"use strict";

let IoC = require("../infrastructure/ioc");

module.exports = function(adminHealthController) {
  let self = this;

  self.handle = (req, res, path) => {
    if (path.length < 1) return false;

    let controller = path[0];

    if (controller === "health") return adminHealthController.handle(req, res, path);
    return false;
  }
}
