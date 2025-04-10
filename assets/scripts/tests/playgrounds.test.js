/* File containing tests for validating data in playgrounds.js */

const {playgrounds} = require("../playgrounds.js");

describe("Playgrounds validation", () => {
  describe("Playgrounds array exist and has values", () => {
    test("Playgrounds array length is greater than 0 ", () => {
      expect(playgrounds.length).toBeGreaterThan(0);
    });
  });
  for (let playground of playgrounds) {
    describe("Every object in playgrounds array should have seven keys, and the correct keys", () => {
      test("Make sure playground have seven keys", () => {
        expect(Object.keys(playground).length).toEqual(7);
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
      test("Current playground has geoPosition key", () => {
        expect(playground.geoPosition).toBeDefined();
      });
      test("Current playground has adress key", () => {
        expect(playground.adress).toBeDefined();
      });
    });
    describe("Required fields should have values", () => {
      test("Name should have value", () => {
        expect(playground.name.length).toBeGreaterThan(0);
      });
      test("Area should have contain two items in array (Swedish and English)", () => {
        expect(playground.area.length).toEqual(2);
      });
      test("Area in Swedish should contain a value", () =>{
        expect(playground.area[0].length).toBeGreaterThan(0);
      });
      test("Area in English should contain a value", () =>{
        expect(playground.area[1].length).toBeGreaterThan(0);
      });
      test("Description array should have a length of 2", () =>{
        expect(playground.description.length).toEqual(2);
      });
      test("Movements should have at least one value", () => {
        expect(playground.movements.length).toBeGreaterThan(0);
      });
      test("Movements should not have more than three values", () => {
        expect(playground.movements.length).toBeLessThan(4);
      });
      describe("Movements array should only contain accepted values", () =>{
        let numMovements = 0;
        let movement;
          for(movement of playground.movements){
            if(movement==="ground")
              numMovements++;
            if(movement==="feet")
              numMovements++;
            if(movement==="air")
              numMovements++;
          }
          test("numMovements (number of matched movement types) shold match movements array length", () =>{
            expect(numMovements).toEqual(playground.movements.length);
          });
      });
    });
  }

});
