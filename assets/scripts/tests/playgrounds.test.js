/* File containing tests for validating data in playgrounds.js */

const playgrounds = require("../playgrounds");

describe("Playgrounds validation", () => {
  describe("Playgrounds array exist and has values", () => {
    test("Playgrounds array length is greater than 0 ", () => {
      expect(playgrounds.length).toBeGreaterThan(0);
    });
    for (let playground of playgrounds) {
      describe("Every object in playgrounds array should have eight keys, and the correct keys", () => {
        test("Make sure playground eight keys", () => {
          expect(Object.keys(playground).length).toEqual(8);
        });
        test("Current playground has name key", () => {
          expect(playground.name).toBeDefined();
        });
        test("Current playground has name key", () => {
          expect(playground.area).toBeDefined();
        });
        test("Current playground has movements key", () => {
          expect(playground.movements).toBeDefined();
        });
        test("Current playground has description key", () => {
          expect(playground.description).toBeDefined();
        });
        test("Current playground has geoX key", () => {
          expect(playground.geoX).toBeDefined();
        });
        test("Current playground has geoY key", () => {
          expect(playground.geoY).toBeDefined();
        });
        test("Current playground has geoY key", () => {
          expect(playground.geoY).toBeDefined();
        });
        test("Current playground has adress key", () => {
          expect(playground.adress).toBeDefined();
        });
      });
      describe("Required fields should have values", () =>{
        test("Name should have value", () =>{
          expect(playground.name.length).toBeGreaterThan(0);
        });
        test("Area should have value", () =>{
          expect(playground.area.length).toBeGreaterThan(0);
        });
        test("Movements should have values", () =>{
          expect(playground.movements.length).toBeGreaterThan(0);
        });
        test("Movements should not have more than three values", () =>{
          expect(playground.movements.length).toBeLessThan(4);
        });
      });
    }

  });
});