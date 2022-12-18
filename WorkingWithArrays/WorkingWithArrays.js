(function () {
    var numbersArray1 = [2, -5, 15, 9, 0, 1, 6];

    console.log("Исходный массив: " + numbersArray1.join(", "));

    function sortArrayByDesc(array) {
        array.sort(function (e1, e2) {
            return e2 - e1;
        });
    }

    sortArrayByDesc(numbersArray1);
    console.log("Отсортированный массив: " + numbersArray1.join(", "));

    function get5FirstElements(array) {
        return array.slice(0, 5);
    }

    var fiveFirstElements = get5FirstElements(numbersArray1);
    console.log("Массив из первых пяти элементов: " + fiveFirstElements.join(", "));

    function get5LastElements(array) {
        return array.slice(-5);
    }

    var fiveLastElements = get5LastElements(numbersArray1);
    console.log("Массив из последних пяти элементов: " + fiveLastElements.join(", "));

    function getEvenNumbersSum(array) {
        return array.filter(function (e) {
            return e % 2 === 0;
        }).reduce(function (sum, e) {
            return sum + e;
        }, 0);
    }

    var evenNumbersSum = getEvenNumbersSum(numbersArray1);
    console.log("Сумма четных элементов массива: " + evenNumbersSum);

    var numbersArray2 = [];

    for (var i = 1; i <= 100; i++) {
        numbersArray2.push(i);
    }

    console.log("Исходный массив: " + numbersArray2.join(", "));

    function getEvenNumbersSquares(array) {
        return array.filter(function (e) {
            return e % 2 === 0;
        }).map(function (e) {
            return e * e;
        });
    }

    var evenNumberSquares = getEvenNumbersSquares(numbersArray2);
    console.log("Квадраты четных чисел: " + evenNumberSquares.join(", "));
})();