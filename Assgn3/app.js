var journal = null;
var title = document.querySelector( "#title" );
var contents = document.querySelector( "#content" );
var date = document.querySelector( "#date" );
var weather = document.querySelector( "#weather" );
var place = document.querySelector( "#place" );
var submitbutton = document.querySelector( "#submit" );

var addItem = function() {
    var value = title.value;
    var data = "title=" + encodeURIComponent(value);
    fetch("http://localhost:8080/journal", {
        method: 'POST',
        body: data,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
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
                newListItem.innerHTML = "Title: " + journal["title"] + "<br>Contents: " + journal["contents"];
                newListItem.className = "entry";
                journalList.appendChild(newListItem);
            })
        })
    })
}

// OnClick to add item
submitbutton.onlick = function() {
    addItem();
    title.value = "";
}

// make it so enter submit item
title.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        if (title.value === "") {
            alert("Must have all fields entered!");
        } else {
            addItem();
            title.value = "";
        }
    }
})

getJournalEntries();