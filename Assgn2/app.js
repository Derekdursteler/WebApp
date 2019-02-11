var suggestions = null;
var namevalue = document.querySelector( "#name" );
var button = document.querySelector( "#button1" );

var addItem = function( ) {
    var value = document.querySelector( "#name" ).value;
    var data = "name=" + encodeURIComponent( value );
    fetch( "http://localhost:8080/bucket", {
        method: 'POST',
        body: data,
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    }).then( function ( response ) {
        getSuggestions( );
    });
    namevalue.innerHTML = "";
}
// enter to add item
namevalue.addEventListener("keypress", function(event) {
    if ( event.keyCode === 13 ) {
        if (namevalue.value === "") {
			alert("Must have a bucket-list item entered!");
		} else {
            addItem( );
        }
    }
})
// onlick to add item
button.onclick = function( ) {
   addItem( );
};

var getSuggestions = function( ) {
    fetch( "http://localhost:8080/bucket" ).then( function ( response ) {
        response.json( ).then( function ( data ) {
            // save data into global variable so we can use later if we need too
            suggestions = data;

            // data is an array of string values
            var places = document.querySelector( "#places" );
            // reset innerHTML so we don't add onto each other in loop
            places.innerHTML = "";

            data.forEach( function ( suggestion ) {
                var newListItem = document.createElement( "li" );
                newListItem.innerHTML = suggestion;
                newListItem.className = "suggestion";
                places.appendChild( newListItem );
            });
        });
    });
};
getSuggestions( );