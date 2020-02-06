const API_KEY = "bf17aa753eec52f73cdb8d53e0609031";
let grid;
let warning;
const template = `<div class="name" id="name">{{name}}</div> 
        <div class="temp" id="temp">{{main.temp}}°C</div>
       <div class="weather" id="weather">Weather:</br>{{weather.0.main}}</div>
      <div class="wind" id="wind">Wind:</br> {{wind.speed}} meter/sec</div>
       <div class="humidity" id="humidity">Humidity:</br> {{main.humidity}}%</div>`;

async function handleSubmit(e) {
    grid  = document.getElementById("grid");
    warning = document.getElementById("warning")

    e.preventDefault();
    if (e.target[0].value === ''){
        warning.style.visibility = "visible";
        return 'Empty value';
    }
    await drawWeather(await getWeatherData(e.target[0].value));
}


async function getWeatherData(inputValue) {
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&APPID=${API_KEY}`);
    return weather;
}


async function drawWeather(weather) {
    if (weather.ok) {
        let json = await weather.json();
        await clearForm();

        if (json) {
            warning.style.visibility = "hidden";
            grid.innerHTML += Mustache.render(template, json);
        }
        return true
    }
    warning.style.visibility = "visible";
    return false
}

async function clearForm() {
    let search = document.getElementById("search");
    grid.innerText = "";
    grid.appendChild(search);
}


module.exports = () => {
    return {
        handleSubmit,
        getWeatherData,
        drawWeather,
        clearForm,
    };
};
