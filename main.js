const timeEl = document.getElementById("time");
const tempE1 = document.getElementById("temp");
const cityE1 = document.getElementById("city");
const conditionEl = document.getElementById("condition");
const iconE1 = document.getElementById("weather-icon");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");
const form = document.getElementById("locationInput");
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
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  timeEl.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;
  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=49cc8c821cd2aff9af04c9f98c36eb74&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

function showWeatherData(data) {
    let { humidity, pressure } = data.main;
    let { speed: wind_speed } = data.wind;
    let { sunrise, sunset } = data.sys;
    let { main, description } = data.weather[0];
    let { temp, feels_like, temp_min, temp_max } = data.main;
    let { name } = data;
    tempE1.innerHTML = temp + "&#176;C";
    cityE1.innerHTML = name;
    conditionEl.innerHTML = main;


  currentWeatherItemsEl.innerHTML = `<h2 class="others-heading">Today's Weather</h2>
  <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
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

  let otherDayForcast = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
    } else {
      otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window
                  .moment(day.dt * 1000)
                  .format("ddd")}</div>
                <img src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `;
    }
  });

  weatherForecastEl.innerHTML = otherDayForcast;
}

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    getWeatherData();
    container.style.opacity = "0";
  });
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (search.value.length == 0) {
    alert("Please enter a city name");
  } else {
    cityInput = search.value;
    getWeatherData();
    search.value = "";
    container.style.opacity = "0";
  }
});
