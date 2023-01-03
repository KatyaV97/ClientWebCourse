$(function () {
    var addButton = $(".add-button");
    var newTaskInputText = $(".new-task");
    var tableBody = $(".tasks-list-table tbody");

    var tasks = [];
    var storageTasks = localStorage.getItem("tasks");

    if (storageTasks !== null && storageTasks !== "") {
        tasks = JSON.parse(storageTasks);
        initTasks();
    }

    $(".form-add-tasks").on("keydown", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    $(".new-task").on("keydown", function (e) {
        if (e.keyCode === 13) {
            addTask();
        }
    });

    addButton.click(function () {
        addTask();
    });

    function addTask() {
        var newTask = newTaskInputText.val();

        if (newTask === null || !checkTaskIsValid($.trim(newTask))) {
            return;
        }

        var newTaskRow = $("<tr>").appendTo(tableBody);

        insertTaskInRow(newTask, newTaskRow);

        tasks.push({
            rowIndex: newTaskRow.index(),
            task: newTask,
        });

        newTaskInputText.val("");
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
        taskRow.html("<td class='task'></td>" +
            "<td><button type='button' class='edit-button'>Редактировать</button>" +
            "<button type='button' class='delete-button'>Удалить</button></td>")
            .find(".task")
            .text(task);

        taskRow.find(".edit-button").click(function () {
            var task = taskRow.find(".task").text();

            editTask(task, taskRow);
        });

        taskRow.find(".delete-button").click(function () {
            tasks.splice(taskRow.index(), 1);
            localStorage.tasks = JSON.stringify(tasks);

            taskRow.remove();
        });
    }

    function editTask(task, taskRow) {
        taskRow.html("<td class='edit-task'><input type='text'></td>" +
            "<td><button type='button' class='save-button'>Сохранить</button>" +
            "<button type='button' class='cancel-button'>Отмена</button></td>")
            .find(".edit-task input")
            .val(task);

        taskRow.find(".save-button").click(function () {
            updateTask(taskRow);
        });

        taskRow.find(".edit-task input").on("keydown", function (e) {
            if (e.keyCode === 13) {
                updateTask(taskRow);
            }
        });

        taskRow.find(".cancel-button").click(function () {
            insertTaskInRow(task, taskRow);
        });
    }

    function updateTask(taskRow) {
        var editTask = taskRow.find(".edit-task input").val();

        if (editTask === null || !checkTaskIsValid($.trim(editTask))) {
            return;
        }

        insertTaskInRow(editTask, taskRow);

        tasks[taskRow.index()].task = editTask;
        localStorage.tasks = JSON.stringify(tasks);
    }

    function initTasks() {
        tasks.forEach(function (taskInfo) {
            var taskRow = $("<tr>").appendTo(tableBody);
            var task = taskInfo.task;

            insertTaskInRow(task, taskRow);
        });
    }
});