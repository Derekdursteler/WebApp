var lunchPlaces = null;

// let's make an event
var theButton = document.querySelector("#the-button");
console.log("the button is", theButton);
theButton.onclick = function () {
  var value = "Applebees";
  var data = "name=" + encodeURIComponent(value);
  fetch("http://localhost:8080/restaurants", {
    method: 'POST',
    body: data,
    headers: {
      "Content-type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    console.log("restaurant saved.");
    getRestaurants();
  });
};

var getRestaurants = function() {
fetch("http://localhost:8080/restaurants").then(function (response) {
  response.json().then(function (data) {
    // save all of the data into a global variable (to use later)
    lunchPlaces = data;

    // data is an array of string values
    var suggestionsList = document.querySelector("#suggestions");
    suggestionsList.innerHTML = "";
    // add the restaurants to the suggestions list
    data.forEach(function (restaurant) { // for restaurant in data
      var newItem = document.createElement("li");
      newItem.innerHTML = restaurant;
      newItem.className = "restaurant";
      suggestionsList.appendChild(newItem);
     });
   });
 });
};
getRestaurants();

