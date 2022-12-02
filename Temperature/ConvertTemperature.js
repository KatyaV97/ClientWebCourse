document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var buttonCalc = document.querySelector(".btn-calc");

    buttonCalc.addEventListener("click", function (e) {
        var celsius = document.getElementById("user-temp-celsius").value;

        if (checkUserValueIsNumber(celsius)) {
            document.getElementById("temp-fahrenheit-result").value = getFahrenheitFromCelsius(celsius);
            document.getElementById("temp-kelvin-result").value = getKelvinFromCelsius(celsius);
        }
    });

    function getFahrenheitFromCelsius(celsius) {
        return ((+celsius * 9 / 5) + 32).toFixed(2);
    }

    function getKelvinFromCelsius(celsius) {
        return (+celsius + 273).toFixed(2);
    }
}

function checkUserValueIsNumber(userValue) {
    if (userValue === "" || userValue === null || isNaN(userValue)) {
        alert("Нужно ввести число.");
        return false;
    }

    return true;
}