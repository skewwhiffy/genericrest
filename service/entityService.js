"use strict";

module.exports = function(entityRepository) {
  let self = this;

  self.create = (defName, instance, callback) => {
    entityRepository.create(defName, instance, callback);
  }

  self.read = (defName, instanceId, callback) => {
    entityRepository.read(defName, instanceId, (e, i) => {
      if (i) i._id = undefined;
      callback(e, i);
    });
  }
}
