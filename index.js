const API_KEY = "bf17aa753eec52f73cdb8d53e0609031";

function getWeather() {
    let grid = document.getElementById("grid");
    let link = "https://api.openweathermap.org/data/2.5/weather?q=" + event.target[0].value + "&units=metric" + "&appid=" + API_KEY;
    let warning = document.getElementById("warning");

    fetch(link)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            } else {
                clearForm(grid);
                warning.style.visibility = "visible";
            }
        })
        .then(function (json) {
            drawWeather(grid, json);
        });

}

function drawWeather(grid, json) {
    clearForm(grid);
    let template = '<div class="name" id="name">{{name}}</div>\n' +
        '    <div class="temp" id="temp">{{main.temp}}°C</div>\n' +
        '    <div class="weather" id="weather">{{weather.0.main}}</div>\n' +
        '    <div class="wind" id="wind">Wind:</br> {{wind.speed}} meter/sec</div>\n' +
        '    <div class="humidity" id="humidity">Humidity:</br> {{main.humidity}}%</div>';

    if (json) {
        document.getElementById("warning").style.visibility = "hidden";
        grid.innerHTML += Mustache.render(template, json);
    }
}

function clearForm(grid) {
    let search = document.getElementById("search");
    grid.innerText = "";
    grid.appendChild(search);
}

