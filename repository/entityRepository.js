"use strict";

module.exports = function(cachingEntityDefinitionRepository, entitySanitizer, db) {
  let self = this;

  self.create = (defName, instance, callback) => {
    let collection = getCollection(defName);
    cachingEntityDefinitionRepository.read(defName, (e, def) => {
      // TODO: error handling
      let sanitized = entitySanitizer.cleanForDb(instance, def);
      collection.insert(sanitized, callback);
    })
  }

  self.read = (defName, instanceId, callback) => {
    cachingEntityDefinitionRepository.read(defName, (e, def) => {
      if (!def) {
        callback("NoSuchEntityDefinition");
      }
      else {
        let collection = getCollection(defName);
        collection.findOne({_id: instanceId}, (e, ins) => {
          if (!ins) callback(false, null);
          else callback(e, entitySanitizer.cleanForTransfer(ins));
        });
      }
    });

  }

  let getCollection = name => db.collection(name.toLowerCase());
}
