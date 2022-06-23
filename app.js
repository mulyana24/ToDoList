// Selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")
// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)
// functions
function addTodo(e){
    // prevent form form submitting
    e.preventDefault()
    // Todo Div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    // create Li
    const newTodo = document.createElement("li")
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item")

    todoDiv.appendChild(newTodo)

    // Add Todo to localStorage
    saveLocalTodos(todoInput.value)

    // Check Mark Button
    const checkButton = document.createElement("button")
    checkButton.innerHTML = '<i class="fas fa-check"></i>'
    checkButton.classList.add("complete-btn")

    todoDiv.appendChild(checkButton)

    // Check Trash Button
    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add("delete-btn")

    todoDiv.appendChild(deleteButton)

    // Append to List
    todoList.appendChild(todoDiv)

    // Clear Todo Input Value
    todoInput.value = ""
}

function deleteCheck(e) {
    // console.log(e.target)
    const item = e.target
    delete todo
    if(item.classList[0] === "delete-btn") {
        // item.remove()
        const todo = item.parentElement
        // animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", function () {
            todo.remove()
        })
    }

    // Check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }

}

function filterTodo(e) {
    [...todoList.children].forEach(function(todo) {
        switch (e.target.value) {
          case "all":
            todo.style.display = "flex";
            break;
          case "completed":
            if (todo.classList.contains("completed")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
            break;
          case "uncompleted":
            if (!todo.classList.contains("completed")) {
              todo.style.display = "flex";
            } else {
              todo.style.display = "none";
            }
        }
      });
  }

function saveLocalTodos(todo) {
  // Check -- hey
  let todos
  if (localStorage.getItem('todos')===null) {
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
  // console.log("Hello")
  // Check -- hey
  let todos;
  if (localStorage.getItem('todos')===null) {
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function(todo) {
    // Todo Div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    // create Li
    const newTodo = document.createElement("li")
    newTodo.innerText = todo
    newTodo.classList.add("todo-item")

    todoDiv.appendChild(newTodo)

    // // Add Todo to localStorage
    // saveLocalTodos(todoInput.value)

    // Check Mark Button
    const checkButton = document.createElement("button")
    checkButton.innerHTML = '<i class="fas fa-check"></i>'
    checkButton.classList.add("complete-btn")

    todoDiv.appendChild(checkButton)

    // Check Trash Button
    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add("delete-btn")

    todoDiv.appendChild(deleteButton)

    // Append to List
    todoList.appendChild(todoDiv)
  })
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos')===null) {
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  // console.log(todo.children[0].innerText)
  const todoIndex = todo.children[0].innerText
  // console.log(todos.indexOf('Jaja'))
  todos.splice(todos.indexOf(todoIndex), 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}