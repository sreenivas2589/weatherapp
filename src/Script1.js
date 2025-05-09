// JavaScript source code

//Api Provided by openweathermap.org

const weatherApi = {
    key: "00ed8ca9ca305c07a7af65fa4e391d1d",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
    daily: "https://api.openweathermap.org/data/2.5/forecast",

}

//historyfile for storing recently searched results
var historyfile = JSON.parse(localStorage.getItem("history")) || []


//search box
const SearchInputBox = document.getElementById('city-search')

const clickbtn = document.getElementById("clickbtn")

const futureitems = document.getElementById('dailyforecast')


var icon = document.getElementById('weathericon')

const button = document.getElementById('fara')

//define latitude and longitude variables
var lon
var lat

//define celcius 
const celcius = document.getElementById('celc')

//button which allows user to use his location 
const locationbtn = document.getElementById('location-btn')

//create a event listener for getting current location
locationbtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("position", position)
            lat = position.coords.latitude
            lon = position.coords.longitude
            fetchlat(lat, lon)
            
            futuredate(lat, lon)

            document.getElementById('location-details').classList.replace('hidden', 'flex')
            document.getElementById('weatherprops').classList.replace('hidden', 'flex')
            document.getElementById('weather-status').classList.replace('hidden', 'flex')
            document.getElementById('buttons').classList.replace('hidden', 'flex')


        }, () => {

            alert("Location Denied")
            //default location will be delhi
            SearchInputBox.value = "delhi"
            
        })


    }
    
})


//add an event for the search box where the user can search for the city and if the city is not found it will show the default city as delhi
//you can also use enter to get the weather data of location and or you can also click on the search button to fetch weather data 

SearchInputBox.addEventListener('keypress', (event) => {
    //if (SearchInputBox.value === "" || event.target.value == null) {
    //    alert("Please enter a city name")
    //}


    if(event.keyCode == 13) {
        //console.log(SearchInputBox.value)
        var searchval = (SearchInputBox.value).trim().toLowerCase()
        GetWeatherReport(searchval)
        futuredateval(searchval)
        
        
        document.getElementById('location-details').classList.replace('hidden', 'flex')
        document.getElementById('weatherprops').classList.replace('hidden', 'flex')
        document.getElementById('weather-status').classList.replace('hidden', 'flex')
        document.getElementById('buttons').classList.replace('hidden', 'flex')

        /*document.getElementById('city-search').value = ""*/

        
    }
})

//search box for getting weather data of location
clickbtn.addEventListener('click', () => {

    
    var searchval = (SearchInputBox.value).trim().toLowerCase()
    GetWeatherReport(searchval)
    futuredateval(searchval)
    
    document.getElementById('location-details').classList.replace('hidden', 'flex')
    document.getElementById('weatherprops').classList.replace('hidden', 'flex')
    document.getElementById('weather-status').classList.replace('hidden', 'flex')
    document.getElementById('buttons').classList.replace('hidden', 'flex')

})



//checking if a city exists or not.If it doesnt then the default city will be set to delhi and also using error handling
function GetWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}`)
        .then(weather => {

            if (weather.ok) {

                console.log(weather)

            }
            return weather.json()

        }).then(ShowWeatherReport).catch((err) => {console.log("Api Not loaded",err)})
        
}

//this function gets the future 5days weather data using lat and long 
function futuredate(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApi.key}`)
        .then(response => {
            if (response.ok) {
                console.log(response)
                /*console.log(response.json())*/
                return response.json()
            }
            else {
                throw new Error("Data not loaded","code:",response.status,"Statustext",response.statusText)
            }

        }).then(getfuturedetails).catch((err) => console.log("Api not loaded",err))
}

