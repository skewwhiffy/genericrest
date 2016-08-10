"use strict";

module.exports = function(db) {
  let self = this;

  self.create = (defName, instance, callback) => {
    let collectionName = defName.toLowerCase();
    db.collection(collectionName).insert(instance, callback);
  }

  self.read = (defName, instanceId, callback) => {
    let collectionName = defName.toLowerCase();
    db.collection(collectionName).find().toArray((e, r) => {
      console.log(r);
      console.log(instanceId);
    });
    db.collection(collectionName).findOne({name: instanceId}, callback);
  }
}
