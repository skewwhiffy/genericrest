"use strict";

module.exports = function(entityDefinitionRepository) {
  // TODO: regularly clear cache: otherwise, we can't load balance
  // TODO: actually cache...
  let self = this;

  self.create = entityDefinitionRepository.create;

  self.read = entityDefinitionRepository.read;
}
