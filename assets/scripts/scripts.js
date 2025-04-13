/*** GlOBAL VARIABLES ***/
// playgrounds array also used, initialized in playgrounds.js
let searchList = []; //Contains a list of playgrounds matching the latest search
let ljMap = null; //Contains the LeafJet Map
let ljMarker = null; //Contains the LeafJet Marker
const langSwedish = 0;
const langEnglish = 1;
let choosenLanguage = langSwedish;

/** Functions to execute when document is fully loaded and DOM is in place */
$(document).ready(function () {

  //Initialize map, code from LeafJets.com
  ljMap = L.map("map").setView([0, 0], 14);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(ljMap);

  //HTML elements to be altered  
  {
    $("#resultsSection").hide(); // Hide search results section, not to be shown before a search has been made
    $("#detailsSection").hide(); // Hide playground details, not to be shown before a search hit has been clicked
    $("#movementsInfoSection").hide(); //Hide movements info, not to be shown before a question mark has been clicked
  }

  //Call a language change (default language Swedish) to force a translation of all needed fixed forms
  changeLanguage(langSwedish);

  //Create event handlers for functions to be called, if code is more than three lines it has been boken out into separate functions
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
    $("#btnCloseMovementInfo").click(function(){
        $("#movementsInfoSection").hide();
        $("#searchSection").show();
    });
    $("#languageSwedish").click(function () { //When Swedish flag is clicked
      changeLanguage(langSwedish);
    });
    $("#languageEnglish").click(function () { //When English flag is clicked
      changeLanguage(langEnglish);
    });
    $(".fa-circle-question").click(function () {
      showMovementDetails();
    });
  }
}); //end $(document).ready(function ()

/**
 * Show information about movements
 */
function showMovementDetails() {
  //Hide search field
  $("#searchSection").hide();

  //Fill information section dependning on chosen language
  switch (choosenLanguage) {
    case langSwedish:
      $("#h2movementsInfo").html("Småbarnsmotorik");
      $("#movementsInfo").html(`<p>Det är viktigt för småbarn att öva sin motorik. De motoriska färdigheterna är fjorton till antalet, och på
        denna webbplats har vi delat in dem i tre kategorier
        för att lättare kunna hitta lekplatser som utmanar
        de färdigheter som ditt/dina barn behöver öva på.
        </p>
        <ul>
          <li><strong>På marken</strong></li>
          <ul>
            <li>lyfta på huvudet</li>
            <li>rulla</li>
            <li>åla</li>
             <li>krypa</li>
            <li>stödja</li>
           </ul>
           <li><strong>På fötterna</strong></li>
             <ul>
              <li>balansera</li>
              <li>gå</li>
              <li>springa</li>
              <li>koordination</li>
              <li>kasta/fånga</li>
              <li>korsrörelser</li>
            </ul>
            <li><strong>I luften</strong></li>
            <ul>
              <li>guna</li>
              <li>hoppa och klättra</li>
            </ul>
          </ul>`);
          $("#btnCloseMovementInfo").html("Stäng");
      break;
    case langEnglish:
      $("#h2movementsInfo").html("Toddler motor skills");
      $("#movementsInfo").html(`<p>It's important for toddlers to practice their motor skills The motor skills are fourteen in number, and
         on this website we have grouped them into three categories to easier be able to find playgrounds that challenge  the skills your toddler/toddlers 
         need to practice. </p>
         <ul>
            <li><strong>On the ground</strong></li>
            <ul>
              <li>lift your head</li>
              <li>rolling</li>
              <li>belly crawl</li>
              <li>crawl</li>
              <li>support</li>
            </ul>
            <li><strong>On your feet</strong></li>
            <ul>
              <li>balance</li>
              <li>walk</li>
              <li>run</li>
              <li>coordination</li>
              <li>throw/catch</li>
              <li>cross movements</li>
            </ul>
            <li><strong>In the air</strong></li>
            <ul>
              <li>swing</li>
              <li>hand and climb</li>
            </ul>
          </ul>`);
          $("#btnCloseMovementInfo").html("Close");
      break;
  }
  $("#movementsInfoSection").show();
}

