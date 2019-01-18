// let's change the heading when the page loads
var heading = document.querySelector("h1");
console.log("the heading is", heading);
heading.innerHTML = "Why hello there!";

// let's make an event
var theButton = document.querySelector("#the-button");
console.log("the button is", theButton);
theButton.onclick = function () {
  // change the heading again when the button is clicked
  heading.innerHTML = "You clicked me!";
  heading.style.color = "#00FF00";
  heading.style.backgroundColor = "red";

  // add an item to the list when the button is clicked
  var theList = document.querySelector("#the-list");
  console.log("the list is", theList);
  var newItem = document.createElement("li");
  newItem.innerHTML = "This is a new list item.";
  theList.appendChild(newItem);
};
