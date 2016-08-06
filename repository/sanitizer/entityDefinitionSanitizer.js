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
    if (hasKey(source, "type")) cleaned.type = source.type;
    if (hasKey(source, "mandatory")) cleaned.mandatory = source.mandatory;
    if (hasKey(source, "id")) cleaned.id = source.id;
    return cleaned;
  }

  let hasKey = (source, key) => {
    return Object.keys(source).indexOf(key) >= 0;
  }
}
