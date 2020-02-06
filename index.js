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
    warning = document.getElementById("warning");

    await clearForm();

    e.preventDefault();
    if (e.target[0].value.trim() === ''){
        warning.innerHTML = "Something goes wrong. Check city name.";
        return 'Empty value';
    }
    await drawWeather(await getWeatherData(e.target[0].value));
}


async function getWeatherData(inputValue) {
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&APPID=${API_KEY}`);
    return weather;
}


async function drawWeather(weather) {
    warning = document.getElementById('warning')
    if (weather.ok) {
        let json = await weather.json();
        await clearForm();

        if (json) {
            warning.innerText = "";
            grid.innerHTML += Mustache.render(template, json);
            return true
        }
        warning.innerText = "Something goes wrong. Check city name.";
    }
    warning.innerText = "Something goes wrong. Check city name.";
    return false
}

async function clearForm() {
    let search = document.getElementById('search');
    grid  = document.getElementById('grid');
    grid.innerText = "";
    grid.appendChild(search);
    return grid.innerText;
}


module.exports = () => {
    return {
        handleSubmit,
        getWeatherData,
        drawWeather,
        clearForm,
    };
};
