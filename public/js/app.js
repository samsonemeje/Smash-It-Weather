// select elements id //
const nameValue = document.querySelector('#name');
const dateValue = document.querySelector('#date');
const timeValue = document.querySelector('#time');
const tempValue = document.querySelector('#temp');
const weatherValue = document.querySelector('#weather');

const inputField = document.querySelector('#input_field');
const form = document.querySelector('#form');

const weatherContent = document.querySelector('#weather_content');

let WeatherArray = JSON.parse(localStorage.getItem('weatherdata')) || [];

// function to get weather data //
const GetWeather = (Location) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${Location}&appid=f341c5aa8a6091cd451a8525cc820c84`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      WeatherArray.push(data);
      console.log(data);
      console.log(WeatherArray);
      localStorage.setItem('weatherdata', JSON.stringify(WeatherArray));
    })
    .catch((error) => {
      console.log(error);
    });
};

// function to submit the input form //
const handleSubmit = (e) => {
  e.preventDefault();

  GetWeather(inputField.value);

  console.log(inputField.value, 'I am submited');

  inputField.value = '';
};

form.addEventListener('submit', handleSubmit);
console.log(WeatherArray);
