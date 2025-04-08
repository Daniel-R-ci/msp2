
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
        areas.push(playground.area);
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
    $("#btnSearch").click(function () { //When search button in search form is clicked
      searchPlaygrounds();
    });
    $("#btnReset").click(function () { //When reset button in search form is clicked
      resetSearch();
    });
    $("#btnCloseDetails").click(function () { //When close button in detailsSection is clicked
      hideDetails();
    });
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
    let clickedBoxes = 0; //Counts the number of boxes clicked
    if (document.getElementById("chkMovementGround").checked === true) {
      clickedBoxes++;
      if (playground.movements.includes("ground")) {
        searchMatch++;
      }
    }
    if (document.getElementById("chkMovementFeet").checked === true) {
      clickedBoxes++;
      if (playground.movements.includes("feet")) {
        searchMatch++;
      }
    }
    if (document.getElementById("chkMovementAir").checked === true) {
      clickedBoxes++;
      if (playground.movements.includes("air")) {
        searchMatch++;
      }
    }
    if (clickedBoxes === 0) { //If no boxes are clicked, use area as only criteria
      if (document.getElementById("selectCityArea").value === "any") {
        searchMatch++;
      } else if (document.getElementById("selectCityArea").value === playground.area) {
        searchMatch++;
      } else {
        searchMatch = 0;
      }
    } else { //If one or more checkboxes are clicked, exclude playgrounds from not selected area
      if (document.getElementById("selectCityArea").value != "any") {
        if (document.getElementById("selectCityArea").value != playground.area) {
          searchMatch = 0;
        }
      }
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
      if (i % 2 === 0) {
        newDiv.classList.add("even-row"); //Style even rows
      }
      newDiv.setAttribute("data-searchListItem", i); //Stores the position in searchList array
      $("#searchResults").append(newDiv);
    }
    //Add eventlisteners to all newly created divs
    $("#searchResults").children().click(function (e) {
      showDetails(this.getAttribute("data-searchListItem"));
    });
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
 * Shows details of a specific playground
 * @param {*} searchListItem as integer
 */
function showDetails(searchListItem) {
  // Hide search and results section
  $("#searchSection").hide();
  $("#resultsSection").hide();

  // Get playground object
  let indexItem = parseInt(searchListItem);
  let playground = searchList[searchListItem];

  // Create html
  $("#detailsHeadline").html(playground.name);
  let htmlText = "";
  if (playground.image !== "") {
    htmlText += `<img src="assets/images/${playground.image}" alt="image of a playground" width="100%"><br>`
  }
  htmlText += `<p>${playground.adress} <em>- ${playground.area}</em></p><p>${playground.description}</p>`;

  htmlText += `Suitable for the following activites: `;
  let previousMovement = false;
  if (playground.movements.includes("ground")) {
    htmlText += `Ground work`;
    previousMovement = true;
  }

  if (playground.movements.includes("feet")) {
    if (previousMovement === true) {
      htmlText += `, on your feet`;
    } else {
      htmlText += `On your feet`;
      previousMovement = true;
    }
  }

  if (playground.movements.includes("air")) {
    if (previousMovement === true) {
      htmlText += `, in the air`;
    } else {
      htmlText += `In the air`;
    }
  }
  $("#playgroundDetails").html(htmlText);

  // Show detailssection  
  $("#detailsSection").show();
}

/**
 * Hide details section when Close button is clicked
 * Also show search and results section
 */
function hideDetails() {
  $("#detailsSection").hide();
  $("#searchSection").show();
  $("#resultsSection").show();
}

/**
 * Creates list element out specified playground
 * Broken out of searchPlayground() to simplify overview
 * @param {*} playground 
 * @returns newDiv
 */
function createSearchListElement(playground) {
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<strong>${playground.name}</strong> ${playground.area}<br>Suitable movement excersice: `;
  let previousMovement = false; //Used to get correct commas and capital letters

  if (playground.movements.includes("ground")) {
    if (document.getElementById("chkMovementGround").checked === true) {
      newDiv.innerHTML += `<mark>Ground work</mark>`;
    } else {
      newDiv.innerHTML += `Ground work`;
    }
    previousMovement = true;
  }

  if (playground.movements.includes("feet")) {
    if (previousMovement === true) {
      if (document.getElementById("chkMovementFeet").checked === true) {
        newDiv.innerHTML += `, <mark>on your feet</mark>`;
      } else {
        newDiv.innerHTML += `, on your feet`;
      }
    } else {
      if (document.getElementById("chkMovementFeet").checked === true) {
        newDiv.innerHTML += `<mark>On your feet</mark>`;
      } else {
        newDiv.innerHTML += `On your feet`;
      }
      previousMovement = true;
    }

    if (playground.movements.includes("air")) {
      if (previousMovement === true) {
        if (document.getElementById("chkMovementAir").checked === true) {
          newDiv.innerHTML += `, <mark>in the air</mark>`;
        } else {
          newDiv.innerHTML += `, in the air`;
        }
      } else {
        newDiv.innerHTML += `In the air`;
      }
    }
  }
  return newDiv;
}
