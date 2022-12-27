(function () {
    var people = [
        {
            name: "Pavel",
            age: 27
        },
        {
            name: "Olga",
            age: 20
        },
        {
            name: "Olga",
            age: 21
        },
        {
            name: "Vladislav",
            age: 2
        },
        {
            name: "Anna",
            age: 36
        },
        {
            name: "Nikita",
            age: 47
        },
        {
            name: "Nikita",
            age: 27
        },
        {
            name: "Nikita",
            age: 88
        },
        {
            name: "Valera",
            age: 52
        },
        {
            name: "Petr",
            age: 30
        }
    ];

    function getPeopleInfoString(people) {
        return _.chain(people).map(function (person) {
            return "Name: " + person.name + ", " + "Age: " + person.age;
        }).join(", \n").value();
    }

    console.log("Список людей:\n" + getPeopleInfoString(people));

    function getAverageAge(people) {
        return _.chain(people).reduce(function (averageAge, person) {
            return averageAge + person.age;
        }, 0).value();
    }

    var averageAge = getAverageAge(people);

    console.log("Средний возраст: " + averageAge);

    function getFrom20To30AgeSortPeople(people) {
        return _.chain(people).filter(function (person) {
            return person.age >= 20 && person.age <= 30;
        }).sort(function (person1, person2) {
            return person1.age - person2.age;
        }).value();
    }

    var from20To30AgeSortPeople = getFrom20To30AgeSortPeople(people);

    console.log("Список людей возрастом от 20 до 30 лет включительно:\n" +
        getPeopleInfoString(from20To30AgeSortPeople));

    function getFrom20To30AgeSortByDescWithUniqueNamesPeople(people) {
        return _.chain(people).filter(function (person) {
            return person.age >= 20 && person.age <= 30;
        }).uniq(function (person) {
            return person.name;
        }).sort(function (person1, person2) {
            return person2.age - person1.age;
        }).value();
    }

    var from20To30AgeSortByDescWithUniqueNamesPeople = getFrom20To30AgeSortByDescWithUniqueNamesPeople(people);

    console.log("Список людей с уникальными именами возрастом от 20 до 30 лет включительно:\n" +
        getPeopleInfoString(from20To30AgeSortByDescWithUniqueNamesPeople));

    function getUniquePeopleNamesList(people) {
        var result = {};

        _.chain(people).uniq(function (person) {
            return person.name;
        }).each(function (person) {
            var personName = person.name;

            result[personName] = _.chain(people).filter(function (person) {
                return person.name === personName;
            }).size().value();
        }).value();

        return result;
    }

    var uniquePeopleNames = getUniquePeopleNamesList(people);

    for (var name in uniquePeopleNames) {
        console.log(name + ": " + uniquePeopleNames[name]);
    }
})();