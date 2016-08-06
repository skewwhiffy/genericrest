"use strict";

module.exports = function(entityDefinitionService) {
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
    let def = req.body;
    if (path.length > 1 && !def.name) {
      let name = path[1];
      def.name = name;
    }
    return entityDefinitionService.create(def, err => {
      // TODO: error handling
      res.sendStatus(201);
    });
  }

  self.read = (req, res, path) => {
    if (path.length <= 1) {
      res.sendStatus(404);
      return true;
    }
    let name = path[1];
    return entityDefinitionService.read(name, (err, def) => {
      res.send(def);
    });
  }
}
