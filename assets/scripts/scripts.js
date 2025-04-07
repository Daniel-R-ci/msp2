

/** Functions to execute when document is fully loaded and DOM is in place */
$(document).ready(function () {

  //HTML elements to be altered  
  {
    $("#results").hide(); // Hide search results section, not to be shown before a search has been made
    $("#details").hide(); // Hide playground details, not to be shown before a search hit has been clicked
  }

  //Fill selectCityArea selector with values
  {
    let areas = [];
    for (let playground of playgrounds) {
      if (!areas.includes(playground.area)) {
        areas.push(playground.area)
      }
    }
    areas.sort();
    for (let area of areas) { //Basic code for adding option to select from W3 Schools, modified
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
    $("#btnReset").click(function () {
      resetSearch();
    })
  }

}); //end $(document).ready(function ()

/**
 * Search through playgrounds array and create list of playgrounds matching search criteria
 */
function searchPlaygrounds() {
  $("#results").show();
  $("#details").show();
}

/**
 * Reset search form and hide result and details sections
 */
function resetSearch() {
  $("#results").hide(); // Hide search results section, not to be shown before a search has been made
  $("#details").hide(); // Hide playground details, not to be shown before a search hit has been clicked
}

