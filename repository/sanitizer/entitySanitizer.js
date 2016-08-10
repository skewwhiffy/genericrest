"use strict";

module.exports = function() {
  let self = this;

  self.cleanForDb = (instance, def) => {
    var target = {};
    copyValidFields(instance, target, def);
    copyIdField(instance, target, def);
    return target;
  }

  self.cleanForTransfer = instance => {
    var target = {};
    Object
      .keys(instance)
      .filter(k => !k.startsWith("_"))
      .forEach(k => target[k] = instance[k])
    return target;
  }

  let copyValidFields = (instance, target, definition) => {
    let fieldNames = Object.keys(definition.fields);
    for (let i = 0; i < fieldNames.length; i++) {
      target[fieldNames[i]] = instance[fieldNames[i]];
    }
  }

  let copyIdField = (instance, target, definition) => {
    let idField = Object
      .keys(definition.fields)
      .find(k => {
        return definition.fields[k].id;
      });
    if (!idField) throw "No ID field in definition";
    target._id = instance[idField];
  }
}
