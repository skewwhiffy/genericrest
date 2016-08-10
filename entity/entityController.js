"use strict";

module.exports = function(entityService) {
  let self = this;

  self.handle = (req, res, path, callback) => {
    switch (req.method.toUpperCase()) {
      case "POST":
        self.create(req, res, path, callback);
        break;
      case "GET":
        self.read(req, res, path, callback);
        break;
      default:
        callback(false, false);
    }
  }

  self.create = (req, res, path, callback) => {
    let instance = req.body;
    let defName = path[0];
    entityService.create(defName, instance, err => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
      callback(false, true);
    })
  }

  self.read = (req, res, path, callback) => {
    let defName = path[0];
    let instanceId = path[1];
    entityService.read(defName, instanceId, (err, instance) => {
      if (err === "NoSuchEntityDefinition") {
        callback(false, false);
      }
      else if(!instance) {
        res.sendStatus(404);
      }
      else {
        res.json(instance);
      }
      callback(false, true);
    })
  }
}
