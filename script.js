const apiKey = "e537c13c2b28db01b0ae757273f7661f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector("#search_box");
const searchBtn = document.querySelector("#search_btn");
const weatherIcon = document.querySelector(".weather");
const addBtn = document.querySelector(".add_btn");

searchBtn.addEventListener("click", () => {
    updateWeather(searchBox.value).then(()=>{
        searchBox.value = '';
    });
});

addBtn.addEventListener("click", () => {
    const card = document.querySelector(".card");
    const weatherImg = weatherIcon.src;
    const weatherData = {
        name: document.querySelector(".city").innerHTML,
        weather: document.querySelector(".description").innerHTML,
        temp: document.querySelector(".temp").innerHTML,
        feels_like: document.querySelector(".feels").innerHTML,
        humidity: document.querySelector(".humidity").innerHTML,
        sunrise: document.querySelector(".sunrise").innerHTML, 
        sunset: document.querySelector(".sunset").innerHTML
    }

    if(card.style.display !== "none"){
        saveCard(weatherData, weatherImg);
        document.querySelector(".card").style.display = "none";
        document.querySelector(".allAddedCards").style.display = "flex";
    }
});

async function updateWeather(city) {
    const apiData = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await apiData.json();

    if(apiData.status == 404 || apiData.status == 400){
        document.querySelector(".error p").style.display = "block";
        document.querySelector(".card").style.display = "none";
    }
    else{
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".description").innerHTML = data.weather[0].main;
        document.querySelector(".feels").innerHTML = "Feels: " + Math.round(data.main.feels_like) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".sunrise").innerHTML = sunTimeConvert(data.sys.sunrise, data.timezone);
        document.querySelector(".sunset").innerHTML = sunTimeConvert(data.sys.sunset, data.timezone);

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
        document.querySelector(".allAddedCards").style.display = "none";
        document.querySelector(".error p").style.display = "none";
        document.querySelector(".welcome").style.display = "none";
    }
}

function saveCard(data, icon){
    const addCard = document.createElement('div');
    addCard.className = 'addedCard';
    addCard.innerHTML = `
        <div class="delete_btn">
            <img src="imgs/bin.png" alt="remove icon" id="remove_icon">
        </div>
        <img src="${icon}" alt="weather icon" class="weather">
            <div class="city_data">
                <h2 class="city">${data.name}</h2>
                <div class="data">
                    <p class="description">${data.weather}</p>
                    <div class="space"></div>
                    <p class="feels">Feels: ${data.feels_like}</p>
                    <div class="space"></div>
                    <img src="imgs/humidity.png" alt="humidity" id="humidity_icon">
                    <p class="humidity">${data.humidity}</p>
                </div>
                <div class="temp_data">
                    <div class="sun_time">
                        <img src="imgs/sunrise.png" alt="sunrise">
                        <p class="sunrise">${data.sunrise}</p>
                    </div>
                    <h1 class="temp">${data.temp}</h1>
                    <div class="sun_time">
                        <img src="imgs/sunset.png" alt="sunset">
                        <p class="sunset">${data.sunset}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.allAddedCards').appendChild(addCard);

    addCard.querySelector(".delete_btn").addEventListener("click", () => {
        addCard.remove();
    });
}

function sunTimeConvert(sunTime, timezone){
    const date = new Date((sunTime + timezone) * 1000);
    const hr = "0" + date.getUTCHours();
    const min = "0" + date.getUTCMinutes();

    const time = hr.slice(-2) + ":" + min.slice(-2) ;
  
    return time;
}