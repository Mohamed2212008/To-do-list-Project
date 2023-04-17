let input = document.querySelector(".input");
let btn = document.querySelector(".add");
let ul = document.querySelector(".tasks");
let li = document.querySelector("li");
let clr = document.querySelector(".clear");
let doneList = document.querySelector(".doneTasks");
let tasksArray = [];
let i = 0;

if (window.localStorage.getItem("tasks")) {
    tasksArray = JSON.parse(window.localStorage.getItem("tasks"));
    addToLocalStorage(tasksArray);
}

btn.onclick = function () {
    if (input.value == "") {
        window.alert("You didn't enter the task");
    } else {
        addTasks(input.value);
    }
    input.value = "";
}

function addTasks(value) {
    let task = {
        id: i,
        content: value,
        done: false,
    };
    tasksArray.push(task);
    addToLocalStorage(tasksArray);
    i++;
}

function addToLocalStorage(tasksArray) {
    window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
    addTasksToPage(tasksArray);
    addToDoneList(tasksArray);
}

function addTasksToPage(tasksArray) {
    ul.innerHTML = "";
    tasksArray.forEach((e) => {
        let li = document.createElement("li");
        let content = document.createTextNode(e.content);
        let del = document.createElement("button");
        let deContent = document.createTextNode("Delete");
        let done = document.createElement("button");
        let doneContent = document.createTextNode("done")
        let btnDiv = document.createElement("div");
        del.appendChild(deContent);
        del.classList.add("delete");
        done.appendChild(doneContent);
        done.classList.add("done");
        btnDiv.appendChild(done);
        btnDiv.appendChild(del);
        btnDiv.classList.add("buttons");
        li.appendChild(content);
        li.classList.add("task");
        li.setAttribute("data-content", e.content);
        li.setAttribute("data-id", e.id);
        li.appendChild(btnDiv);
        ul.appendChild(li);
    });
}

function addToDoneList(tasksArray) {
    doneList.innerHTML = "";
    tasksArray.forEach((e) => {
        if (e.done) {
            let li = document.createElement("li");
            let content = document.createTextNode(e.content);
            li.appendChild(content);
            doneList.appendChild(li);
        }
    })
}

ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        delTask(e.target.parentElement.parentElement.getAttribute("data-id"))
    } else if (e.target.classList.contains("done")) {
        doneTask(e.target.parentElement.parentElement);
        addDoneTaskToLocalStorage(e.target.parentElement.parentElement.getAttribute("data-content"));
    }
});

function delTask(parent) {
    tasksArray = tasksArray.filter((e) => e.id != parent);
    addToLocalStorage(tasksArray);
}

function doneTask(parent) {
    parent.classList.toggle("done");
}

function addDoneTaskToLocalStorage(content) {
    tasksArray.forEach((e) => {
        if (e.done) {
            if (content == e.content) {
                e.done = false;
            }
        } else {
            if (content == e.content) {
                e.done = true;
            }
        }
    })
    addToLocalStorage(tasksArray);
}

clr.onclick = function () {
    tasksArray = [];
    addToLocalStorage(tasksArray);
}