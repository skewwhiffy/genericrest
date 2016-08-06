"use strict";

module.exports = function(entityRepository) {
  let self = this;

  self.create = (defName, instance, callback) => {
    // TODO: sanitize
    entityRepository.create(defName, instance, callback);
  }

  self.read = (defName, instanceId, callback) => {

  }
}
