
let searchLocation = document.querySelector(".input-search"),
    // searchBtn = document.querySelector(".search-btn"),
    countryName = document.querySelector(".country-name"),
    today = document.querySelector(".today"),
    dayOfMonth = document.querySelector(".day-month"),
    dayTepm = document.querySelector(".dayTepm"),
    dayAvgTemp = document.querySelector(".dayAvgTemp"),
    dayCast = document.querySelector(".dayCast"),
    iconDayCast = document.querySelector(".iconDayCast"),
    humidity = document.querySelector(".humidity"),
    wind = document.querySelector(".wind"),
    compass = document.querySelector(".compass"),
    currentCity = "Cairo",
    data,
    date = new Date(),
    monthsName = ['January', 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'Novamber' , 'December'],
    DaysName = ['Sunday' , 'Monday' , 'Tuesday' , 'Wedneday' , 'Thursday' , 'Friday' ,'Saturday'];


    // next day var
let nextDay = document.querySelector(".nextDay"),
    nextTemp = document.querySelector(".nextTemp");
    nextAvgTemp = document.querySelector(".nextAvgTemp"),
    nextCast = document.querySelector(".nextCast"),
    iconNextCast = document.querySelector(".iconNextCast");

    // after next day var
let  afterNext = document.querySelector(".afterNext"),
    afterNextTemp = document.querySelector(".afterNextTemp"),
    afterNextAvgTemp = document.querySelector(".afterNextAvgTemp"),
    aftNextCast = document.querySelector(".aftNextCast"),
    iconAftNextCast = document.querySelector(".iconAftNextCast");


    //Get Data from API:
async function getWeatherData(currentCity){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=848e4c9efef048e494f100521210205&q=${currentCity}&days=3&aqi=no&alerts=no`);
    data = await response.json();

    countryName.innerHTML = data.location.name;
    displayCurrentDate();
    displayNextDay();
    displayAfterNextDay();
};


function displayCurrentDate(){

    today.innerHTML = DaysName[date.getDay()];

    dayOfMonth.innerHTML = date.getDate() + " " +  monthsName[date.getMonth()];

    dayTepm.innerHTML = `${data.current.temp_c}<sup>o</sup> C`;

    dayAvgTemp.innerHTML = `${ data.forecast.forecastday[0].day.avgtemp_c}<sup>o</sup>`;

    dayCast.innerHTML = data.forecast.forecastday[0].day.condition.text;

    iconDayCast.src = `http:${data.forecast.forecastday[0].day.condition.icon}`;

    humidity.innerHTML = data.current.humidity ;

    wind.innerHTML = data.current.wind_kph;

    compass.innerHTML = data.current.wind_dir;
}

    //Next Day 
function getNextDays(nextDateApi) {
    let dayNow = new Date(nextDateApi);
    return DaysName[dayNow.getDay()];
 };

    //Display Next Day Data:
function displayNextDay(){
 
        let nextDateApi = data.forecast.forecastday[1].date;

        nextDay.innerHTML = getNextDays(nextDateApi);
    
        nextTemp.innerHTML = `${data.forecast.forecastday[1].hour[0].temp_c}<sup>o</sup> C`;
    
        nextAvgTemp.innerHTML = `${data.forecast.forecastday[1].day.avgtemp_c}<sup>o</sup>`;
    
        nextCast.innerHTML = data.forecast.forecastday[1].day.condition.text;
    
        iconNextCast.src  =`http:${data.forecast.forecastday[1].day.condition.icon}` ;
        
};


//Display after Next Day Data:
function displayAfterNextDay(){
 
    let nextDateApi = data.forecast.forecastday[2].date;

    afterNext.innerHTML = getNextDays(nextDateApi);


    afterNextTemp.innerHTML = `${data.forecast.forecastday[2].hour[0].temp_c}<sup>o</sup> C`;

    afterNextAvgTemp.innerHTML = `${data.forecast.forecastday[2].day.avgtemp_c}<sup>o</sup>`;

    aftNextCast.innerHTML =  data.forecast.forecastday[2].day.condition.text;

    iconAftNextCast.src = `http:${data.forecast.forecastday[2].day.condition.icon}`;

};

// searchBtn.addEventListener('click',function(){
//     let location = searchLocation.value; 
//     getWeatherData(location);

// });

searchLocation.addEventListener("keyup", function() {
    let location = searchLocation.value;
    getWeatherData(location);
});

//Onload Calling Function:
getWeatherData(currentCity);

