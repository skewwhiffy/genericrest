"use strict";

let expect = require("chai").expect;
let Sanitizer = require("./entityDefinitionSanitizer");

describe.only("EntityDefinitionSanitizer", () => {
  let sanitizer;
  let def;

  beforeEach(() => {
    sanitizer = new Sanitizer();
    def = {
      name: "testEntity",
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
  })

  it("maps valid entity correctly", () => {
    let sanitized = sanitizer.clean(def);
    expect(sanitized).to.deep.equal(def);
  })

  it("removes invalid fields at root level", () => {
    let clone = JSON.parse(JSON.stringify(def));
    clone._name = "Should be removed";
    let sanitized = sanitizer.clean(clone);
    expect(sanitized).to.deep.equal(def);
  })

  it("removed invalid fields in field object", () => {
    let clone = JSON.parse(JSON.stringify(def));
    clone.fields.name.noWay = "No way, dude";
    let sanitized = sanitizer.clean(clone);
    expect(sanitized).to.deep.equal(def);
  })
})
