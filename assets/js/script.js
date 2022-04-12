// Weather API - URL
// API Key
// submit button = search
// display shows the current day's weather and date 
// UW index color coded 
// future weather conditions: 5 day forecast
// search history (save)

var apiKey = "ae7e404ca71637d851a35c1f1a195ed1";
var citySearch = JSON.parse(localStorage.getItem("pastSearch"))||[];
var day = moment().format("dddd");


// clicking submit button 
$("#btnSubmit").on("click", clickHandler)


function clickHandler (event) {
    event.preventDefault()
    var city = $("#userSearch").val();
    citySearch.push(city)
    localStorage.setItem("pastSearch",JSON.stringify(citySearch))
    var url = "http://api.openweathermap.org/geo/1.0/direct?q="+ city + "&appid=" + apiKey 
    fetch(url).then(function(response){
        return response.json()
    }).then(function(data){
        currentDayWeather(data[0].lat,data[0].lon)
    })
}

// current day weather
function currentDayWeather(lat,lon) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&units=imperial&appid=" + apiKey
    fetch(url).then(function(response){
        return response.json()
    }).then(function(data){
       console.log(data)
    })
}


//UV index


//5 day forecast 
function futureForecast () {

}

//local storage search history 