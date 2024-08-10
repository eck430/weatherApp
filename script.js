const apiKey = "e537c13c2b28db01b0ae757273f7661f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector("#search_box");
const searchBtn = document.querySelector("#search_btn");
const weatherIcon = document.querySelector(".weather");

searchBtn.addEventListener("click", () => {
    updateWeather(searchBox.value);
});



async function updateWeather(city) {
    const apiData = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await apiData.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".description").innerHTML = data.weather[0].main;
    document.querySelector(".feels").innerHTML = "Feels: " + Math.round(data.main.feels_like) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".sunrise").innerHTML = sunTimeConvert(data.sys.sunrise);
    document.querySelector(".sunset").innerHTML = sunTimeConvert(data.sys.sunset);

    console.log(data)
    const weather = data.weather[0].main;
    if(weather == "Clear"){
        weatherIcon.src = "imgs/sun.png";
    }
    else if(weather == "Clouds"){
        weatherIcon.src = "imgs/cloudy.png";
    }
    else if(weather == "Atmosphere"){
        weatherIcon.src = "imgs/fog.png";
    }
    else if(weather == "Snow"){
        weatherIcon.src = "imgs/snow.png";
    }
    else if(weather == "Rain"){
        weatherIcon.src = "imgs/rain.png";
    }
    else if(weather == "Drizzle"){
        weatherIcon.src = "imgs/drizzle.png";
    }
    else if(weather == "Thunderstorm"){
        weatherIcon.src = "imgs/storm.png";
    }

    document.querySelector(".card").style.display = "block";
}

function sunTimeConvert(sunTime){
    const date = new Date((sunTime) * 1000);
    const hr = "0" + date.getHours();
    const min = "0" + date.getMinutes();

    const time = hr.slice(-2) + ":" + min.slice(-2) ;
  
    return time;
}