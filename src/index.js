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

function showTemperature(response) {
  console.log(response.data);
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
  )} °C`;
}

function currentCity(event) {
  event.preventDefault();
  let apikey = "cdc6f40eaa51d2e0ae19d310a7a3769c";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#cityInput");
searchForm.addEventListener("submit", currentCity);
