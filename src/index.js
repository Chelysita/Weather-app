let now = new Date();
function formatDate(now) {
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
    "December"
  ];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let currentYear = now.getFullYear();
  let nowdate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
  return nowdate;
}
//console.log(formatDate(now));
let date = document.querySelector("#date");
date.innerHTML = formatDate(now);

function showTemperature(response) {
  //alert(`The temperature in Sidney is ${temperature} °C`);
  //let descriptionStatus=(response.data.weather[0].description);
  //alert(`${descriptionStatus}`);
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
