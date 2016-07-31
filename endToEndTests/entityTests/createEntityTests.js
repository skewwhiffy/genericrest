"use strict";

let TestServer = require("../utils/testServer");
let request = require("request");
let expect = require("chai").expect;
let http = require("http");

describe("Given an entity definition", () => {
  let testServer;
  let entityDef;

  beforeEach(done => {
    testServer = new TestServer();
    entityDef = {
      fields: {
        name: {
          type: "string",
          mandatory: true,
          id: true
        },
        mandatoryInteger: {
          type: "integer",
          mandatory: true
        },
        nonMandatoryDecimal: {
          type: "decimal",
          mandatory: false
        }
      }
    }
    request.post("http://localhost:8080/_/entity/testEntity", entityDef, (e, r, b) => {
      expect(r.statusCode).to.equal(200);
      done();
    })
  })

  afterEach(() => {
    testServer.stop();
  })

  describe("When I create an entity instance", () => {
    let instance;

    beforeEach(done => {
      instance = {
        name: "testInstance",
        mandatoryInteger: 7,
        nonMandatoryDecimal: 3.14
      };
      request.post("http://localhost:8080/testEntity", instance, (e, r, b) => {
        expect(r.statusCode).to.equal(200);
        done();
      })
    })

    describe("When I retrieve the entity", () => {
      let instanceReturned;

      beforeEach(done => {
        request.get("http://localhost:8080/testEntity/testInstance", (e, r, b) => {
          expect(r.statusCode).to.equal(200);
          instanceReturned = b;
          done();
        })
      })

      it.only("matches the one I created", () => {

      });
    })
  })

  describe("When no entities have been created", () => {
    describe("When I try and get an entity by ID", () => {
      let response;

      beforeEach(done => {
        request("http://localhost:8080/testEntity/someString", (e, r, b) => {
          response = r;
          done();
        })
      })

      it("returns a 404", () => {
        expect(response.statusCode).to.equal(404);
      })
    })
  })
})
