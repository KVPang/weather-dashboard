var apiKey = "ae7e404ca71637d851a35c1f1a195ed1";
var citySearch = JSON.parse(localStorage.getItem("pastSearch"))||[];
var day = moment().format("dddd");


// Clicking submit button 
$("#btnSubmit").on("click", clickHandler)


function clickHandler (event) {
    event.preventDefault()
    var city = $("#userSearch").val();
    citySearch.push(city)
    localStorage.setItem("pastSearch",JSON.stringify(citySearch))
    var url = "http://api.openweathermap.org/geo/1.0/direct?q="+ city + "&appid=" + apiKey ;
    fetch(url).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data);
        city = data[0].name;
        currentDayWeather(data[0].lat,data[0].lon,city)
    })
}

// Current day weather
function currentDayWeather(lat,lon,city) {
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&units=imperial&appid=" + apiKey
    fetch(url).then(function(response){
        return response.json()
    }).then(function(data){
       console.log(data)
       let todayDate = dateString(data.current.dt);
       let weatherHTML = '<span class="title">'+city+'</span> &nbsp; ('+ todayDate +')';
       let uviColor = 'red';
       if(data.current.uvi < 8) uviColor = 'orange';
       if(data.current.uvi < 6) uviColor = 'yellow';
       if(data.current.uvi < 3) uviColor = 'green';
       weatherHTML += '<div class="mainDay">Temp: '+data.current.temp+'&deg;F'
       +'<br>Wind: '+data.current.wind_speed+' MPH'
       +'<br>Humidity: '+data.current.humidity+'&nbsp;%'
       +'<br>UVI: '+'<span class="'+uviColor+'">'+data.current.uvi;

      $('#currentWeather').html(weatherHTML);
      $('#currentWeather').css('display', 'block');
      futureForecast(data, city, weatherHTML);
    })
}

// 5 day forecast 
function futureForecast () {
}

// Weather History


// Date
function dateString (unix_timestamp) {
var dateString = moment.unix(unix_timestamp).format("MM/DD/YYYY");
return dateString;
}

