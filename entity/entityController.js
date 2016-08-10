"use strict";

module.exports = function(entityService) {
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
    let instance = req.body;
    let defName = path[0];
    entityService.create(defName, instance, err => {
      // TODO error handling
      res.sendStatus(201);
    })
    return true;
  }

  self.read = (req, res, path) => {
    let defName = path[0];
    let instanceId = path[1];
    entityService.read(defName, instanceId, (err, instance) => {
      // TODO error handling
      console.log("Got instance: " + JSON.stringify(instance));
      res.json(instance);
    })
    return true;
  }
}
