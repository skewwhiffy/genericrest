"use strict";

module.exports = function(db) {
  let self = this;

  self.create = (defName, instance, callback) => {
    let collectionName = defName.toLowerCase();
    db.collection(collectionName).insert(instance, callback);
  }
}
