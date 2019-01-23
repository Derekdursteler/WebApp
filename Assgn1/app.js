var addTodo = document.querySelector("#add-todo");

addTodo.onclick = function () {
    var todoList = document.querySelector("#todo-list");
    var todoName = document.querySelector("#todo-name");
    var newListItem = document.createElement("li");
    newListItem.innerHTML = todoName.value;
    todoList.appendChild(newListItem);
};

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

