$(document).ready(function () {
    var addButton = $(".add-button");
    var newTaskInputText = $(".new-task");
    var bodyTable = $(".tasks-list-table tbody");

    var storageTokens = localStorage.getItem("tokens");
    var tokens = [];

    if (storageTokens !== null && storageTokens !== "") {
        tokens = storageTokens.split(", ");
        initTasks();
    }

    $("form").on("keydown", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

    $(".new-task").on("keydown", function (e) {
        if (e.keyCode == 13) {
            addTaskHandler();
        }
    });

    addButton.on("click", function () {
        addTaskHandler();
    });

    function addTaskHandler() {
        var newTask = newTaskInputText.val();
        newTaskInputText.val("");

        if (!checkTaskIsValid($.trim(newTask))) {
            alert("Нужно ввести задачу.");
            return;
        }

        var newToken = randomToken();

        var newTaskRow = $("<tr></tr>").appendTo(bodyTable)
                                       .attr("token", newToken);

        addTask(newTask, newTaskRow);

        localStorage.setItem(newToken, newTask);

        tokens.push(newToken);
        localStorage.tokens = tokens.join(", ");
    }

    function checkTaskIsValid(task) {
        if (task === "" || task === null) {
            return false;
        }

        return true;
    }

    function addTask(task, taskRow) {
        taskRow.html("<td class='new-task'></td>" +
            "<td><button type='button' class='edit-button'>Редактировать</button>" +
            "<button type = 'button' class='delete-button'>Удалить</button ></td> ")
            .find(".new-task").text(task);

        taskRow.find(".edit-button").on("click", function () {
            var editableTask = $(this).closest("tr").find(".new-task").text();
            var editableRow = $(this).closest("tr");

            editTask(editableTask, editableRow);
        });

        taskRow.find(".delete-button").on("click", function () {
            $(this).closest("tr").remove();

            var token = taskRow.getAttribute("token")
            delete localStorage[token];

            var index = tokens.indexOf(token);
            tokens.splice(index, 1);
            localStorage.tokens = tokens.join(", ");
        });
    }

    function editTask(task, taskRow) {
        taskRow.html("<td class='edit-task'><input type='text>'></td>" +
            "<td><button type='button' class='save-button'>Сохранить</button>" +
            "<button type = 'button' class='cancel-button'>Отмена</button ></td> ")
            .find(".edit-task input")
            .val(task);

        taskRow.find(".save-button").on("click", function () {
            updateTask($(this).closest("tr"));
        });

        taskRow.find(".edit-task input").on("keydown", function (e) {
            if (e.keyCode == 13) {
                updateTask($(this).closest("tr"));
            }
        });

        taskRow.find(".cancel-button").on("click", function () {
            addTask(task, $(this).closest("tr"));
        });
    }

    function updateTask(taskRow) {
        var editTask = taskRow.find(".edit-task input")
                              .val();

        if (checkTaskIsValid($.trim(editTask))) {
            addTask(editTask, taskRow);
            localStorage[taskRow.getAttribute("token")] = editTask;
        }
    }

    function initTasks() {
        tokens.forEach(token => {
            var taskRow = $("<tr></tr>").attr("token", token)
                                        .appendTo(bodyTable);

            var task = localStorage.getItem(token);

            addTask(task, taskRow);
        })
    }

    function randomToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
});