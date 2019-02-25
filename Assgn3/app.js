var entries = null;
var entryvalue = document.querySelector( "#entry" );
var button = document.querySelector( "#submit" );
// var deletebutton = document.querySelector( "#button2" );


var addItem = function( ) {
    var value = document.querySelector( "#entry" ).value;
    var data = "entry=" + encodeURIComponent( value );
    fetch( "http://localhost:8080/entries", {
        method: 'POST',
        body: data,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }).then( function ( response ) {
        getJournalEntries( );
    });
}
// enter to add item
entryvalue.addEventListener("keypress", function(event) {
    if ( event.keyCode === 13 ) {
        if (entryvalue.value === "") {
			alert("Must have journal text entered!");
		} else {
            addItem( );
            entryvalue.value = "";
        }
    }
})
// onlick to add item
button.onclick = function( ) {
   addItem( );
   entryvalue.value = "";
};

var getJournalEntries = function( ) {
    fetch( "http://localhost:8080/entries" ).then( function ( response ) {
        response.json( ).then( function ( data ) {
            // save data into global variable so we can use later if we need too
            entries = data;

            // data is an array of string values
            var places = document.querySelector( "#places" );
            // reset innerHTML so we don't add onto each other in loop
            places.innerHTML = "";

            data.forEach( function ( entries ) {
                var newListItem = document.createElement( "div" );
                newListItem.innerHTML = entries;
                newListItem.className = "entries";
                places.appendChild( newListItem );
            });
        });
    });
};
getJournalEntries( );
