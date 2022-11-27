(function () {
    var AIS = AIS || {};

    AIS.countries = [{
        name: "Russia",
        cities: [{
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
        },]
    },
    {
        name: "Kazakstan",
        cities: [{
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
        },]
    },
    {
        name: "Turkey",
        cities: [{
            name: "Istanbul",
            population: 10895257,
        },
        {
            name: "Ankara",
            population: 3945627,
        },]
    },];

    console.log("Исходный массив: " + AIS.countries.map((country) =>
                                                    ("\n " + country.name + ": " + country.cities
                                                    .map((city) => city.name + ": " + city.population).join(', '))).join(', '));

    function getCountriesWithMaxCitiesCount(countries) {
        return countries.filter(item => item.cities.length == countries.reduce((prevCountryCitiesCount, curCountry) =>
            (curCountry.cities.length >= prevCountryCitiesCount ? curCountry.cities.length : prevCountryCitiesCount), 0))
            .map(country => country.name);
    }

    console.log("Страны/страна с максимальным количеством городов: " + getCountriesWithMaxCitiesCount(AIS.countries).join(", "));

    function getCountriesSummaryInfo(countries) {
        return countries.reduce((countries, country) => {
            countries[country.name] = country.cities.reduce((prevCityPopulationCount, curCity) =>
                prevCityPopulationCount + curCity.population, 0);
            return countries;
        }, {});
    }

    var countriesSummaryInfo = getCountriesSummaryInfo(AIS.countries);

    console.log("Информация по всем странам: ");

    for (var country in countriesSummaryInfo) {
        console.log(country + ": " + countriesSummaryInfo[country]);
    }
})();