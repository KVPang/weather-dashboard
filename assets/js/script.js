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
function futureForecast (data, city, weatherHTML) {
    console.log(data.daily);
    let dayContent = '<h3>Five day forecast</h3>';
    dayContent += '<div class="allFive row">';
    // var thisDay;
    var iconurl;
    console.log(data.daily);
    for(var i = 0; i<5; i++) {
        let thisDay = data.daily[i];
        dayContent += '<div class="day col-2">';
        iconurl = "http://openweathermap.org/img/w/" + thisDay.weather[0].icon + ".png";
        dayContent += dateString(thisDay.dt);
        dayContent += '<br><img src="'+iconurl+'" alt="icon">';
        dayContent += '<br>Temp: '+thisDay.temp.day+'&deg;F';
        dayContent += '<br>Wind: '+thisDay.wind_speed+' MPH';
        dayContent += '<br>Humidity: '+thisDay.humidity+' %';
        dayContent += '</div>';
    }
    dayContent += '</div><!-- /#allFive -->';
    console.log(dayContent);
    $('#w5forecast').html(dayContent);
    let weatherTotal = [city, weatherHTML, dayContent];
    weatherHistory.push(weatherTotal);
    localStorage.setItem('weatherHistory', JSON.stringify(weatherHistory));
    regenerateHistory();
}

function regenerateHistory() {
    let weatherHistoryString = localStorage.getItem('weatherHistory');
    let ulContents = '';
    weatherHistory = JSON.parse(weatherHistoryString);
    console.log(weatherHistory);
    for(var i=0; i < 10; i++) {
        if(weatherHistory[i] !== undefined) {
            ulContents += '<button class="btn btn-dark gb" onclick="retrieveHistory('+i+')">'+weatherHistory[i][0]+'</button><br>';
        }}
    $('#weatherHistory').html(ulContents);
}

// Date
function dateString (unix_timestamp) {
var dateString = moment.unix(unix_timestamp).format("MM/DD/YYYY");
return dateString;
}