/**
 * Changes the language of all fixed html elements to the newly selected language
 * @param {*} newLanguage, supports langSwedish and langEnglish;
 */
function changeLanguage(newLanguage) {
  choosenLanguage = parseInt(newLanguage);

  switch (choosenLanguage) {
    case langSwedish:
      $("#h1Title").html("Göteborgs Lekplatser<br>för Småbarn");
      $("#h2Search").html("Sök efter lekplatser");
      $("#btnSearch").html("Sök");
      $("#h2Results").html("Resultat");
      $("#btnCloseDetails").html("Tillbaka till sökresultatet");
      break;
    case langEnglish:
      $("#h1Title").html("Gothenburg Playgrounds<br>for Toddlers");
      $("#h2Search").html("Search for playgrounds");
      $("#btnSearch").html("Search");
      $("#h2Results").html("Search results");
      $("#btnCloseDetails").html("Back to search result");
      break;
  }

  //Update text for checkbox labels
  lblMovementGround.innerHTML = movementInformation[choosenLanguage].ground[0] + " " + movementInformation[choosenLanguage].ground[1];
  lblMovementFeet.innerHTML = movementInformation[choosenLanguage].feet[0] + " " + movementInformation[choosenLanguage].feet[1];
  lblMovementAir.innerHTML = movementInformation[choosenLanguage].air[0] + " " + movementInformation[choosenLanguage].air[1];

  //Fill selectCityArea selector with values
  {
    // Add all areas in playgrounds to areas array, only one instance per area
    let areas = [];
    for (let playground of playgrounds) {
      if (!areas.includes(playground.area[choosenLanguage])) {
        areas.push(playground.area[choosenLanguage]);
      }
    }
    areas.sort();

    //Add all city areas stored in areas array to select element
    //Basic code for adding option to select from W3 Schools, adapted to take multiple values from array
    $("#selectCityArea > option").remove(); //Remove all current options from selectCityArea, code adapted from solutions found at Stackoverflow.com
    let option = document.createElement("option");
    option.value = "any";
    if (choosenLanguage === langSwedish) {
      option.text = "Välj del av staden: Alla";
    } else if (choosenLanguage === langEnglish) {
      option.text = "Select area of city: Any";
    }
    document.getElementById("selectCityArea").add(option);
    for (let area of areas) {
      option = document.createElement("option");
      option.text = area;
      option.value = area;
      document.getElementById("selectCityArea").add(option);
    }
  }
  resetSearch(); //Calls a reset of search function and results
}

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
      } else if (document.getElementById("selectCityArea").value === playground.area[choosenLanguage]) {
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

  //Show search results
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

    //Scroll the window to see search results on smaller screens. Code from W3Schools adapted to current needs
    var x = window.matchMedia("(max-width: 767px)"); // Create a MediaQueryList object to work on smaller than medium screens,
    if (x.matches) { // If media query matches
      window.scrollTo(0, 450); //Scroll the window to a position to sufficiently see search results
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
  $("#movementsInfoSection").hide(); //Hide movements info, not to be shown before a question mark has been blicked

  $("#searchSection").show(); //Show search section, in case it has been hidden by movementsInfoSection
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
  $("#h2Details").html(playground.name);
  let htmlText = "";
  if (playground.image !== "") {
    htmlText += `<img src="assets/images/${playground.image}" alt="image of a playground" width="100%"><br>`;
  }
  htmlText += `<p>${playground.adress} <em>- ${playground.area[choosenLanguage]}</em></p><p>${playground.description[choosenLanguage]}</p>`;

  if (choosenLanguage === langSwedish) {
    htmlText += `Lämpliga rörelseövningar: `;
  } else {
    htmlText += `Suitable movement excersice: `;
  }

  let previousMovement = false;
  if (playground.movements.includes("ground")) {
    htmlText += `${movementInformation[choosenLanguage].ground[0]} ${movementInformation[choosenLanguage].ground[1]}`;
    previousMovement = true;
  }

  if (playground.movements.includes("feet")) {
    if (previousMovement === true) {
      htmlText += `${movementInformation[choosenLanguage].feet[0].toLowerCase()} ${movementInformation[choosenLanguage].feet[1]}`;
    } else {
      htmlText += `${movementInformation[choosenLanguage].feet[0]} ${movementInformation[choosenLanguage].feet[1]}`;
      previousMovement = true;
    }
  }

  if (playground.movements.includes("air")) {
    if (previousMovement === true) {
      htmlText += `${movementInformation[choosenLanguage].air[0].toLowerCase()} ${movementInformation[choosenLanguage].air[1]}`;
    } else {
      htmlText += `${movementInformation[choosenLanguage].air[0]} ${movementInformation[choosenLanguage].air[1]}`;
      previousMovement = true;
    }
  }

  $("#playgroundDetails").html(htmlText);

  if (playground.geoPosition !== 0) { //If positions exists
    //Set LeaftJet map to position
    ljMap.setView([playground.geoPosition[0], playground.geoPosition[1]]);

    //If LeafJet Marker already exists, remove it from map
    if (ljMarker !== null) {
      ljMap.removeLayer(ljMarker);
    }
    //Add new marker to map
    ljMarker = new L.Marker([playground.geoPosition[0], playground.geoPosition[1]]);
    ljMap.addLayer(ljMarker);
    //Credit: Code for storing markers in layers and global variables found on Stackoverflow.com, modified for desired functionality

    $("#map").show();
  } else { //Hide map div if no coordinates are entered
    $("#map").hide();
  }
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
  let htmlText = "";
  htmlText = `<strong>${playground.name}</strong> - ${playground.area[choosenLanguage]}<br>`;
  if (choosenLanguage === langSwedish) {
    newDiv.innerHTML += `Lämpliga rörelseövningar: `
  } else {
    htmlText += `Suitable movement excersice: `;
  }

  let previousMovement = false; //Used to get correct commas and capital letters

  if (playground.movements.includes("ground")) {
    if (document.getElementById("chkMovementGround").checked === true) {
      htmlText += `<mark>${movementInformation[choosenLanguage].ground[0]}</mark>`;
    } else {
      htmlText += movementInformation[choosenLanguage].ground[0];
    }
    previousMovement = true;
  }

  if (playground.movements.includes("feet")) {
    if (document.getElementById("chkMovementFeet").checked === true) {
      if (previousMovement === false) {
        htmlText += `<mark>${movementInformation[choosenLanguage].feet[0]}</mark>`;
        previousMovement = true;
      } else {
        htmlText += `, <mark>${movementInformation[choosenLanguage].feet[0].toLowerCase()}</mark>`;
      }
    } else {
      if (previousMovement === false) {
        htmlText += movementInformation[choosenLanguage].feet[0];
        previousMovement = true;
      } else {
        htmlText += `, ${movementInformation[choosenLanguage].feet[0].toLowerCase()}`;
      }
    }
  }

  if (playground.movements.includes("air")) {
    if (document.getElementById("chkMovementAir").checked === true) {
      if (previousMovement === false) {
        htmlText += `<mark>${movementInformation[choosenLanguage].air[0]}</mark>`;
      } else {
        htmlText += `, <mark>${movementInformation[choosenLanguage].air[0].toLowerCase()}</mark>`;
      }
    } else {
      if (previousMovement === false) {
        htmlText += movementInformation[choosenLanguage].air[0];
      } else {
        htmlText += `, ${movementInformation[choosenLanguage].air[0].toLowerCase()}`;
      }
    }
  }
  htmlText += `</p>`
  newDiv.innerHTML = htmlText;
  return newDiv;
}
