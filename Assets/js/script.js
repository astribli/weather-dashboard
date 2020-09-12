var date = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(date)

var button = document.querySelector(".btn");

var searchWeather = function () {
    var input = document.querySelector("input").value;
    console.log(input);

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=5fbadc263ee1b5151313ef1a2b7ed927')

        .then(function (response1) {
            return response1.json();
        })

        .then(function (response1) {
            console.log(response1);
            var searchedCity = response1.name;
            var history = document.createElement("p");
            history.innerHTML = searchedCity;
            var searched = document.querySelector("#searched");
            searched.appendChild(history);

            var cityName = document.createElement("h2");
            cityName.innerHTML = searchedCity;
            var city = document.querySelector("#city");
            city.appendChild(cityName);

            var tempVariables = response1.main.temp;
            var tempEl = document.createElement("h4");
            tempEl.innerHTML = tempVariables;
            temp = document.querySelector("#temp");
            temp.appendChild(tempEl);

            var humidityVariables = response1.main.humidity;
            var humidityEl = document.createElement("h4");
            humidityEl.innerHTML = humidityVariables + " %";
            humidity = document.querySelector("#humidity");
            humidity.appendChild(humidityEl);

            var windVariables = response1.wind.speed;
            var windEl = document.createElement("h4");
            windEl.innerHTML = windVariables + " MPH";
            wind = document.querySelector("#wind");
            wind.appendChild(windEl);

            var lat = response1.coord.lat;
            var lon = response1.coord.lon;

            fetch('https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=5fbadc263ee1b5151313ef1a2b7ed927')
                .then(function (response2) {
                    return response2.json();
                })

                .then(function (response2) {
                    console.log(response2.value);

                    var uvVariables = response2.value;
                    var uvEl = document.createElement("h4");
                    uvEl.innerHTML = uvVariables;
                    uv = document.querySelector("#uv");
                    uv.appendChild(uvEl);
                });
        });
}

