"use strict";

module.exports = function(db) {
  let self = this;

  let collectionName = "_entityDefinition";

  self.create = (def, callback) => {
    db.collection(collectionName).insert(def, callback);
  }
}
