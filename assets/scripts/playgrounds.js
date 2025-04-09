/* File containing all information about playgrounds */

/* Copy the following lines into the array playgrounds when adding new playground
{
  "name": "", //Required value
  "area": "", //Required value
  "movements": ["ground", "feet", "air"], //Required array, must contain at least one item
  "description": "",
  "geoPosition": 0, //Required, should be 0 for not used, otherwise in the form [north/south, east/west], example: [57.697964, 11.90179]
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
    "geoPosition": [57.697964, 11.90179],
    "adress": "Hisingen street", //Required value
    "image": "sample-playground-1.png",
  },
  {
    "name": "Test park 2", //Required value
    "area": "West", //Required value
    "movements": ["feet", "air"], //Required array, must contain at least one item
    "description": "A simple park but with good areas to run around (including elevation changes), swings and a challenging climbing wall suited for toddlers",
    "geoPosition": 0,
    "adress": "Ruddalen entrance", //Required value
    "image": "sample-playground-2.png",
  },
  {
    "name": "Test park 3", //Required value
    "area": "Hisingen",
    "movements": ["ground", "feet"], //Required array, must contain at least one item
    "description": "An old but well maintained park. All gates face away from the harbour, to prevent kids escaping from falling into the water.",
    "geoPosition": [57.697076, 11.90859],
    "adress": "Eriksberg Harbour", //Required value
    "image": "sample-playground-3.png",
  },
];

module.exports = { playgrounds };