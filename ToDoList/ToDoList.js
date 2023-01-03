document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.querySelector(".add-button");
    var newTaskInputText = document.querySelector(".new-task");
    var tableBody = document.querySelector(".tasks-list-table tbody");

    var tasks = [];
    var storageTasks = localStorage.getItem("tasks");

    if (storageTasks !== null && storageTasks !== "") {
        tasks = JSON.parse(storageTasks);
        initTasks();
    }

    addButton.addEventListener("click", function () {
        addTask();
    });

    document.querySelector(".form-add-tasks").addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

    //Добавление задачи при нажатии на Enter
    document.querySelector(".new-task").addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            addTask();
        }
    });

    function addTask() {
        var newTask = newTaskInputText.value;

        if (newTask === null || !checkTaskIsValid(newTask.trim())) {
            return;
        }

        var newTaskRow = document.createElement("tr");

        insertTaskInRow(newTask, newTaskRow);

        newTaskInputText.value = "";
        tableBody.appendChild(newTaskRow);

        tasks.push({
            rowIndex: newTaskRow.sectionRowIndex,
            task: newTask,
        });

        localStorage.tasks = JSON.stringify(tasks);
    }

    function checkTaskIsValid(task) {
        if (task === "") {
            alert("Нужно ввести задачу.");
            return false;
        }

        return true;
    }

    function insertTaskInRow(task, taskRow) {
        taskRow.innerHTML = "<td class='task'></td>" +
            "<td><button type='button' class='edit-button'>Редактировать</button>" +
            "<button type='button' class='delete-button'>Удалить</button></td>";

        taskRow.querySelector(".task").textContent = task;

        taskRow.querySelector(".edit-button").addEventListener("click", function () {
            editTask(task, taskRow);
        });

        taskRow.querySelector(".delete-button").addEventListener("click", function () {
            tasks.splice(taskRow.sectionRowIndex, 1);
            localStorage.tasks = JSON.stringify(tasks);

            taskRow.remove();
        });
    }

    function editTask(task, taskRow) {
        taskRow.innerHTML = "<td class='edit-task'><input type='text'></td>" +
            "<td><button type='button' class='save-button'>Сохранить</button>" +
            "<button type='button' class='cancel-button'>Отмена</button></td>";

        taskRow.querySelector(".edit-task input").value = task;

        taskRow.querySelector(".save-button").addEventListener("click", function () {
            updateTask(taskRow);
        });

        document.querySelector(".edit-task input").addEventListener("keydown", function (e) {
            if (e.keyCode == 13) {
                updateTask(taskRow);
            }
        });

        taskRow.querySelector(".cancel-button").addEventListener("click", function () {
            insertTaskInRow(task, taskRow);
        });
    }

    function updateTask(taskRow) {
        var editTask = taskRow.querySelector(".edit-task input").value;

        if (editTask !== null && checkTaskIsValid(editTask.trim())) {
            insertTaskInRow(editTask, taskRow);

            tasks[taskRow.sectionRowIndex].task = editTask;
            localStorage.tasks = JSON.stringify(tasks);
        }
    }

    function initTasks() {
        tasks.forEach(function (taskInfo) {
            var taskRow = document.createElement("tr");
            var task = taskInfo.task;

            insertTaskInRow(task, taskRow);

            tableBody.appendChild(taskRow);
        });
    }
})