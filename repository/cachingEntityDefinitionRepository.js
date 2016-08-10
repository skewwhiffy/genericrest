"use strict";

module.exports = function(entityDefinitionRepository) {
  // TODO: regularly clear cache: otherwise, we can't load balance
  // TODO: actually cache...
  let self = this;

  let cache = {};

  self.create = entityDefinitionRepository.create;

  self.read = (name, callback) => {
    let cacheKey = name.toLowerCase();
    if (cache[cacheKey]) {
      callback(false, cache[cacheKey].value);
      return;
    }
    entityDefinitionRepository.read(name, (err, def) => {
      if (err) callback(err);
      cache[cacheKey] = {
        value: def
      }
      callback(err, def);
    });
  }
}
