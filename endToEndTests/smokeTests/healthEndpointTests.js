"use strict";

let TestServer = require("../utils/testServer");
let request = require("request");
let expect = require("chai").expect;
let http = require("http");

describe("/_/health/check endpoint", () => {
  let testServer;

  beforeEach(() => {
    testServer = new TestServer();
  })

  afterEach(() => {
    testServer.stop();
  })

  describe("When I make a request", () => {
    let response;

    beforeEach(done => {
      request("http://localhost:8080////_//HEalth/check", (e, r, b) => {
        response = r;
        done();
      });
    })

    it("returns 200", () => {
      expect(response.statusCode).to.equal(200);
    })
  })

  describe("When there are no entities defined", () => {
    describe("When I make a request without the _ admin indicator", () => {
      let response;

      beforeEach(done => {
        request("http://localhost:8080/health////CHEck//", (e, r, b) => {
          response = r;
          done();
        })
      })

      it("returns 200", () => {
        expect(response.statusCode).to.equal(200);
      })
    })
  })
})
