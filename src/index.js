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
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `

            
            <div class="col-2">
             <div class="weather-forecast-day">${day}</div> 
              ☁️<br />
              <div class="weather-forecast-temperatures">
                <span class="forecast-max">21°C</span>
                <span class="forecast-min">18°C</span>
            
            
          </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getDailyForecast(coordinates) {
  let apikey = "cdc6f40eaa51d2e0ae19d310a7a3769c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apikey}&unit=metric`;
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

function currentCity(event) {
  event.preventDefault();
  let apikey = "cdc6f40eaa51d2e0ae19d310a7a3769c";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
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

let searchForm = document.querySelector("#cityInput");
searchForm.addEventListener("submit", currentCity);

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", showFarenheitTemperature);

let cLink = document.querySelector("#celcius-link");
cLink.addEventListener("click", showCelciusTemperature);
