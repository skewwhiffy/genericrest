"use strict";

module.exports = function(entityDefinitionRepository) {
  let self = this;

  self.create = (def, callback) => {
    entityDefinitionRepository.create(def, callback)
    return true;
  }

  self.read = (name, callback) => {
    entityDefinitionRepository.read(name, (err, def) => {
      if (err) throw err;
      callback(err, def);
    })
    return true;
  }
}
