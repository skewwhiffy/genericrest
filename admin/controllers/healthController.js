"use strict";

module.exports = function() {
  let self = this;

  self.handle = (req, res, path) => {
    if (path.length < 2) return false;
    if (path[1] === "check") return self.check(req, res, path);
    return false;
  }

  self.check = (req, res, path) => {
    res.send({status: "OK"});
    return true;
  }
}
