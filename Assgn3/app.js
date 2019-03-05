var journal = null;
var submitButton = document.querySelector("#submit");

var createJournalEntry = function() {
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

var deleteJournal = function (id) {
    fetch(`http://localhost:8080/journal/${id}`, {
        method: 'DELETE'
    }).then(function(response) {
        console.log("journal deleted.")
        getJournalEntries();
    })
}

var editJournal = function(id, title, date, weather, location, contents) {
    // grab all the form info
    var titleInput = document.querySelector("#title");
    var contentsInput = document.querySelector("#content");
    var dateInput = document.querySelector("#date");
    var weatherInput = document.querySelector("#weather");
    var locationInput = document.querySelector("#location");
    var updateButton = document.querySelector("#submit")

    // update form info with journal with are editting
    titleInput.value = title;
    contentsInput.innerHTML = contents;
    dateInput.value = date;
    weatherInput.value = weather;
    locationInput.value = location;
    updateButton.innerHTML = "Update Entry"

    // when we click update entry send that to the server/database
    updateButton.onclick = function() {
        title = titleInput.value;
        contents = contentsInput.value;
        date = dateInput.value;
        weather = weatherInput.value;
        location = locationInput.value;

        console.log(title, contents, date, weather, location);
        var data = "title=" + encodeURIComponent(title);
        data += "&contents=" + encodeURIComponent(contents);
        data += "&date=" + encodeURIComponent(date);
        data += "&weather=" + encodeURIComponent(weather);
        data += "&location=" + encodeURIComponent(location);

        fetch(`http://localhost:8080/journal/${id}`, {
            method: 'PUT',
            body: data,
            headers: {
                "Content-type": "application-x-www-form-urlencoded"
            }
        }).then(function(response) {
            console.log("journal edited.")
            getJournalEntries();
        })
    }
}

var getJournalEntries = function() {
    fetch("http://localhost:8080/journal").then(function(response) {
        response.json().then(function(data) {
            journal = data;
            //console.log(journal);
            var journalList = document.querySelector("#journallist");
            journalList.innerHTML = "";
            data.forEach(function(journal) {
                var newListItem = document.createElement("li");
                //console.log(journal, "journal");
                var titleDiv = document.createElement("div");
                titleDiv.innerHTML = journal.title;
                titleDiv.className = "journal-title";
                newListItem.appendChild(titleDiv);

                var dateDiv = document.createElement("div");
                dateDiv.innerHTML = journal.date;
                dateDiv.className = "journal-date";
                newListItem.appendChild(dateDiv);

                var weatherDiv = document.createElement("div");
                weatherDiv.innerHTML = journal.weather;
                weatherDiv.className = "journal-weather";
                newListItem.appendChild(weatherDiv);

                var locationDiv = document.createElement("div");
                locationDiv.innerHTML = journal.location;
                locationDiv.className = "journal-location";
                newListItem.appendChild(locationDiv);

                var contentsDiv = document.createElement("div");
                contentsDiv.innerHTML = journal.contents;
                contentsDiv.className = "journal-contents";
                newListItem.appendChild(contentsDiv);

                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.className = "deleteButton";
                deleteButton.onclick = function() {
                    var proceed = confirm(`Do you want to delete ${journal.title}?`);
                    if (proceed) {
                        deleteJournal(journal.id);
                    }
                };
                newListItem.appendChild(deleteButton);

                var editButton = document.createElement("button");
                editButton.innerHTML = "Edit";
                editButton.className = "editButton";
                editButton.onclick = function() {
                    var proceed2 = confirm(`Do you want to edit ${journal.title}`);
                    if (proceed2) {
                        editJournal(journal.id, journal.title, journal.date, journal.weather, journal.location, journal.contents);
                    }
                };
                newListItem.appendChild(editButton);

                journalList.appendChild(newListItem);
            });
        });
    });
}

// OnClick to add item
submitButton.onclick = function() {
    // console.log("submit button clicked!");
    createJournalEntry();
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