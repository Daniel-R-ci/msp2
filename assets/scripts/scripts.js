
let searchList = [];

/** Functions to execute when document is fully loaded and DOM is in place */
$(document).ready(function () {

  //HTML elements to be altered  
  {
    $("#resultsSection").hide(); // Hide search results section, not to be shown before a search has been made
    $("#detailsSection").hide(); // Hide playground details, not to be shown before a search hit has been clicked
  }

  //Fill selectCityArea selector with values
  {
    // Add all areas in playgrounds to areas array, only one instance per area
    let areas = [];
    for (let playground of playgrounds) {
      if (!areas.includes(playground.area)) {
        areas.push(playground.area)
      }
    }
    areas.sort();

    //Add all city areas stored in areas array to select element
    //Basic code for adding option to select from W3 Schools, adapted to take multiple values from array
    for (let area of areas) {
      let option = document.createElement("option");
      option.text = area;
      option.value = area;
      document.getElementById("selectCityArea").add(option);
    }
  }

  //Create event handlers for functions to be called
  {
    $("#btnSearch").click(function () { //When search button is clicked
      searchPlaygrounds();
    });
    $("#btnReset").click(function () { //When reset button is clicked
      resetSearch();
    })
  }

}); //end $(document).ready(function ()

/**
 * Search through playgrounds array and create list of playgrounds matching search criteria
 */
function searchPlaygrounds() {
  $("#resultsSection").show(); //Show results section

  searchList = []; //Reset search list
  //searchList = playgrounds; //Temporary assignment, should be replaced with search function
  for (let playground of playgrounds) {
    let searchMatch = 0; //Starts with 0, counts every search hit
    if (document.getElementById("chkMovementGround").checked === true) {
      if (playground.movements.includes("ground")) {

        searchMatch++;
      }
    }
    if (document.getElementById("chkMovementFeet").checked === true) {
      if (playground.movements.includes("feet")) {
        searchMatch++;
      }
    }
    if (document.getElementById("chkMovementAir").checked === true) {
      if (playground.movements.includes("air")) {
        searchMatch++;
      }
    }
    if (document.getElementById("selectCityArea").value != "any") {
      //Reset searchMatch to 0 if city area doesn't match search criteria
      if (document.getElementById("selectCityArea").value != playground.area) {
        searchMatch = 0;
      }
    }
    else {
      searchMatch++;
    }

    if (searchMatch > 0) {
      searchList.push(playground);
    }
  }


  if (searchList.length === 0) { // No matches found
    let resultHTML = `<em>I'm sorry, no matching playgrounds were found!</em><br>Please try to broaden the search.`;
    $("#searchResults").html(resultHTML);
  }
  else { // Loop through list and create list elements
    $("#searchResults").html(""); //Empty results div after previous searches
    for (let i = 0; i < searchList.length; i++) { //Index loop used instead of for of to make use of index number
      let newDiv = createSearchListElement(searchList[i]);
      if(i%2===0){
        newDiv.classList.add("odd-row");
      }
      $("#searchResults").append(newDiv);

    }
  }

}

/**
 * Reset search form and hide result and details sections
 */
function resetSearch() {
  document.getElementById("selectCityArea").value = "any"; //Change city area selector to default,
  let checkboxes = document.getElementsByClassName("form-check-input");
  for (let checkbox of checkboxes) {
    checkbox.checked = false; //Basic code for de-selecting checkboxes from W3 Schools, adapted to work within loop
  }
  $("#resultsSection").hide(); // Hide search results section, not to be shown before a search has been made
  $("#detailsSection").hide(); // Hide playground details, not to be shown before a search hit has been clicked
}

/**
 * Creates list element out specified playground
 * Broken out of searchPlayground() simplify overview
 * @param {*} playground 
 * @returns newDiv
 */
function createSearchListElement(playground) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<strong>${playground.name}</strong> ${playground.area}<br>`
    + `Suitable movement excersice: `;
  let previousMovement = false; //Used to get correct commas and capital letters

  if (playground.movements.includes("ground")) {
    if (document.getElementById("chkMovementGround").checked === true) {
      newDiv.innerHTML += `<mark>Ground work</mark>`;
    }
    else {
      newDiv.innerHTML += `Ground work`;
    }
    previousMovement = true;
  }

  if (playground.movements.includes("feet")) {
    if (previousMovement === true) {
      if (document.getElementById("chkMovementFeet").checked === true) {
        newDiv.innerHTML += `, <mark>on your feet</mark>`;
      }
      else {
        newDiv.innerHTML += `, on your feet`;
      }
    }
    else {
      if (document.getElementById("chkMovementFeet").checked === true) {
        newDiv.innerHTML += `<mark>On your feet</mark>`;
      }
      else {
        newDiv.innerHTML += `On your feet`;
      }
      previousMovement = true;
    }


    if (playground.movements.includes("air")) {
      if (previousMovement === true) {
        if (document.getElementById("chkMovementAir").checked === true) {
          newDiv.innerHTML += `, <mark>in the air</mark>`;
        }
        else {
          newDiv.innerHTML += `, in the air`;
        }

      }
      else {
        newDiv.innerHTML += `In the air`;
      }
    }
  }

  return newDiv;
}


/* Copy of old verison of createSearchListElement
function createSearchListElement(playground) {
  let resultHTML = "<hr>";
  resultHTML += `<strong>${playground.name}</strong> ${playground.area}<br>`
    + `Suitable movement excersice: `;
  let previousMovement = false; //Used to get correct commas and capital letters

  if (playground.movements.includes("ground")) {
    if (document.getElementById("chkMovementGround").checked === true) {
      resultHTML += `<mark>Ground work</mark>`;
    }
    else {
      resultHTML += `Ground work`;
    }
    previousMovement = true;
  }

  if (playground.movements.includes("feet")) {
    if (previousMovement === true) {
      if (document.getElementById("chkMovementFeet").checked === true) {
        resultHTML += `, <mark>on your feet</mark>`;
      }
      else {
        resultHTML += `, on your feet`;
      }
    }
    else {
      if (document.getElementById("chkMovementFeet").checked === true) {
        resultHTML += `<mark>On your feet</mark>`;
      }
      else {
        resultHTML += `On your feet`;
      }
      previousMovement = true;
    }


    if (playground.movements.includes("air")) {
      if (previousMovement === true) {
        if (document.getElementById("chkMovementAir").checked === true) {
          resultHTML += `, <mark>in the air</mark>`;
        }
        else {
          resultHTML += `, in the air`;
        }

      }
      else {
        resultHTML += `In the air`;
      }
    }
  }

  return resultHTML;
}
*/
