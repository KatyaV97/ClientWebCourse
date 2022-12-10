document.addEventListener("DOMContentLoaded", function () {
    var calcButton = document.querySelector(".btn-calc");
    var celsiusTemperature = document.getElementById("temperature-celsius");
    var fahrenheitTemperature = document.getElementById("temperature-fahrenheit-result");
    var kelvinTemperature = document.getElementById("temperature-kelvin-result");

    calcButton.addEventListener("click", function () {
        var celsius = celsiusTemperature.value;

        if (checkTemperatureIsNumber(celsius.trim())) {
            fahrenheitTemperature.value = getFahrenheitFromCelsius(celsius);
            kelvinTemperature.value = getKelvinFromCelsius(celsius);
        }
    });

    function getFahrenheitFromCelsius(celsius) {
        return ((+celsius * 9 / 5) + 32).toFixed(2);
    }

    function getKelvinFromCelsius(celsius) {
        return (+celsius + 273).toFixed(2);
    }

    function checkTemperatureIsNumber(temperature) {
        if (temperature === "" || temperature === null || isNaN(temperature)) {
            alert("Нужно ввести число.");
            return false;
        }

        return true;
    }
})