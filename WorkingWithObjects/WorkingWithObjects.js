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

    console.log("Исходный массив: " + modifyCountriesInfoToString(countries));

    var countriesWithMaxCitiesCount = getCountriesWithMaxCitiesCount(countries);
    console.log("Страны/страна с максимальным количеством городов: " +
        modifyCountriesInfoToString(countriesWithMaxCitiesCount));

    var countriesSummaryInfo = getCountriesSummaryInfo(countries);
    console.log("Информация по всем странам: ");

    for (var country in countriesSummaryInfo) {
        console.log(country + ": " + countriesSummaryInfo[country]);
    }

    function getCountriesWithMaxCitiesCount(countries) {
        var maxCitiesCount = Math.max.apply(Math, countries.map(country => {
            return country.cities.length;
        }));

        return countries.filter(country => {
            return country.cities.length == maxCitiesCount;
        });
    }

    function getCountriesSummaryInfo(countries) {
        var result = {};

        countries.forEach(country => {
            result[country.name] = country.cities.reduce((sumPopulation, city) => {
                return sumPopulation + city.population;
            }, 0);
        });

        return result;
    }

    function modifyCountriesInfoToString(countries) {
        return countries.map(country => {
            return ("\n " +
                country.name + ": " + country.cities.map(city => {
                    return "\n " + city.name + ": " + city.population;
                })
            );
        }
        ).join(", ");
    }
})();