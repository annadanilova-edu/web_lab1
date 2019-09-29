
document.addEventListener("DOMContentLoaded", ready);
let city;
let name, temp, wind, weather, humidity;
const key = "bf17aa753eec52f73cdb8d53e0609031";

function ready(){
    city = document.getElementById("search-txt");
    name = document.getElementById("name");
    temp = document.getElementById("temp");
    weather = document.getElementById("weather");
    wind = document.getElementById("wind");
    humidity = document.getElementById("humidity");

    let searchButton = document.getElementById("search-btn");
    let searchInput = document.getElementById("search-txt");

    searchButton.addEventListener("click", getWeather);
    searchInput.addEventListener("keyup", enterPressed);
}
function enterPressed(event) {
    if (event.key === "Enter") {
        getWeather();
    }
}
function getWeather(){
    let link = "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&units=metric" + "&appid=" + key;
    fetch(link)
        .then(function(response){
            if (response.ok){
                return response.json()
            }
            else {
                alert("Ошибка HTTP: " + response.status);
                name.innerText = temp.innetText = wind.innerText = weather.innerText = humidity.innerText = "";
            }
        })
        .then(function(json) {
            console.log(json);
            name.innerHTML = Mustache.render("{{name}}", json);
            temp.innerHTML = Mustache.render("{{main.temp}}°C", json);
            wind.innerHTML = Mustache.render("Wind:</br> {{wind.speed}} meter/sec", json);
            weather.innerHTML = Mustache.render("{{weather.0.main}}", json);
            humidity.innerHTML = Mustache.render("Humidity:</br> {{main.humidity}}%", json);
        });
}

