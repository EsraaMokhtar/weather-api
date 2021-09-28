const  searchLocation = document.querySelector(".input-search");
const searchBtn = document.querySelector(".search-btn");
const countryName = document.querySelector(".country-name");
const today = document.querySelector(".today");
const dayOfMonth = document.querySelector(".day-month");
const afterNext = document.querySelector(".afterNext");
const nextDay = document.querySelector(".nextDay");

// function already run .........>>

function currentDate(){

    const date = new Date();

    const monthsName = ['January', 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'Novamber' , 'December'];

    const DaysName = ['Sunday' , 'Monday' , 'Tuesday' , 'Wedneday' , 'Thursday' , 'Friday' ,'Saturday'];

    const currentMonth = monthsName[date.getMonth()];

    const currentDay = DaysName[date.getDay()];

    const dayMonth = date.getDate();

    today.innerHTML = currentDay;

    dayOfMonth.innerHTML = dayMonth+ " " + currentMonth;

    nextDay.innerHTML = DaysName[date.getDay()+1];

    afterNext.innerHTML =  DaysName[date.getDay()+2];
}

currentDate();

async function afterSearch(){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cb654e5fa39d421fb19182716212509&q=cairo&days=3`);
    
    let data = await response.json();
    
        countryName.innerHTML = "Cairo";
    
         fillDataOfWeather(data)
}
    
afterSearch();
    
// ........................>>

// search function *********>

async function search(location){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cb654e5fa39d421fb19182716212509&q=${location}&days=3`);

    if(response.ok != true){
        console.log("error");
        return;
    }

    let data = await response.json();

    let country = data.location.name;

    countryName.innerHTML = country;

    fillDataOfWeather(data);

}

searchBtn.addEventListener('click',function(){
    let location = searchLocation.value; 
    search(location);

});

// ***********>>

// pull the data from api 

function fillDataOfWeather(data){

// the day weather
fillCurrentDay(data);

// next day weather
fillNextDay(data);

// after next day weather
fillAfterNextDay(data);

}

// the day weather
function fillCurrentDay(data){
        let tempCel = data.current.temp_c;
    
        const dayTepm = document.querySelector(".dayTepm");
    
        dayTepm.innerHTML = `${tempCel}<sup>o</sup> C`;
    
        const dayAvgTemp = document.querySelector(".dayAvgTemp");
    
        let tempAvgCel = data.forecast.forecastday[0].day.avgtemp_c;
    
        dayAvgTemp.innerHTML = `${tempAvgCel}<sup>o</sup>`;
    
        const dayCast = document.querySelector(".dayCast");
    
        let cast = data.forecast.forecastday[0].day.condition.text;
    
        dayCast.innerHTML = cast;
    
        const iconDayCast = document.querySelector(".iconDayCast");
    
        let iconCast = data.forecast.forecastday[0].day.condition.icon;
    
        iconDayCast.src = `http:${iconCast}`;
    
        const humidity = document.querySelector(".humidity");
    
        humidity.innerHTML = data.current.humidity ;
    
        const wind = document.querySelector(".wind");
    
        wind.innerHTML = data.current.wind_kph;
    
        const compass = document.querySelector(".compass");
    
        compass.innerHTML = data.current.wind_dir;
}

// next day weather
function fillNextDay(data){
    
        const nextTemp = document.querySelector(".nextTemp");
    
        let tempNext = data.forecast.forecastday[1].hour[0].temp_c;
    
        nextTemp.innerHTML = `${tempNext}<sup>o</sup> C`;
    
        const nextAvgTemp = document.querySelector(".nextAvgTemp");
    
        let tempAvgNext = data.forecast.forecastday[1].day.avgtemp_c;
    
        nextAvgTemp.innerHTML = `${tempAvgNext}<sup>o</sup>`;
    
        const nextCast = document.querySelector(".nextCast");
    
        let nexCast = data.forecast.forecastday[1].day.condition.text;
    
        nextCast.innerHTML = nexCast;
    
        const iconNextCast = document.querySelector(".iconNextCast");
    
        let iconNexCast = data.forecast.forecastday[1].day.condition.icon;
    
        iconNextCast.src  =`http:${iconNexCast}` ;
}

// after next day weather
function fillAfterNextDay(data){
           
        const afterNextTemp = document.querySelector(".afterNextTemp");
    
        let tempAftNext = data.forecast.forecastday[2].hour[0].temp_c;
    
        afterNextTemp.innerHTML = `${tempAftNext}<sup>o</sup> C`;
    
        const afterNextAvgTemp = document.querySelector(".afterNextAvgTemp");
    
        let tempAvgAftNext = data.forecast.forecastday[2].day.avgtemp_c;
    
        afterNextAvgTemp.innerHTML = `${tempAvgAftNext}<sup>o</sup>`;
    
        const aftNextCast = document.querySelector(".aftNextCast");
    
        let aftNexCast = data.forecast.forecastday[2].day.condition.text;
    
        aftNextCast.innerHTML = aftNexCast;
    
        const iconAftNextCast = document.querySelector(".iconAftNextCast");
    
        let iconAftNexCast = data.forecast.forecastday[2].day.condition.icon;
    
        iconAftNextCast.src = `http:${iconAftNexCast}`;
}
    

