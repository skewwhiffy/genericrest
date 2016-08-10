"use strict";

let expect = require("chai").expect;
let Repo = require("./cachingEntityDefinitionRepository");

describe("CachingEntityDefinitionRepository", () => {
  let cachingRepo;
  let actualRepo;

  beforeEach(() => {
    actualRepo = {
      readCalls: 0,
      read: (name, callback) => {
        actualRepo.readCalls++;
        callback();
      }
    }
    cachingRepo = new Repo(actualRepo);
  })

  it("calls underlying repository only once when reading", done => {
    let callsToMake = 20;
    let callsRemaining = callsToMake;
    let testWhenReady = () => {
      if (--callsRemaining === 0) {
        expect(actualRepo.readCalls).to.equal(1);
        done();
      }
    }
    for (let i = 0; i < callsToMake; i++) {
      cachingRepo.read("blah", testWhenReady);
    }
  })
})
