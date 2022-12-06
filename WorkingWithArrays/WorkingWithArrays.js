(function () {
    var arrayNumbers1 = [2, -5, 15, 9, 0, 1, 6];

    console.log("Исходный массив: " + arrayNumbers1.join(", "));

    getSortedArray(arrayNumbers1);
    console.log("Отсортированный массив: " + arrayNumbers1.join(", "));

    fiveFirstElementsArrayNumbers1 = getFiveFirstElements(arrayNumbers1);
    console.log("Массив из первых пяти элементов: " + fiveFirstElementsArrayNumbers1.join(", "));

    fiveLastElementsArrayNumbers1 = getFiveLastElements(arrayNumbers1);
    console.log("Массив из последних пяти элементов: " + fiveLastElementsArrayNumbers1.join(", "));

    evenNumbersSumArrayNumbers1 = getEvenNumbersSum(arrayNumbers1);
    console.log("Сумма четных элементов массива: " + evenNumbersSumArrayNumbers1);

    var arrayNumbers2 = [];

    for (var i = 1; i <= 100; i++) {
        arrayNumbers2.push(i);
    }

    console.log("Исходный массив: " + arrayNumbers2.join(", "));

    evenNumberSquares = getEvenNumbersSquares(arrayNumbers2);
    console.log("Квадраты четных числе: " + evenNumberSquares.join(", "));

    function getSortedArray(array) {
        array.sort(function (e1, e2) {
            return e1 - e2;
        });
    }

    function getFiveFirstElements(array) {
        return array.slice(0, 5);
    }

    function getFiveLastElements(array) {
        return array.slice(-5);
    }

    function getEvenNumbersSum(array) {
        return array.filter(function (e) {
            return e % 2 == 0;
        }).reduce(function (sum, e) {
            return sum + e;
        }, 0);
    }

    function getEvenNumbersSquares(array) {
        return array.filter(function (e) {
            return e % 2 == 0;
        }).map(function (e1) {
            return Math.pow(e1, 2);
        });
    }
})();