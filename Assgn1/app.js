var addTodo = document.querySelector("#add-todo");
var todoName = document.querySelector("#todo-name");


// Click "ADD" to submit 
addTodo.onclick = function () {
    if (todoName.value === "" ) {
        alert("Must have a todo entered!");
    } else {
    var todoList = document.querySelector("#todo-list");
    var newListItem = document.createElement("li");
    newListItem.innerHTML = todoName.value;
    todoList.appendChild(newListItem);

    var button = document.createElement("button");
    button.onclick = remove;
    button.id = "removebtn";
    button.innerHTML = "Remove";
    newListItem.appendChild(button);

    todoName.value='';
    }
};

function remove(e) {
    var el = e.target;
    el.parentNode.remove();
}

// Enter to submit 
todoName.addEventListener("keypress", function(event) {
	if (event.keyCode === 13) {
		if (todoName.value === "") {
			alert("Must have a todo entered!");
		} else {
        		var todoList = document.querySelector("#todo-list");
        		var newListItem = document.createElement("li");
        		newListItem.innerHTML = todoName.value;
        		todoList.appendChild(newListItem);
        		todoName.value='';

			var button = document.createElement("button");
			button.onclick = remove;
			button.id = "removebtn";
			button.innerHTML = "Remove";
			newListItem.appendChild(button);
		}
	}
});


fetch("https://api.myjson.com/bins/1gbmos").then(function (response) {
    response.json().then(function (data) {
        console.log("data loaded from server", data);
        var suggestion = document.querySelector("#suggest-todo");
        suggestion.onclick = function () {
            var todoList = document.querySelector("#todo-list");
            var random = Math.floor(Math.random() * data.length); 
            var newListItem = document.createElement("li");
            newListItem.innerHTML = data[random];
            todoList.appendChild(newListItem);

            var button = document.createElement("button");
            button.onclick = remove;
            button.id = "removebtn";
	    button.innerHTML = "Remove";
	    newListItem.appendChild(button);
        };
    });
});



var removeTodo = document.querySelector("#remove-todo");

removeTodo.onclick = function() {
    var todoList = document.querySelector("#todo-list");
    var item = document.querySelector("li");
    console.log(item)
    todoList.removeChild(item);
}

