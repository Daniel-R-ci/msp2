/* File containing all information about playgrounds */

/* Copy the following lines into the array playgrounds when adding new playground
{
  "name": "", //Required value
  "area": "", //Required value
  "movements": ["ground", "feet", "air"], //Required array, must contain at least one item
  "description": "",
  "geoX": "",
  "geoY": "",
  "adress": "", //Required value
  "image": "",
},
  */

const playgrounds = [
  {
    "name": "Test park 1", //Required value
    "area": "Hisingen",
    "movements": ["ground", "feet", "air"], //Required array, must contain at least one item
    "description": "A nice medium sized park with various equipment to keep play challenging and fun.",
    "geoX": "",
    "geoY": "",
    "adress": "Hisingen street", //Required value
    "image": "",
  },
  {
    "name": "Test park 2", //Required value
    "area": "West", //Required value
    "movements": ["feet", "air"], //Required array, must contain at least one item
    "description": "A simple park but with good areas to run around (including elevation changes), swings and a challenging climbing wall suited for toddlers",
    "geoX": "",
    "geoY": "",
    "adress": "Ruddalen entrance", //Required value
    "image": "",
  },
  {
    "name": "Test park 3", //Required value
    "area": "Hisingen",
    "movements": ["ground", "feet"], //Required array, must contain at least one item
    "description": "An old but well maintained park. All gates face away from the harbour, to prevent kids escaping from falling into the water.",
    "geoX": "",
    "geoY": "",
    "adress": "Eriksberg Harbour", //Required value
    "image": "",
  },
];

module.exports = { playgrounds };