var journal = null;
var submitButton = document.querySelector("#submit");

var addItem = function() {
    var titleInput = document.querySelector("#title");
    var contentsInput = document.querySelector("#content");
    var dateInput = document.querySelector("#date");
    var weatherInput = document.querySelector("#weather");
    var locationInput = document.querySelector("#location");

    var title = titleInput.value;
    var contents = contentsInput.value;
    var date = dateInput.value;
    var weather = weatherInput.value;
    var location = locationInput.value;

    console.log(title, contents, date, weather, location);
    var data = "title=" + encodeURIComponent(title);
    data += "&contents=" + encodeURIComponent(contents);
    data += "&date=" + encodeURIComponent(date);
    data += "&weather=" + encodeURIComponent(weather);
    data += "&location=" + encodeURIComponent(location);
    fetch("http://localhost:8080/journal", {
        method: 'POST',
        body: data,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        console.log("journal entry saved");
        getJournalEntries();
    });
}

var getJournalEntries = function() {
    fetch("http://localhost:8080/journal").then(function(response) {
        response.json().then(function(data) {
            journal = data;
            console.log(journal);
            var journalList = document.querySelector("#journallist");
            journalList.innerHTML = "";
            data.forEach(function(journal) {
                var newListItem = document.createElement("li");
                console.log(journal, "journal"); 
                newListItem.innerHTML = 
                  "Title: " + journal.title
                + "<br>Contents: " + journal.contents
                + "<br>Date: " + journal.date
                + "<br>Weather: " + journal.weather
                + "<br>Location: " + journal.location;
                newListItem.className = "entry";
                journalList.appendChild(newListItem);
            })
        })
    })
}

// OnClick to add item
submitButton.onclick = function() {
    console.log("submit button clicked!");
    addItem();
}

// make it so enter submit item
/* title.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        if (title.value === "") {
            alert("Must have all fields entered!");
        } else {
            addItem();
            title.value = "";
        }
    }
}) */

getJournalEntries();