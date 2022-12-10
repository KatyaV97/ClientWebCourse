document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.querySelector(".add-button");
    var newTaskInputText = document.querySelector(".new-task");
    var bodyTable = document.querySelector(".tasks-list-table tbody");

    document.querySelector("form").addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

    addButton.addEventListener("click", function () {
        var newTask = newTaskInputText.value;

        if (!checkTaskIsValid(newTask.trim())) {
            return;
        }

        var newTaskRow = document.createElement("tr");
        addNewTask(newTask);

        function addNewTask(newTask) {
            newTaskRow.innerHTML = "<td class='new-task'></td>" +
                "<td><button type='button' class='edit-button'>Редактировать</button>" +
                "<button type = 'button' class='delete-button'>Удалить</button ></td> ";

            newTaskRow.querySelector(".new-task").textContent = newTask;

            newTaskRow.querySelector(".edit-button").addEventListener("click", function () {
                newTaskRow.innerHTML = "<td class='edit-task'><input type='text>'></td>" +
                    "<td><button type='button' class='save-button'>Сохранить</button>" +
                    "<button type = 'button' class='cancel-button'>Отмена</button ></td> ";

                newTaskRow.querySelector(".edit-task input").value = newTask;

                newTaskRow.querySelector(".save-button").addEventListener("click", function () {
                    var editTask = newTaskRow.querySelector(".edit-task input").value;

                    if (checkTaskIsValid(editTask.trim())) {
                        addNewTask(editTask);
                    }
                });

                newTaskRow.querySelector(".cancel-button").addEventListener("click", function () {
                    addNewTask(newTask, newTaskRow)
                });
            });

            newTaskRow.querySelector(".delete-button").addEventListener("click", function () {
                newTaskRow.remove();
            });
        }

        newTaskInputText.value = "";
        bodyTable.appendChild(newTaskRow);
    });

    function checkTaskIsValid(task) {
        if (task === "" || task === null) {
            alert("Нужно ввести задачу.");
            return false;
        }

        return true;
    }
})