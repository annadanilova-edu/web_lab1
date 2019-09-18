
let key = "bf17aa753eec52f73cdb8d53e0609031"


function getWeather(){
    let city = document.getElementById("city-input")
    let request = new XMLHttpRequest();

    let link = "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&appid=" + key;

    request.open("GET", link, false); // true for asynchronous
    request.send();

    let jsonObject = JSON.parse(request.responseText);
    city.innerHTML = jsonObject.name;

    let template = "{{base}}";

    document.getElementById("result").innerText = Mustache.render(template, jsonObject);
}