//this function fetches weather forecast data for 5 days using location name 
function futuredateval(cityname) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${weatherApi.key}`)
        .then(response => {
            if (response.ok) {
                console.log(response)
                return response.json()

            }
            else {
                throw new Error(`Data Not loaded Please try again, ${response.status} ${response.statusText}`)
            }
            
        }).then(getfuturedetails).catch(err => console.log("Api Not loaded",err))
}

//this function displays all the weather data which is fetched by the above 2 functions
function getfuturedetails(futureweather) {

    let cityname = futureweather.city.name
    console.log(cityname)

    document.getElementById("dailyforecast").innerHTML = ""

    let arr = futureweather.list

    let date = new Date()

    arr.forEach((ele, index) => {
        //if (index == 0) {

        //}

        if ((index+1) % 8 == 0 )  {

            let city = document.createElement('p')
            //console.log(ele)
            //console.log(index)
            
            city.innerHTML = `${cityname}`

            let tempele = document.createElement('p')
            tempele.className = "text-4xl font-medium font-sans max-[376px]:text-2xl max-[769px]:text-4xl"
            tempele.innerHTML = `${(Math.round(ele.main.temp) - 273)}<sup>0</sup>C`

            let dateele = document.createElement('p')
            dateele.innerHTML = `Date:${ele.dt_txt.slice(0, 11)}`


            let weatherele = document.createElement('p')
            weatherele.innerHTML = `${ele.weather[0].main}`

            let image = document.createElement('img')

            if (ele.weather[0].main == 'Clouds') {
                image.src = "Weather_Type_Icons/cloud-sky_3222807.png"
            }


            else if (ele.weather[0].main == 'Clear') {

                image.src = "Weather_Type_Icons/clear_3304654.png"

            }
            else if (ele.weather[0].main == 'Haze') {
                image.src = "Weather_Type_Icons/haze_17993043.png"
            }
            else if (ele.weather[0].main == 'Rain') {
                image.src = "Weather_Type_Icons/rain_1888290.png"
            }
            else if (ele.weather[0].main == 'Smoke') {
                image.src = "Weather_Type_Icons/smoky.png"
            }
            else if (ele.weather[0].main == 'Snow') {
                image.src = "Weather_Type_Icons/snowy_6566033.png"
            }
            else if (ele.weather[0].main == 'Sunny') {
                image.src = "Weather_Type_Icons/sun_911035.png"
            }
            else if (ele.weather[0].main == 'Thunderstorm') {
                image.src = "Weather_Type_Icons/thunder_6636103.png"

            }

            let speedele = document.createElement('div')
            speedele.className = "flex flex-row justify-center items-center flex-wrap gap-2 "
            speedele.innerHTML = `<img src="Main_Icons/wind.png" class="max-[769px]:h-[20px]"/>
                                  <p>Wind Speed:${ele.wind.speed} m/s</p>`

            
            let humidityele = document.createElement('div')
            humidityele.className = "flex flex-row justify-center items-center flex-wrap "
            humidityele.innerHTML = `<img src="Main_Icons/humidity.png" class="max-[769px]:h-[20px]"/>
                                     <p>Humdity:${ele.main.humidity}%</p>  `

            let div = document.createElement('div')
            div.className = "flex flex-col border-2 border-blue-500 rounded-md justify-center items-center text-xl bg-[rgba(0,134,210,0.3)] hover:bg-[rgba(0,134,210,0.9)] transition duration-450 ease-in-out active:bg-[rgba(0,134,210,0.9)]"

            div.append(city)
            div.append(tempele)
            div.append(dateele)
            div.append(image)
            div.append(weatherele)
            div.append(speedele)
            div.append(humidityele)

            let dailyforecast = document.getElementById('dailyforecast')

            dailyforecast.append(div)
        }

    })
}
 



//check if latitude and longitude are correct or not using weatherapp api.If they do not exist then it will display "wrong latitude"
//and also use error handling

function fetchlat(lat, lon) {
    fetch(`${weatherApi.baseUrl}?lat=${lat}&lon=${lon}&appid=${weatherApi.key}`)
        .then(weatherucor => {
            if (weatherucor.ok) {
                console.log(weatherucor)
                return weatherucor.json()

            }
            else {
                throw new Error(`data Not loaded, ${weatherucor.status} ${weatherucor.statusText}`)
            }
        }).then(showweatherreportcoord).catch((err) => { console.log("Api Not loaded",err) })
        //

}

//this function will show the weather report of the current location using latitude and longitude
function showweatherreportcoord(weatherucor) {
    console.log(weatherucor)
    if (weather.cod == '404') {
        SearchInputBox.value = "delhi"
    }

    let windspeed = document.getElementById('windspeed')
    windspeed.innerText = "wind Speed - " + weatherucor.wind.speed + " m/s"

    let city = document.getElementById('city')
    city.innerText = weatherucor.name + "," + weatherucor.sys.country

    SearchInputBox.value = weatherucor.name

    var searchinput = (SearchInputBox.value).trim().toLowerCase()
    var weathercity = weatherucor.name.toLowerCase()

    if (historyfile.includes(weathercity)) {

    }
    else {
        historyfile.push(weathercity)
        localStorage.setItem("history", JSON.stringify(historyfile));
    }

    let temperature = document.getElementById('temp')
    temperature.innerHTML = "Temperature " + (Math.round(weatherucor.main.temp) - 273) + "<sup>0</sup>" + " C"

    let minMaxTemp = document.getElementById('min-max')
    minMaxTemp.innerHTML = "Min " + (Math.floor(weatherucor.main.temp_min) - 273) + "<sup>0</sup>" + " C" + ", " + "Max " + (Math.ceil(weatherucor.main.temp_max - 273)) + "<sup>0</sup>" + " C"

    let humidity = document.getElementById('humidity')
    humidity.innerHTML = "Humdity -  " + (weatherucor.main.humidity) + "%"

    let coordinates = document.getElementById('lati')
    lati.innerText = "Latitude: " + Math.round((weatherucor.coord.lat)) + "deg" + "," + " Longitude: " + Math.round((weatherucor.coord.lon)) + "deg"


    let weatherType = document.getElementById('weather')
    weatherType.innerText = (weatherucor.weather[0].main)


    let date = document.getElementById('date')
    let todaydate = new Date()
    date.innerText = dateManage(todaydate)

    button.addEventListener('click', () => {
        temperature.innerHTML = "Temperature " + (Math.round((Math.round(weatherucor.main.temp) - 273) * (1.8) + 32)) + "<sup>0</sup>" + " F"
        minMaxTemp.innerHTML = "Min " + Math.ceil(((Math.floor(weatherucor.main.temp_min) - 273) * (1.8) + 32)) + "<sup>0</sup>" + " F" + ", " + "Max " + Math.floor(((Math.ceil(weatherucor.main.temp_max) - 273) * (1.8) + 32)) + "<sup>0</sup>" + " F"

    })

    celcius.addEventListener('click', () => {
        temperature.innerHTML = "Temperature " + (Math.round(weatherucor.main.temp) - 273) + "<sup>0</sup>" + " C"
        minMaxTemp.innerHTML = "Min " + (Math.floor(weatherucor.main.temp_min) - 273) + "<sup>0</sup>" + " C" + ", " + "Max " + (Math.ceil(weatherucor.main.temp_max - 273))+ "<sup>0</sup>" + " C"

    })

    if (weatherType.textContent == 'Clouds') {
        icon.src = "Weather_Type_Icons/cloud-sky_3222807.png"
    }


    else if (weatherType.textContent == 'Clear') {

        icon.src = "Weather_Type_Icons/clear_3304654.png"

    }
    else if (weatherType.textContent == 'Haze') {
        icon.src = "Weather_Type_Icons/haze_17993043.png"
    }
    else if (weatherType.textContent == 'Rain') {
        icon.src = "Weather_Type_Icons/rain_1888290.png"
    }
    else if (weatherType.textContent == 'Smoke') {
        icon.src = "Weather_Type_Icons/smoky.png"
    }
    else if (weatherType.textContent == 'Snow') {
        icon.src = "Weather_Type_Icons/snowy_6566033.png"
    }
    else if (weatherType.textContent == 'Sunny') {
        icon.src = "Weather_Type_Icons/sun_911035.png"
    }
    else if (weatherType.textContent == 'Thunderstorm') {
        icon.src = "Weather_Type_Icons/thunder_6636103.png"

    }


}

//this function will show the weather report of the city searched by the user
function ShowWeatherReport(weather) {

    if (weather.cod == "404" || (SearchInputBox.value).trim() == "") {
        SearchInputBox.value = "delhi"
        prompt("City Not Found", "Please enter a valid city name")
        throw new Error("City Not Found")
    }
  
    var searchinput = (SearchInputBox.value).trim().toLowerCase()
    var weathercity = weather.name.toLowerCase()

    if (historyfile.includes(weathercity) || historyfile.includes("")) {


    }
    else {
        historyfile.push(weathercity)
        localStorage.setItem("history", JSON.stringify(historyfile));
    }

    
  
    let windspeed = document.getElementById('windspeed')
    windspeed.innerText = "wind Speed - " + weather.wind.speed + " m/s"

    let city = document.getElementById('city')
    city.innerText = weather.name + "," + weather.sys.country

    let temperature = document.getElementById('temp')
    temperature.innerHTML = "Temperature " + (Math.round(weather.main.temp) - 273) + "<sup>0</sup>" + " C"

    let minMaxTemp = document.getElementById('min-max')
    minMaxTemp.innerHTML = "Min " + (Math.floor(weather.main.temp_min) - 273) + "<sup>0</sup>" + " C" + ", " + "Max " + (Math.ceil(weather.main.temp_max - 273)) + "<sup>0</sup>" + " C"

    let humidity = document.getElementById('humidity')
    humidity.innerHTML = "Humdity -  " + (weather.main.humidity) + "%"


    let weatherType = document.getElementById('weather')
    weatherType.innerText = (weather.weather[0].main)

    let coordinates = document.getElementById('lati')
    lati.innerText = "Latitude: " + Math.round((weather.coord.lat)) + "deg" + "," + " Longitude: " + Math.round((weather.coord.lon)) + "deg"


    let date = document.getElementById('date')
    let todaydate = new Date()
    date.innerText = dateManage(todaydate)

    button.addEventListener('click', () => {
        temperature.innerHTML = "Temperature " + (Math.round((Math.round(weather.main.temp) - 273) * (1.8) + 32)) + "<sup>0</sup>" + " F"
        minMaxTemp.innerHTML = "Min " + Math.round(((Math.floor(weather.main.temp_min) - 273) * (1.8) + 32)) + "<sup>0</sup>" + " F" + ", " + "Max " + Math.round(((Math.ceil(weather.main.temp_max) - 273) * (1.8) + 32)) + "<sup>0</sup>" + " F"

    })

    celcius.addEventListener('click', () => {
        temperature.innerHTML = "Temperature " + (Math.round(weather.main.temp) - 273) + "<sup>0</sup>" + " C"
        minMaxTemp.innerHTML = "Min " + (Math.floor(weather.main.temp_min) - 273) + "<sup>0</sup>" + " C" + ", " + "Max " + (Math.ceil(weather.main.temp_max - 273)) + "<sup>0</sup>" + " C"

    })


    if (weatherType.textContent == 'Clouds') {
        icon.src = "Weather_Type_Icons/cloud-sky_3222807.png"
    }


    else if (weatherType.textContent == 'Clear') {

        icon.src = "Weather_Type_Icons/clear_3304654.png"

    }
    else if (weatherType.textContent == 'Haze') {
        icon.src = "Weather_Type_Icons/haze_17993043.png"
    }
    else if (weatherType.textContent == 'Rain') {
        icon.src = "Weather_Type_Icons/rain_1888290.png"
    }
    else if (weatherType.textContent == 'Smoke') {
        icon.src = "Weather_Type_Icons/smoky.png"
    }
    else if (weatherType.textContent == 'Snow') {
        icon.src = "Weather_Type_Icons/snowy_6566033.png"
    }
    else if (weatherType.textContent == 'Sunny') {
        icon.src = "Weather_Type_Icons/sun_911035.png"
    }
    else if (weatherType.textContent == 'Thunderstorm') {
        icon.src = "Weather_Type_Icons/thunder_6636103.png"

    }

}

// this function displays the current date and day in readable format
function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let year = dateArg.getFullYear()
    let month = months[dateArg.getMonth()]
    let date = dateArg.getDate()
    let day = days[dateArg.getDay()]
    return `${date} ${month} (${day}),${year}`
}


//using local storage for stroing recent search values
//refresh the page to see the recent seatch values
//if location is entered twice,it will be regarded as duplicate and only will be displayed once.s

const opt = document.querySelector('#history')

for (let i = 0; i < historyfile.length; i++) {
    const option = document.createElement('option')
    option.value = historyfile[i]
    option.innerText = historyfile[i]
    opt.appendChild(option)
}


//this event listener implements the search histroy of the user to the UI.
//if the dropdown menu is clicked then appropriate weather data is displayed.
opt.addEventListener('click', (event) => {
    if (event.target.value === "history") {

        SearchInputBox.value = ""
    }
    else {
        SearchInputBox.value = event.target.value
        var searchval = (SearchInputBox.value).trim().toLowerCase()
        GetWeatherReport(searchval)
        futuredateval(searchval)
       
        document.getElementById('location-details').classList.replace('hidden', 'flex')
        document.getElementById('weatherprops').classList.replace('hidden', 'flex')
        document.getElementById('weather-status').classList.replace('hidden', 'flex')
        document.getElementById('buttons').classList.replace('hidden', 'flex')

    }

})

console.log(historyfile)


