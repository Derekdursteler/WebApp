var journals = null;
var submitButton = document.querySelector("#submit");

var createjournalsEntry = function() {
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
    fetch("http://localhost:8080/journals", {
        method: 'POST',
        body: data,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        console.log("journals entry saved");
        getjournalsEntries();
        clearForm();
    });
}

var deletejournals = function (id) {
    fetch(`http://localhost:8080/journals/${id}`, {
        method: 'DELETE'
    }).then(function(response) {
        console.log("journals deleted.")
        getjournalsEntries();
    })
}

var clearForm = function() {
    var titleInput = document.querySelector("#title");
    var contentsInput = document.querySelector("#content");
    var dateInput = document.querySelector("#date");
    var weatherInput = document.querySelector("#weather");
    var locationInput = document.querySelector("#location");
    var submitButton = document.querySelector("#submit");

    titleInput.value = "";
    contentsInput.value = "";
    dateInput.value = "";
    weatherInput.value = "";
    locationInput.value = "";
    submitButton.innerHTML = "Submit"
}

var editjournals = function(id, title, date, weather, location, contents) {
    // grab all the form info
    var titleInput = document.querySelector("#title");
    var contentsInput = document.querySelector("#content");
    var dateInput = document.querySelector("#date");
    var weatherInput = document.querySelector("#weather");
    var locationInput = document.querySelector("#location");
    var updateButton = document.querySelector("#submit")

    // update form info with journals with are editting
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

        fetch(`http://localhost:8080/journals/${id}`, {
            method: 'PUT',
            body: data,
            headers: {
                "Content-type": "application-x-www-form-urlencoded"
            }
        }).then(function(response) {
            console.log("journals edited.")
            getjournalsEntries();
            clearForm();
        });
    };
}

var getjournalsEntries = function() {
    fetch("http://localhost:8080/journals").then(function(response) {
        response.json().then(function(data) {
            journals = data;
            //console.log(journals);
            var journalsList = document.querySelector("#journalslist");
            journalsList.innerHTML = "";
            data.forEach(function(journals) {
                var newListItem = document.createElement("li");
                //console.log(journals, "journals");
                var titleDiv = document.createElement("div");
                titleDiv.innerHTML = journals.title;
                titleDiv.className = "journals-title";
                newListItem.appendChild(titleDiv);

                var dateDiv = document.createElement("div");
                dateDiv.innerHTML = journals.date;
                dateDiv.className = "journals-date";
                newListItem.appendChild(dateDiv);

                var weatherDiv = document.createElement("div");
                weatherDiv.innerHTML = journals.weather;
                weatherDiv.className = "journals-weather";
                newListItem.appendChild(weatherDiv);

                var locationDiv = document.createElement("div");
                locationDiv.innerHTML = journals.location;
                locationDiv.className = "journals-location";
                newListItem.appendChild(locationDiv);

                var contentsDiv = document.createElement("div");
                contentsDiv.innerHTML = journals.contents;
                contentsDiv.className = "journals-contents";
                newListItem.appendChild(contentsDiv);

                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.className = "deleteButton";
                deleteButton.onclick = function() {
                    var proceed = confirm(`Do you want to delete ${journals.title}?`);
                    if (proceed) {
                        deletejournals(journals.id);
                    }
                };
                newListItem.appendChild(deleteButton);

                var editButton = document.createElement("button");
                editButton.innerHTML = "Edit";
                editButton.className = "editButton";
                editButton.onclick = function() {
                    var proceed2 = confirm(`Do you want to edit ${journals.title}?`);
                    if (proceed2) {
                        editjournals(journals.id, journals.title, journals.date, journals.weather, journals.location, journals.contents);
                    }
                };
                newListItem.appendChild(editButton);

                journalsList.appendChild(newListItem);

                submitButton.onclick = function() {
                    // console.log("submit button clicked!");
                    createjournalsEntry();
                }                
            });
        });
    });
}

// OnClick to add item
submitButton.onclick = function() {
    // console.log("submit button clicked!");
    createjournalsEntry();
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

getjournalsEntries();