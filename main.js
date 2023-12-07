const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    getResults(searchBox.value);
  }
});

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=tr`)
    .then((weather) => weather.json())
    .then(displayResults)
    .catch((error) => console.error("Hata:", error));
}

function displayResults(weather) {
  const city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  const temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  const weatherElement = document.querySelector(".current .weather");
  weatherElement.innerText = weather.weather[0].main;

  const hiLow = document.querySelector(".hi-low");
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

function dateBuilder(d) {
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  const days = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

document.addEventListener("DOMContentLoaded", function () {
  let bgImages = ["img/bg.jpg", "img/bg2.jpg", "img/bg3.jpg", "img/bg4.jpg"];
  let currentBg = 0;

  setInterval(() => {
    currentBg++;
    if (currentBg > bgImages.length - 1) {
      currentBg = 0;
    }
    document.body.style.backgroundImage = `url('${bgImages[currentBg]}')`;
  }, 10000); // 10 saniyede bir değişir
});

getResults("istanbul");
