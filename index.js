let key = "bf17aa753eec52f73cdb8d53e0609031"

function getWeather(){
    let request = new XMLHttpRequest();

    let city = document.getElementById("city-input").value
    let link = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;

    request.open("GET", link, false); // true for asynchronous
    request.send();

    let jsonObject = JSON.parse(request.responseText);
    alert(jsonObject.name);
}