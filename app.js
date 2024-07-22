const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";
const api_key = "6540f1253810cbc4dac09b2008776eab";

// Get city name from user input
const btn = document.querySelector('button');
const img1= document.querySelector('img');

btn.addEventListener('click', async (event) => {
  event.preventDefault();
    let inputVal =document.querySelector('input')
    const cityName = inputVal.value;
    if(cityName === ''){
      const msg = document.querySelector('.msg');
      msg.innerHTML = 'Enter City Name';
      return; // Exit the function if no city name is provided.  Return avoids executing the fetch request below.  Not a recommended approach in a real-world application, as it might lead to errors. You should implement a better UX for this scenario.  Here, it's used to prevent API call on each page load.
    }
    else{
    inputVal.value = '';
    try{
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${api_key}&units=metric`);
        if (!weatherResponse.ok) {
            throw new Error(`HTTP error! status: ${weatherResponse.status}`);
        }
        const weatherData = await weatherResponse.json();
        const msg = document.querySelector('.msg');
        const temp = document.querySelector('.temp')
        temp.innerHTML = `${weatherData.main.temp}°C`;
        msg.innerHTML = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        img1.src =  `https://openweathermap.org/img/wn/${icon}@2x.png`

      }
      catch(err){
        console.error('Error:', err);
        const msg = document.querySelector('.msg');
        msg.innerHTML = 'Enter Valid City';
      } 
    }

    

});
