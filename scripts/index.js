var Todo = {
  general: {
    todo: [],
    in_progress: [],
    done: [],
    latestId: 0,
    editedTask: null,
  },
};

if (localStorage.getItem("todo") !== null) {
  Todo = JSON.parse(localStorage.getItem("todo"));
}

var trashIcon = `<svg class="w-[25px] h-auto stroke-icons-color-1 hover:stroke-rose-700 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24">
<path stroke="none" d="M0 0h24v24H0z"/>
<path d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>
</svg>`;

var editIcon = `<svg class="w-[25px] h-auto stroke-icons-color-1 hover:stroke-yellow-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24">
<path stroke="none" d="M0 0h24v24H0z"/>
<path d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4m9.5-13.5 4 4"/>
</svg>`;

document.addEventListener("DOMContentLoaded", function () {
  updateTodoUI();
});

function updateTodoUI() {
  for (let i = 0; i < Todo.general.todo.length; i++) {
    let todo = Todo.general.todo[i];
    document.getElementById("todo").innerHTML += itemListComponent(
      todo,
      "todo-tag",
      0,
      i
    );
  }

  for (let i = 0; i < Todo.general.in_progress.length; i++) {
    let todo = Todo.general.in_progress[i];
    document.getElementById("in_progress").innerHTML += itemListComponent(
      todo,
      "in-progress-tag",
      1,
      i
    );
  }

  for (let i = 0; i < Todo.general.done.length; i++) {
    let todo = Todo.general.done[i];
    document.getElementById("done").innerHTML += itemListComponent(
      todo,
      "done-tag",
      2,
      i
    );
  }

  var completedTasksCount = Todo.general.done.length;
  var totalTasksCount =
    Todo.general.todo.length +
    Todo.general.in_progress.length +
    Todo.general.done.length;

  if (completedTasksCount > 0)
    document.getElementById("completed-heading").style.display = "flex";
  else document.getElementById("completed-heading").style.display = "none";

  document.getElementById("completed-tasks-count").innerHTML =
    completedTasksCount;
  document.getElementById("total-tasks-count").innerHTML = totalTasksCount;
  document.getElementById("total-tasks-count-2").innerHTML = totalTasksCount;
}

function updateLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(Todo));
}

function resetTodoUI() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("done").innerHTML = "";
  document.getElementById("in_progress").innerHTML = "";
}

function editTask(taskType, taskIndex) {
  if (taskType === 0) {
    document.getElementById("task-input").value =
      Todo.general.todo[taskIndex].task;
    document.getElementById("tag-input").value =
      Todo.general.todo[taskIndex].tag;
  } else if (taskType === 1) {
    document.getElementById("task-input").value =
      Todo.general.in_progress[taskIndex].task;
    document.getElementById("tag-input").value =
      Todo.general.in_progress[taskIndex].tag;
  } else if (taskType === 2) {
    document.getElementById("task-input").value =
      Todo.general.done[taskIndex].task;
    document.getElementById("tag-input").value =
      Todo.general.done[taskIndex].tag;
  }

  Todo.general.editedTask = { type: taskType, index: taskIndex };

  showAddTaskModel();
  updateLocalStorage();
}

function deleteTask(taskType, taskIndex) {
  if (taskType === 0) {
    Todo.general.todo.splice(taskIndex, 1);
  } else if (taskType === 1) {
    Todo.general.in_progress.splice(taskIndex, 1);
  } else if (taskType === 2) {
    Todo.general.done.splice(taskIndex, 1);
  }

  resetTodoUI();
  updateTodoUI();
  updateLocalStorage();
}

function hideAddTaskModel() {
  document.getElementById("task-input").value = "";
  document.getElementById("tag-input").value = "";
  document.getElementById("add-task-model").style.top = "-150%";
}

function showAddTaskModel() {
  document.getElementById("add-task-model").style.top = "0px";
}

function addTask() {
  event.preventDefault();
  let task = document.getElementById("task-input").value;
  let tag = document.getElementById("tag-input").value;
  let status = document.querySelector('input[name="status"]:checked').value;

  if (!tag) tag = "";

  Todo.general.latestId++;

  if (status === "todo") {
    Todo.general.todo.push({
      id: Todo.general.latestId,
      task: task,
      tag: tag,
    });
  } else if (status === "in_progress") {
    Todo.general.in_progress.push({
      id: Todo.general.latestId,
      task: task,
      tag: tag,
    });
  } else if (status === "done") {
    Todo.general.done.push({
      id: Todo.general.latestId,
      task: task,
      tag: tag,
    });
  }

  if (Todo.general.editedTask) {
    if (Todo.general.editedTask.type === 0) {
      Todo.general.todo.splice(Todo.general.editedTask.index, 1);
    } else if (Todo.general.editedTask.type === 1) {
      Todo.general.in_progress.splice(Todo.general.editedTask.index, 1);
    } else if (Todo.general.editedTask.type === 2) {
      Todo.general.done.splice(Todo.general.editedTask.index, 1);
    }
  }
  hideAddTaskModel();
  resetTodoUI();
  updateTodoUI();
  updateLocalStorage();
}

function itemListComponent(todo, tagType, tagId, i) {
  var status = "";
  if (tagId === 0) {
    status = "todo";
  } else if (tagId === 1) {
    status = "in-progress";
  } else if (tagId === 2) {
    status = "done";
  }
  return `
  <li class="list-item ${status == "done" ? "checked-item" : ""}">
    <div>${todo.task}</div>
    <div class="tags-container">
      <div class="${tagType}">${status}</div>
      ${todo.tag ? `<div class="task-tag">${todo.tag}</div>` : ""}
    </div>
    <div class="icons-container">
      <span onclick="editTask(${tagId},${i})">${editIcon}</span>
      <span onclick="deleteTask(${tagId},${i})">${trashIcon}</span>
    </div>
</li>`;
}

function showResetModel() {
  document.getElementById("reset-model").style.top = "0px";
}

function hideResetModel() {
  document.getElementById("reset-model").style.top = "-150%";
}

function clearAll() {
  localStorage.setItem(
    "todo",
    JSON.stringify({
      general: {
        todo: [],
        in_progress: [],
        done: [],
        latestId: 0,
        editedTask: null,
      },
    })
  );
  Todo = JSON.parse(localStorage.getItem("todo"));
  resetTodoUI();
  updateTodoUI();
  hideResetModel();
}
