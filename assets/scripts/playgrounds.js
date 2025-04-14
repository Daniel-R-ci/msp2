/* File containing all information about playgrounds and information about movement groups in implemented languages*/

//Array for translation of movement groups
const movementInformation = [
{ //Text in Swedish
  "ground": ["På marken" , "(rulla, åla mm.)"],
  "feet":  ["På fötterna" , "(balans, kasta/fånga mm.)"],
  "air":  ["I luften" , "(gunga, hänga, klättra)"],
},
{ //Text i English
  "ground": ["Ground work" , "(rolling, crawl, etc)"],
  "feet":  ["On your feet" , "(balance, throw/catch etc)"],
  "air":  ["In the air" , "(swing, hang and climb)"],
}];

/* Copy the following lines into the array playgrounds when adding new playground
{
  "name": "", //Required value
  "area": ["", ""], //Required value, Swedish name first, English name second (even if English name is the same as in Swedish)
  "movements": ["ground", "feet", "air"], //Required array, must contain at least one item. Only use English
  "description": ["", ""], //Description, first in Swedish and then English, not required
  "geoPosition": 0, //Required, should be 0 for not used, otherwise in the form [north/south, east/west], example: [57.697964, 11.90179]
  "adress": "", //Required value
  "image": "", // Used to store name/url to picture of playground
},
  */

const playgrounds = [
  {
    "name": "Test park 1", //Required value
    "area": ["Hisingen", "Hisingen"], //Required value, [Swedish name first], [English name second] (even if English name is the same as in Swedish)
    "movements": ["ground", "feet", "air"], //Required array, must contain at least one item. Only use English
    "description": ["An trevlig mellanstor park med varierande utrustning för att hålla leken utmanande och rolig.", "A nice medium sized park with various equipment to keep play challenging and fun."], //Description, first in Swedish and then English, not required
    "geoPosition": [57.697964, 11.90179],
    "adress": "Hisingen street", //Required value
    "image": "sample-playground-1.png",
  },
  {
    "name": "Test park 2", //Required value
    "area": ["Väst", "West"], //Required value, [Swedish name first], [English name second] (even if English name is the same as in Swedish)
    "movements": ["feet", "air"], //Required array, must contain at least one item. Only use English
    "description": ["En enkel lekplats men med bra ytor för att springa omring (inklusive höjdskillnader), gungor och en utmanande klättervägg lämplig för småbarn.", "A simple park but with good areas to run around (including elevation changes), swings and a challenging climbing wall suited for toddlers"], //Description, first in Swedish and then English, not required
    "geoPosition": [57.662908, 11.910875],
    "adress": "Ruddalen entrance", //Required value
    "image": "sample-playground-2.png",
  },
  {
    "name": "Test park 3", //Required value
    "area": ["Hisingen", "Hisingen"], //Required value, [Swedish name first], [English name second] (even if English name is the same as in Swedish)
    "movements": ["ground", "feet"], //Required array, must contain at least one item. Only use English
    "description": ["En äldre men välunderhållen lekplats. Alla grindar är vända bort från hamnen, för att hindra rymmande barn från att falla i hamnbassängen", "An old but well maintained park. All gates face away from the harbour, to prevent kids escaping from falling into the water."], //Description, first in Swedish and then English, not required
    "geoPosition": [57.697076, 11.90859],
    "adress": "Eriksberg Harbour", //Required value
    "image": "sample-playground-3.png",
  },
  {
    "name": "Test park 4", //Required value
    "area": ["Centrum", "City Center"], //Required value, Swedish name first, English name second (even if English name is the same as in Swedish)
    "movements": ["feet"], //Required array, must contain at least one item. Only use English
    "description": ["Ingen traditionell lekplats, men en intressant hinderbana som utmanar de små.", "Not a traditional playground, but an interesting obstacle course to keep the little ones challanged."], //Description, first in Swedish and then English, not required
    "geoPosition": [57.705431, 11.974497], //Required, should be 0 for not used, otherwise in the form [north/south, east/west], example: [57.697964, 11.90179]
    "adress": "Trädgårdsföreningen", //Required value
    "image": "sample-playground-4.png", // Used to store name/url to picture of playground
  },
  {
    "name": "Test park 5", //Required value
    "area": ["Väst", "West"], //Required value, Swedish name first, English name second (even if English name is the same as in Swedish)
    "movements": ["air"], //Required array, must contain at least one item. Only use English
    "description": ["En lekplats helt fokuserad på gungor, både traditionella och mer ovanliga.", "A playground totally focused on swings, both traditional ones and a couple of more unsual ones."], //Description, first in Swedish and then English, not required
    "geoPosition": [57.655677, 11.926968], //Required, should be 0 for not used, otherwise in the form [north/south, east/west], example: [57.697964, 11.90179]
    "adress": "Rundradioparken", //Required value
    "image": "sample-playground-5.png", // Used to store name/url to picture of playground
  },
  {
    "name": "Test park 6", //Required value
    "area": ["Centrum", "City Center"], //Required value, Swedish name first, English name second (even if English name is the same as in Swedish)
    "movements": ["ground", "feet", "air"], //Required array, must contain at least one item. Only use English
    "description": ["Göteborgs största lekplats, här finns något för alla.", "Gothenburg largest playground, with something for everyone."], //Description, first in Swedish and then English, not required
    "geoPosition": [57.689619, 11.945958], //Required, should be 0 for not used, otherwise in the form [north/south, east/west], example: [57.697964, 11.90179]
    "adress": "Slottskogen", //Required value
    "image": "sample-playground-6.png", // Used to store name/url to picture of playground
  },
  {
    "name": "Test park 7", //Required value
    "area": ["Öster", "East"], //Required value, Swedish name first, English name second (even if English name is the same as in Swedish)
    "movements": ["feet", "air"], //Required array, must contain at least one item. Only use English
    "description": ["Spring, hoppa och klättra på denna nyinvigda lekplats.", "Run, jump and climb in this newly opened playground."], //Description, first in Swedish and then English, not required
    "geoPosition": [57.742465, 12.037325], //Required, should be 0 for not used, otherwise in the form [north/south, east/west], example: [57.697964, 11.90179]
    "adress": "Kvibergshöjden", //Required value
    "image": "sample-playground-7.png", // Used to store name/url to picture of playground
  },
];

// Export needed for testing with JEST but causes error when run on web server
// If statement to avoid running the module.exports method outside js.node enviroment
// Code supplied by mentor Spencer Barriball
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = { playgrounds };
}