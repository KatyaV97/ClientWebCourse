(function () {
    var countries = [
        {
            name: "Russia",
            cities: [
                {
                    name: "Novosibirsk",
                    population: 1634000,
                },
                {
                    name: "Omsk",
                    population: 1126000,
                },
                {
                    name: "Moskow",
                    population: 13010000,
                },
                {
                    name: "Samara",
                    population: 1173000,
                }
            ]
        },
        {
            name: "Kazakstan",
            cities: [
                {
                    name: "Astana",
                    population: 1328535,
                },
                {
                    name: "Almaty",
                    population: 2135365,
                },
                {
                    name: "Karaganda",
                    population: 503531,
                },
                {
                    name: "Aktobe",
                    population: 525905,
                }
            ]
        },
        {
            name: "Turkey",
            cities: [
                {
                    name: "Istanbul",
                    population: 10895257,
                },
                {
                    name: "Ankara",
                    population: 3945627,
                }
            ]
        }
    ];

    function getCountriesInfoString(countries) {
        return countries.map(function (country) {
            return country.name + ": " + country.cities.map(function (city) {
                return "\n " + city.name + ": " + city.population;
            });
        }).join(", \n");
    }

    console.log("Исходный массив:\n" + getCountriesInfoString(countries));

    function getCountriesWithMaxCitiesCount(countries) {
        var maxCitiesCount = Math.max.apply(null, countries.map(function (country) {
            return country.cities.length;
        }));

        return countries.filter(function (country) {
            return country.cities.length === maxCitiesCount;
        });
    }

    var countriesWithMaxCitiesCount = getCountriesWithMaxCitiesCount(countries);
    console.log("Страны/страна с максимальным количеством городов:\n" +
        getCountriesInfoString(countriesWithMaxCitiesCount));

    function getCountriesSummaryInfo(countries) {
        var result = {};

        countries.forEach(function (country) {
            result[country.name] = country.cities.reduce(function (populationSum, city) {
                return populationSum + city.population;
            }, 0);
        });

        return result;
    }

    var countriesSummaryInfo = getCountriesSummaryInfo(countries);
    console.log("Информация по всем странам:");

    for (var country in countriesSummaryInfo) {
        console.log(country + ": " + countriesSummaryInfo[country]);
    }
})();