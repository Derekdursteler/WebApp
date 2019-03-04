var lunchPlaces = null;

var createRestaurant = function (name, cuisine, hours, rating) {
  var data = "name=" + encodeURIComponent(name);
  data += "&cuisine=" + encodeURIComponent(cuisine);
  
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
}

var deleteRestaurant = function (id) {
  fetch(`http://localhost:8080/restaurants/${id}`, {
    method: 'DELETE'
  }).then(function(response) {
    console.log("restaurant deleted.")
    getRestaurants();
  });
};

var updateRestaurant = function(id) {
  fetch(`http://localhost:8080/restaurants/${id}`, {
    method: 'PUT',
    body: data,
    headers: {

    }
  }).then(function(response) {
    console.log('Message updated')
    getRestaurants();
  })
};

// let's make an event
var theButton = document.querySelector("#the-button");
console.log("the button is", theButton);
theButton.onclick = function () {
  var nameInput = document.querySelector("#name");
  var cuisineInput = document.querySelector("#cuisine");

  var name = nameInput.value;
  var cuisine = cuisineInput.value;
  
  createRestaurant(name, cuisine);
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

      var nameDiv = document.createElement("div");
      nameDiv.innerHTML = restaurant.name;
      nameDiv.className = "restaurant-name";
      newItem.appendChild(nameDiv);

      var hoursDiv = document.createElement("div");
      if (restaurant.hours) {
        hoursDiv.innerHTML = `Hours: ${restaurant.hours}`;
      } else {
        hoursDiv.innerHTML = "No hours available";
      }      
      hoursDiv.className = "restaurant-hours";
      newItem.appendChild(hoursDiv);

      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = function() {
        // javascript closure
        // 
        var proceed = confirm(`Do you want to delete ${restaurant.name}?`);
        if (proceed) {
          deleteRestaurant(restaurant.id);
        }
      };
      newItem.appendChild(deleteButton);

      suggestionsList.appendChild(newItem);
     });
   });
 });
};
getRestaurants();

