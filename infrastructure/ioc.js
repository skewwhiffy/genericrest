"use strict";

module.exports = function() {
  let self = this;

  let registrations = {};

  let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  let ARGUMENT_NAMES = /([^\s,]+)/g;

  let getParamNames = func => {
    let fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null) result = [];
    return result;
  }

  let construct = constructor => {
    let args = getParamNames(constructor).map(self.resolve);
    function F(args) {
      return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F(args);
  }

  self.registerTransient = (typeName, constructor) => {
    typeName = typeName.toLowerCase();
    if (registrations[typeName]) throw "Already registered";
    registrations[typeName] = {
      constructor,
      lifetime: "transient"
    };
  }

  self.registerSingleton = (typeName, constructor) => {
    typeName = typeName.toLowerCase();
    if (registrations[typeName]) throw "Already registered";
    registrations[typeName] = {
      constructor,
      lifetime: "singleton"
    };
  }

  self.resolve = type => {
    type = type.toLowerCase();
    let registration = registrations[type];
    if (!registration) return false;
    switch (registration.lifetime) {
      case "transient":
        return construct(registration.constructor);
      case "singleton":
        if (!registration.singleton) registration.singleton = construct(registration.constructor);
        return registration.singleton;
      default:
        throw "Unrecognized lifetime: '" + registration.lifetime + "'"
    }
    return new registrations[type].constructor();
  };
}
