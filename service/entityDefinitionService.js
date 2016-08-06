"use strict";

module.exports = function(entityDefinitionRepository, entityDefinitionSanitizer) {
  let self = this;

  self.create = (def, callback) => {
    def = entityDefinitionSanitizer.clean(def);
    entityDefinitionRepository.create(def, callback)
    return true;
  }

  self.read = (name, callback) => {
    entityDefinitionRepository.read(name, (err, def) => {
      if (err) throw err;
      def = entityDefinitionSanitizer.clean(def);
      callback(err, def);
    })
    return true;
  }
}
