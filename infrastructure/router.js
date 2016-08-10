"use strict";

module.exports = function(adminRouter, entityController) {
  let self = this;

  self.handle = (req, res) => {
    let path = req.path.split("/").filter(r => !!r).map(r => r.toLowerCase());
    if (path[0] === "_") {
      path.shift();
      handleAdmin(req, res, path);
      return;
    }

    entityController.handle(req, res, path, (e, handled) => {
      if (!handled) {
        handleAdmin(req, res, path);
      }
    })
  }

  let handleAdmin = (req, res, path) => {
    adminRouter.handle(req, res, path, (e, handled) => {
      if (!handled) res.sendStatus(404);
    });
  }
}
