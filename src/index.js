function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = days[now.getDay()];
  let months = [
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
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentYear = now.getFullYear();

  let nowdate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} ${hours}:${minutes}`;
  return nowdate;
}
//console.log(formatDate(now));

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `

            
            <div class="col-2">
             <div class="weather-forecast-day">${formatDay(
               forecastDay.dt
             )}</div> 
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="30"/>
              <div class="weather-forecast-temperatures">
                <span class="forecast-max">${Math.round(
                  forecastDay.temp.max
                )} °</span>
                <span class="forecast-min">${Math.round(
                  forecastDay.temp.min
                )} °</span>
            
            
          </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayDayForecast() {
  let dayForecastElement = document.querySelector("#dayForecast");
  let dayForecastHTML = `<div class="row">`;
  let dias = ["Thu", "Fri", "Sat"];
  dias.forEach(function (dia) {
    dayForecastHTML =
      dayForecastHTML +
      `
            <div class="col-6">
              <div class="day-weather-forecast">${dia}</div>
              
            </div>
            <div class="col-4">
              🌤️<br />
             
            </div>
            <div class="col-1">
              27 <br />
              
            </div>
            <div class="col-1">
              12 <br />
              
            </div>`;
  });
  dayForecastHTML = dayForecastHTML + `</div>`;
  dayForecastElement.innerHTML = dayForecastHTML;
}

function getDailyForecast(coordinates) {
  let apikey = "cdc6f40eaa51d2e0ae19d310a7a3769c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  celciusTemperature = response.data.main.temp;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let replaceh1 = document.querySelector("#city");
  replaceh1.innerHTML = response.data.name;
  document.querySelector("#now-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )} `;

  getDailyForecast(response.data.coord);
}

function currentCity(city) {
  let apikey = "cdc6f40eaa51d2e0ae19d310a7a3769c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  currentCity(city.value);
}
currentCity("Boston");
function showFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#now-temperature");
  let fTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#now-temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;
displayDayForecast();
let searchForm = document.querySelector("#cityInput");
searchForm.addEventListener("submit", handleSubmit);

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", showFarenheitTemperature);

let cLink = document.querySelector("#celcius-link");
cLink.addEventListener("click", showCelciusTemperature);
