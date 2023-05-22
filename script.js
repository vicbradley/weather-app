const form = document.querySelector("form");
const img = document.getElementById("weather-image");
form.addEventListener("submit", handleSubmit);

window.onload = function () {
    getWeather("makassar")
        .then((data) => displayWeather(data))
        .catch((e) => console.log("e"))
    ;
};

function handleSubmit(e) {
    e.preventDefault();
    const inputValue = document.getElementById("input").value;
    getWeather(inputValue)
        .then((data) => displayWeather(data))
        .catch((e) => displayError())
    ;
}

function displayError() {
    alert("Please Provide A Valid Location");
}

async function getWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=687550d82b414984943112038231905&q=${location}`, { mode: "cors" });
    const data = await response.json();

    return {
        name: `${data.location.name},${data.location.country}`,
        img: data.current.condition.icon,
        condition: data.current.condition.text,
        localtime: data.location.localtime,
        temp_c: `${data.current.temp_c}° C`,
        temp_f: `${data.current.temp_f}° F`,
        feelslike_c: `Feels Like : ${data.current.feelslike_c}° C`,
        feelslike_f: `Feels Like : ${data.current.feelslike_f}° F`,
        wind: `Wind : ${data.current.wind_mph} MPH`,
        humidity: `Humidity : ${data.current.humidity} %`,
    };
}

// function displayWeather(weatherData) {
//     const weatherArr = Object.entries(weatherData);
//     console.log(weatherArr)
//     for (let i = 0; i < weatherArr.length; i++) {
//         const key = weatherArr[i][0];
//         const value = weatherArr[i][1];
//         if (weatherArr[i][0] == "img") {
//             img.src = weatherArr[i][1];
//         } else {
//             document.querySelector(`.${key}`).textContent = value;
//         }
//     }
// }

// better version
function displayWeather(weatherData) {
    const { img, ...weatherProps } = weatherData;

    Object.entries(weatherProps).forEach(([key, value]) => {
        const element = document.querySelector(`.${key}`);
        if (element) {
            element.textContent = value;
        }
    });

    if (img) {
        document.querySelector("img").src = img;
    }
}

const temp_c = document.querySelector(".temp_c");
const temp_f = document.querySelector(".temp_f");
const fElement = document.querySelectorAll(".fahrenheit");
const cElement = document.querySelectorAll(".celsius");

temp_c.addEventListener("click", toggleTemperatureUnits);
temp_f.addEventListener("click", toggleTemperatureUnits);

function toggleTemperatureUnits() {
    fElement.forEach((el) => el.classList.toggle("clear"));
    cElement.forEach((el) => el.classList.toggle("clear"));
}
