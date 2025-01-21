var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
// var ul = document.querySelector("ul");
var ul = document.getElementById("lists");
var taskFilter = document.getElementById("taskFilter");

function inputLength() {
  return input.value.trim().length; // Trim whitespace
}
// Create List Element Function
function createListElement(task, isSave) {
  var li = document.createElement("li");
  if (isSave) {
    saveTaskToLocalStorage(input.value);
  }
  li.appendChild(document.createTextNode(task));
  ul.appendChild(li);
  input.value = "";

  // Delete List Item Button icon
  var trashIcon = document.createElement("i");
  trashIcon.classList.add("fa-solid", "fa-trash", "icon");
  // Start Delete List Item Button
  var dBtn = document.createElement("button");
  dBtn.classList.add("btn-1");
  dBtn.appendChild(trashIcon);
  li.appendChild(dBtn);
  dBtn.addEventListener("click", deleteListItem);

  function deleteListItem() {
    document.getElementById("customModal").style.display = "block";
    document.getElementById("confirmDelete").onclick = function () {
      ul.removeChild(li);
      removeTaskFromLocalStorage(task);
      document.getElementById("customModal").style.display = "none";
    };
    document.getElementById("cancelDelete").onclick = function () {
      document.getElementById("customModal").style.display = "none";
    };
  }

  // Start Inprogress/Complete Button
  var button = document.createElement("button");
  button.appendChild(document.createTextNode("Inprogress"));
  button.classList.add("btn");
  li.appendChild(button);
  button.addEventListener("click", complete);

  function complete() {
    li.classList.toggle("done");
    button.classList.toggle("color");
    filterTasks();

    if (button.classList.contains("color")) {
      button.textContent = "Complete"; // Change text to "Complete" when green
    } else {
      button.textContent = "Inprogress"; // Change text to "Inprogress" when yellow
    }
  }
  // End Inprogress/Complete Button
}

function saveTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createListElement(task, false);
    
  });
}

//* Filter Function Start
function filterTasks() {
  var selectedValue = taskFilter.value;
  var tasks = ul.getElementsByTagName("li");

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    if (selectedValue === "all") {
      task.style.display = "block"; // Show all tasks
    } else if (
      selectedValue === "completed" &&
      task.classList.contains("done")
    ) {
      task.style.display = "block"; // Show completed tasks
    } else if (
      selectedValue === "inprogress" &&
      !task.classList.contains("done")
    ) {
      task.style.display = "block"; // Show in-progress tasks
    } else {
      task.style.display = "none";
    }
  }
}
taskFilter.addEventListener("change", filterTasks);
//* Filter Function End

function addListAfterClick() {
  if (inputLength() > 0) {
    createListElement(input.value, true);
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.key === "Enter") {
    createListElement(input.value, true);
  }
}

//* Load tasks when the page is loaded
window.onload = loadTasksFromLocalStorage;

enterButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);