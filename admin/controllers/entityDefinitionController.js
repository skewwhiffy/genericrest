"use strict";

module.exports = function() {
  let self = this;

  self.handle = (req, res, path) => {
    switch (req.method.toUpperCase()) {
      case "POST":
        return self.create(req, res, path);
      default:
        return false;
    }
  }

  self.create = (req, res, path) => {
    res.send({status: "DONE"});
    return true;
  }
}
