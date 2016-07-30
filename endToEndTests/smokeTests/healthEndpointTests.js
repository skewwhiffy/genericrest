"use strict";

let TestServer = require("../utils/testServer");
let request = require("request");
let expect = require("chai").expect;
let http = require("http");

describe("/_/health/check endpoint", function() {
  let testServer;

  beforeEach(() => {
    testServer = new TestServer();
  })

  afterEach(() => {
    testServer.stop();
  })

  it("returns 200", function(done) {
    request("http://localhost:8080/_/health/check", (e, r, b) => {
      expect(r.statusCode).to.equal(200);
      done();
    });
  })
})
