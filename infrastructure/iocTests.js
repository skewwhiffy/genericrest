"use strict";

let expect = require("chai").expect;
let IoC = require("./ioc");

describe("IoC container", function() {
  let container;
  let newType;
  let constructorCalled;

  beforeEach(function() {
    container = new IoC();
    constructorCalled = 0;
    newType = function() {
      let self = this;
      constructorCalled++;

      self.random = Math.random();
      self.hello = () => "hello";
    }
  })

  describe("with transient registration", function() {
    beforeEach(function() {
      container.registerTransient("newType", newType);
    })

    it("resolves registered type", function() {
      let instance = container.resolve("newType");
      expect(constructorCalled).to.equal(1);
    })

    it("will only register a type once", function(done) {
      try {
        container.registerTransient("newtype", newType);
      } catch(err) {
        done();
      }
    })

    it("will create a new instance every time", function() {
      let first = container.resolve("newType");
      let second = container.resolve("newType");
      expect(constructorCalled).to.equal(2);
    })
  })

  describe("with singleton registration", function() {
    beforeEach(function() {
      container.registerSingleton("newType", newType);
    })

    it("resolves registered type", function() {
      let instance = container.resolve("newType");
      expect(constructorCalled).to.equal(1);
    })

    it("will only register a type once", function(done) {
      try {
        container.registerSingleton("newtype", newType);
      } catch(err) {
        done();
      }
    })

    it("will create a new instance every time", function() {
      let first = container.resolve("newType");
      let second = container.resolve("newType");
      expect(constructorCalled).to.equal(1);
    })
  })

  describe("with registration with dependencies", function() {
    let typeWithDependency;
    let dependentConstructorCalled;

    beforeEach(function() {
      dependentConstructorCalled = 0;
      typeWithDependency = function(newType) {
        let self = this;
        dependentConstructorCalled++;

        self.newType = newType;
      }
    })

    it("will resolve", function() {
      container.registerTransient("typeWithDependency", typeWithDependency);
      container.registerTransient("newType", newType);
      let instance = container.resolve("typeWithDependency");
      expect(dependentConstructorCalled).to.equal(1);
      expect(constructorCalled).to.equal(1);
    })
  })
})
