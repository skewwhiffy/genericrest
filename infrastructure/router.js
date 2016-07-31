"use strict";

module.exports = function(adminRouter, entityController) {
  let self = this;

  self.handle = (req, res) => {
    let path = req.path.split("/").filter(r => !!r).map(r => r.toLowerCase());
    if (path[0] === "_") {
      path.shift();
      if (!adminRouter.handle(req, res, path)) {
        res.status(404).send("Not found");
        return false
      }
      return true;
    }
    if (entityController.handle(req, res, path)) return true;

    if (adminRouter.handle(req, res, path)) return true;
    res.status(404).send("Not found");
    return false;
  }
}