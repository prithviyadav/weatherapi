const container = document.querySelector(".container");
const tempE1 = document.getElementById("temp");
const cityE1 = document.getElementById("city");
const conditionEl = document.getElementById("condition");
const iconE1 = document.getElementById("weather-icon");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const weatherForecastEl = document.getElementById("weather-forecast");
const form = document.getElementById("location-input");
const search = document.querySelector(".search");
const cities = document.querySelectorAll(".city");
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
let cityInput = "Delhi";
const API_KEY = "49cc8c821cd2aff9af04c9f98c36eb74";

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);
// ----------------------------------------------

getWeatherData();
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            cityInput +
            "&appid=49cc8c821cd2aff9af04c9f98c36eb74&exclude=hourly,minutely&units=metric&appid=${API_KEY}"
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.showWeatherData(data));
    });
}

function showWeatherData(data) {
    let { humidity, pressure } = data.main;
    let { speed: wind_speed } = data.wind;
    let { sunrise, sunset } = data.sys;
    let { main: condition, icon } = data.weather[0];
    let { temp } = data.main;
    iconE1.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    tempE1.innerHTML = Math.round(temp) + "&#176;C";
    cityE1.innerHTML = data.name;
    conditionEl.innerHTML = condition;
    currentWeatherItemsEl.innerHTML = `<h2 class="others-heading">Today's Weather</h2>
  <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity} %</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure} Hg</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed} km/h</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format("HH:mm a")}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format("HH:mm a")}</div>
    </div>
     `;

    if (
        condition.toLowerCase() == "cloudy" ||
        condition.toLowerCase() == "clouds"
    ) {
        document.body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1572162522099-7a0c28d7691b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')";
    } else if (condition.toLowerCase() == "rainy") {
        document.body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80')";
    } else if (
        condition.toLowerCase() == "sunny" ||
        condition.toLowerCase() == "clear"
    ) {
        document.body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1476673160081-cf065607f449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80')";
    } else if (condition.toLowerCase() == "haze") {
        document.body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1536244636800-a3f74db0f3cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=792&q=80')";
    } else if (condition.toLowerCase() == "mist") {
        document.body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1542601098-8fc114e148e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')";
    } else if (condition.toLowerCase() == "snow") {
        document.body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')";
    } else if (condition.toLowerCase() == "drizzle") {
        document.body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1548232979-6c557ee14752?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80  ')";
    } else if (condition.toLowerCase() == "fog") {
        document.body.style.backgroundImage =
            "url('https://images.unsplash.com/photo-1528353518104-dbd48bee7bc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80')";
    }
    //   setTimeout(() => {
    //     document.body.style.backgroundImage =
    //       "url('https://source.unsplash.com/1600x900/?" + data.name + "')";
    //   }, 4000);

    // ----------------------------------------------------------------------------------------
    const latitude = data.coord.lat;
    const longitude = data.coord.lon;

    const url =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&exclude=hourly,minutely&units=metric&appid=" +
        "49cc8c821cd2aff9af04c9f98c36eb74";
    // https.get(url, (res) => {
    //     response.on("data", (data) => {
    //         const weatherData = JSON.parse(data);
    //         console.log(weatherData);
    //     });
    // });
    const fetchUsers = async () => {
        try {
            const res = await fetch(url);
            // check for 404 error
            if (!res.ok) {
                throw new Error(res.status);
            }
            const data = await res.json();
            console.log(data);
            let otherDayForcast = "";
            data.daily.forEach((day, idx) => {
                if (idx == 0 || idx > 5) {
                    return;
                }
                else {
                    otherDayForcast += `
                    <div class="weather-forecast-item">
                        <div class="day">${window.moment(day.dt * 1000).format("ddd")}</div>
                        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                        <div class="temp">Night - ${day.temp.night}&#176;C</div>
                        <div class="temp">Day - ${day.temp.day}&#176;C</div>
                    </div>`;
                }
            });
            weatherForecastEl.innerHTML = otherDayForcast;
        } catch (error) {
            // catch block for network errors
            console.log(error);
        }
    };
    fetchUsers();
}

cities.forEach((city) => {
    city.addEventListener("click", (e) => {
        cityInput = e.target.innerHTML;
        getWeatherData();
    });
});
form.addEventListener("submit", (e) => {
    if (search.value.length == 0) {
        alert("Please enter a city name");
    } else {
        cityInput = search.value;
        getWeatherData();
        search.value = "";
    }
    e.preventDefault();
});
