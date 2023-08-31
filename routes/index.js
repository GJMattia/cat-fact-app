var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CatFact.net' });
});

//Defines route where the info is being pulled from
const FACT = 'https://catfact.ninja/fact'




router.get('/cats/fact', function (req, res) {
  //fetches info from url
  fetch(FACT)
  //reads response body and parses it as a json (javascript object notation)
  //(which divides the info up into catagories defined by an object)
    .then(res => res.json())
    //only wanted the fact, sends just the fact into a variable for me to use in my ejs file
    .then(data => {
      const catFact = data.fact;
      //renders page with my new variable catFact, which holds the text info for the fact
      res.render('cat/fact', { catFact: catFact }); // sends my variables to the ejs file for me to embed
    });
});

const TEN_FACTS = 'https://catfact.ninja/facts'

router.get('/cats/factsx10', function (req, res) {
  fetch(TEN_FACTS)
    .then(res => res.json())
    .then(response => {

      //takes the array on the after parsing it to json, creates a new array using .map of only the text, leaves out length
      //stores that fetched and modified data into this variable
      const factsArray = response.data.map(fact => fact.fact);
      
    //renders the tenfacts ejs file and pushes this variable to be available for use in it for the squids
      res.render('cat/tenfacts', { factsArray: factsArray });
    })
});









module.exports = router;
