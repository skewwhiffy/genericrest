"use strict";

module.exports = function() {
  let self = this;

  self.handle = (req, res, path) => {
    switch (req.method.toUpperCase()) {
      case "POST":
        return self.create(req, res, path);
      case "GET":
        return self.read(req, res, path);
      default:
        return false;
    }
  }

  self.create = (req, res, path) => {
    console.log("CREATE");
    res.json({});
    return true;
  }

  self.read = (req, res, path) => {
    console.log("READ");
    res.json({});
    return true;
  }
}
