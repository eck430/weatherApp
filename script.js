const apiKey = "e537c13c2b28db01b0ae757273f7661f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector("#search_box");
const searchBtn = document.querySelector("#search_btn");

searchBtn.addEventListener("click", () => {
    updateWeather(searchBox.value);
});

async function updateWeather(city) {
    const apiData = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await apiData.json();

    console.log(data);
    console.log(data.main.feels_like);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".description").innerHTML = data.weather[0].main;
    document.querySelector(".feels").innerHTML = "Feels: " + Math.round(data.main.feels_like) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".sunrise").innerHTML = sunTimeConvert(data.sys.sunrise);
    document.querySelector(".sunset").innerHTML = sunTimeConvert(data.sys.sunset);
}

function sunTimeConvert(sunTime){
    const date = new Date(sunTime * 1000);
    const hr = "0" + date.getHours();
    const min = "0" + date.getMinutes();

    const time = hr.slice(-2) + ":" + min.slice(-2) ;
  
    return time;
}