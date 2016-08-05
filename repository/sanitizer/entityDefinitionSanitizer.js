"use strict";

module.exports = function() {
  let self = this;

  self.clean = source => {
    let cleaned = {};
    cleaned.name = source.name;
    cleaned.fields = cleanFields(source.fields);
    return cleaned;
  }

  let cleanFields = source => {
    let cleaned = {};
    let fieldNames = Object.keys(source);
    for (let i = 0; i < fieldNames.length; i++) {
      cleaned[fieldNames[i]] = cleanField(source[fieldNames[i]]);
    }
    return cleaned;
  }

  let cleanField = source => {
    let cleaned = {};
    let fieldNames = Object.keys(source);
    cleaned.type = source.type;
    if (source.mandatory) cleaned.mandatory = source.mandatory;
    if (source.id) cleaned.id = source.id;
    return cleaned;
  }
}
