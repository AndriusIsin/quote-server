// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
const lodash = require("lodash");
var cors = require("cors");

//load the quotes JSON
const quotes = require("./quotes.json");
app.use(cors());
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)

app.get("/", function (request, response) {
  response.send(
    "Andrius's Quote Server!  Ask me for /quotes/random, or /quotes"
  );
});

//START OF YOUR CODE...
app.get("/quotes", function (request, response) {
  response.send({ quotes });
});
app.get("/quotes/random", function (request, response) {
  response.send(lodash.sample(quotes));
});
app.get("/quotes/search", function (request, response) {
  const searchValue = request.query.term;
  response.send(
    quotes.filter((oneQuote) =>
      oneQuote.quote.toLowerCase().includes(searchValue.toLowerCase())
    )
  );
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
