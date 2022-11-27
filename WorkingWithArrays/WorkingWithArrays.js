(function () {
    var AIS = AIS || {};

    AIS.currentArray1 = [2, -5, 15, 9, 0, 1];

    console.log("Исходный массив: " + AIS.currentArray1.join(", "));

    AIS.currentArray1.sort((a, b) => a - b);
    console.log("Отсортированный массив: " + AIS.currentArray1.join(", "));

    console.log("Массив из первых пяти элементов: " + AIS.currentArray1.slice(0, 5).join(", "));

    console.log("Массив из последних пяти элементов: " + AIS.currentArray1.slice(-5).join(", "));

    console.log("Сумма четных элементов массива: " + AIS.currentArray1.filter((a) => a % 2 == 0).reduce((a, b) => a + b, 0));

    AIS.currentArray2 = [];

    for (var i = 1; i <= 100; i++) {
        AIS.currentArray2.push(i);
    }

    console.log("Исходный массив: " + AIS.currentArray2.join(", "));

    AIS.squaresEvenNumbers = AIS.currentArray2.filter((a) => a % 2 == 0)
        .map((a) => a * a);

    console.log("Квадраты четных числе: " + AIS.squaresEvenNumbers.join(", "));
})();