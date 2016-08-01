"use strict";

module.exports = function(entityDefinitionRepository) {
  let self = this;

  self.create = (def, callback) => {
    entityDefinitionRepository.create(def, callback)
    return true;
  }

  self.read = (name, callback) => {
    callback({
      name: "testEntity"
    });
    return true;
  }
}
