"use strict";

module.exports = function(entityDefinitionRepository, entitySanitizer, db) {
  let self = this;

  self.create = (defName, instance, callback) => {
    let collectionName = defName.toLowerCase();
    entityDefinitionRepository.read(defName, (e, def) => {
      // TODO: error handling
      let sanitized = entitySanitizer.cleanForDb(instance, def);
      db.collection(collectionName).insert(sanitized, callback);
    })
  }

  self.read = (defName, instanceId, callback) => {
    let collectionName = defName.toLowerCase();
    db.collection(collectionName).findOne({_id: instanceId}, (e, ins) => {
      // TODO: error handling
      callback(e, entitySanitizer.cleanForTransfer(ins));
    });
  }
}
