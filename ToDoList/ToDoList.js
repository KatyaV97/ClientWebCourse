document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var buttonAdd = document.querySelector(".form-add-tasks input[type=\"button\"]");

    buttonAdd.addEventListener("click", function () {
        var userTask = document.querySelector(".form-add-tasks input[type=\"text\"]").value;

        console.log(userTask);
        
        if (checkUserTask(userTask)){
            addUserTask(userTask);
            document.querySelector(".form-add-tasks input[type=\"text\"]").value ="";
        }
       

    })

    function checkUserTask(userTask) {
        if (userTask === "" || userTask === null) {
            alert("Нужно ввести задачу.");
            return false;
        }

        return true;
    }

    function addUserTask(userTask) {
        var tbody = document.querySelector(".table-tasks-list tbody");
        var newRow = document.createElement("tr");
        var taskCell = document.createElement("td");
        var modifyCell = document.createElement("td");
        taskCell.innerHTML = userTask;

        tbody.appendChild(newRow);
        newRow.appendChild(taskCell);
        newRow.appendChild(modifyCell);
    }

    function isFirstRow() {
        var tbody = document.querySelector(".table-tasks-list tbody");


    }

    function addFirstRow() {

    }
}