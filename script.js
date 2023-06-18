// Cold Weather : background: linear-gradient(to right, rgb(53, 132, 228), rgb(50, 56, 203));
// Hot Weather : background: linear-gradient(to right, rgb(255, 120, 0), rgb(249, 240, 107));
// Regular: background: linear-gradient(to right, rgb(87, 227, 137), rgb(98, 160, 234));
// My API key: https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid=3f780dc80f35ddcbdcb3c1eae8bd4e7b
//Kelvin to Celsius: K = C + 273.15 || Kelvin to Fahrenheit: K − 273.15) × 9/5 + 32 = °F

// Get geolocation info from the user once page is loaded



window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDegree = document.querySelector(".temperature-degree");
    let description = document.querySelector(".description");
    let locationTimezone = document.querySelector(".location-timezone");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5af0402010e8536a0b40fe2d877f6858`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temp } = data.main;
                const { name } = data;
                const { main } = data.weather[0];
                temperatureDegree.textContent = `${((temp - 273.15).toFixed())}`;
                locationTimezone.textContent = name;
                description.textContent = main;
                
            });
        });
    } else {
        alert("I'm sorry, this website only works when you allow it to access your geolocation!");
    }


    
})
