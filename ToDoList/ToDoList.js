document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.querySelector(".add-button");
    var newTaskInputText = document.querySelector(".new-task");
    var bodyTable = document.querySelector(".tasks-list-table tbody");
    var storageTokens = localStorage.getItem("tokens");
    var tokens = [];

    if (storageTokens !== null && storageTokens != "") {
        tokens = storageTokens.split(", ");
        initTasks();
    }

    addButton.addEventListener("click", function () {
        addTaskHandler();
    });

    document.querySelector("form").addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

    //Добавление задачи при нажатии на Enter
    document.querySelector("input").addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            addTaskHandler();
        }
    });

    function addTaskHandler() {
        var newTask = newTaskInputText.value;

        if (!checkTaskIsValid(newTask.trim())) {
            return;
        }

        var newTaskRow = document.createElement("tr");

        addTask(newTask, newTaskRow);
        newTaskInputText.value = "";
        bodyTable.appendChild(newTaskRow);

        var newToken = randomToken();

        newTaskRow.setAttribute("token", newToken);
        localStorage.setItem(newToken, newTask);

        tokens.push(newToken);
        localStorage.tokens = tokens.join(", ");
    }

    function checkTaskIsValid(task) {
        if (task === "" || task === null) {
            alert("Нужно ввести задачу.");
            return false;
        }

        return true;
    }

    function addTask(task, taskRow) {
        taskRow.innerHTML = "<td class='new-task'></td>" +
            "<td><button type='button' class='edit-button'>Редактировать</button>" +
            "<button type = 'button' class='delete-button'>Удалить</button ></td> ";

        taskRow.querySelector(".new-task").textContent = task;

        taskRow.querySelector(".edit-button").addEventListener("click", function () {
            editTask(task, taskRow);
        });

        taskRow.querySelector(".delete-button").addEventListener("click", function () {
            taskRow.remove();

            var token = taskRow.getAttribute("token")
            delete localStorage[token];

            var index = tokens.indexOf(token);
            tokens.splice(index, 1);
            localStorage.tokens = tokens.join(", ");
        });
    }

    function editTask(task, taskRow) {
        taskRow.innerHTML = "<td class='edit-task'><input type='text>'></td>" +
            "<td><button type='button' class='save-button'>Сохранить</button>" +
            "<button type = 'button' class='cancel-button'>Отмена</button ></td> ";

        taskRow.querySelector(".edit-task input").value = task;

        taskRow.querySelector(".save-button").addEventListener("click", function () {
            var editTask = taskRow.querySelector(".edit-task input").value;

            if (checkTaskIsValid(editTask.trim())) {
                addTask(editTask, taskRow);
                localStorage[taskRow.getAttribute("token")] = editTask;
            }
        });

        taskRow.querySelector(".cancel-button").addEventListener("click", function () {
            addTask(task, taskRow);
        });
    }

    function initTasks() {
        tokens.forEach(token => {
            var newTaskRow = document.createElement("tr");
            var task = localStorage.getItem(token);

            newTaskRow.setAttribute("token", token);

            addTask(task, newTaskRow);

            bodyTable.appendChild(newTaskRow);
        })
    }

    function randomToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
})