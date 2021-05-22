const api = '266bc9f041dac74620ec31357e64028d';

const date = document.querySelector('.date');
const time = document.querySelector('.time');
const iconImg = document.querySelector('.icon');
const loc = document.querySelector('.location');
const tempC = document.querySelector('.temp');
const humid = document.querySelector('.humidity');
const press = document.querySelector('.pressure');
const desc = document.querySelector('.desc');
const windspeed = document.querySelector('.wind-speed');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const form = document.querySelector(".top-banner form");
/* Default Location */
const inputVal = 'mumbai';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api}&units=metric`;
fetchdata(url);

form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = document.querySelector('.city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api}&units=metric`;
    fetchdata(url);
});

window.addEventListener('load', () => {

    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            // Storing Longitude and Latitude in variables
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
            fetchdata(base);
        });
    }
});


function fetchdata(base) {
    fetch(base)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const { humidity, pressure, temp } = data.main;
            const place = data.name;
            const { description, icon } = data.weather[0];
            const { sunrise, sunset } = data.sys;
            const { speed } = data.wind;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const sunriseGMT = new Date(sunrise * 1000);
            const sunsetGMT = new Date(sunset * 1000);
            const d = new Date();
            iconImg.src = iconUrl;
            loc.textContent = `${place}`;
            desc.textContent = `${description}`;
            tempC.textContent = `${temp.toFixed(2)} °C`;
            humid.textContent = `${humidity} %`;
            press.textContent = `${pressure} hpa`;
            sunriseDOM.textContent = `${sunriseGMT.toLocaleTimeString()} AM`;
            sunsetDOM.textContent = `${sunsetGMT.toLocaleTimeString()} PM`;
            date.textContent = `${d.toLocaleDateString('en-US')}`;
            windspeed.textContent = `${speed} m/s`;
			document.querySelector('.city').value="";
        });
}



function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    time.textContent = h + ":" + m + ":" + s;
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}
startTime();
