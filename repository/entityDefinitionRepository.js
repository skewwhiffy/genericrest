"use strict";

module.exports = function(db) {
  let self = this;

  let collectionName = "_entityDefinition";

  self.create = (def, callback) => {
    def["_name"] = def.name.toLowerCase();
    db.collection(collectionName).insert(def, callback);
  }

  self.read = (name, callback) => {
    db.collection(collectionName).findOne({_name: name.toLowerCase()}, (e, d) => {
      callback(e, d);
    });
  }
}
