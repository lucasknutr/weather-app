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
    let tempDescription = document.querySelector(".description");
    let locationTimezone = document.querySelector(".location-timezone");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5af0402010e8536a0b40fe2d877f6858`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temp } = data.main;
                const { name } = data;
                const { description } = data.weather[0];
                let icon = data.weather[0].icon;
                let newIcon;

                temperatureDegree.textContent = `${((temp - 273.15).toFixed())}`;
                locationTimezone.textContent = name;
                tempDescription.textContent = description;

                // turn openweathermap icons into skycons
                if (icon === "01d") {
                    newIcon = "CLEAR_DAY";
                }
                if (icon === "01n") {
                    newIcon = "CLEAR_NIGHT";
                }
                if (icon === "02d") {
                    newIcon = "PARTLY_CLOUDY_DAY";
                }
                if (icon === "02n") {
                    newIcon = "PARTLY_CLOUDY_NIGHT";
                }
                if (icon === "03d" || icon === "O4d" || icon === "O3n" || icon === "04n") {
                    newIcon = "CLOUDY";
                }
                if (icon === "09d" || icon === "09n" || icon === "10d" || icon === "10n") { 
                    newIcon = "RAIN";
                }
                if (icon === "11d" || icon === "11n") { 
                    newIcon = "SLEET";
                }
                if (icon === "13d" || icon === "13n") { 
                    newIcon = "SNOW";
                }
                if (icon === "50d" || icon === "50n") { 
                    newIcon = "WIND";
                }

                console.log(newIcon);

                setIcons(newIcon, document.querySelector(".icon"));


            });
        });
    } else {
        alert("I'm sorry, this website only works when you allow it to access your geolocation!");
    }

    const setIcons = (icon, iconID) => {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }


    if (temperatureDegree.textContent > "25") {
        document.body.style.background = "linear-gradient(to right, rgb(255, 120, 0), rgb(249, 240, 107))";
    }

    if (25 > temperatureDegree.textContent > 10) {
        document.body.style.background = "linear-gradient(to right, rgb(87, 227, 137), rgb(98, 160, 234))";
    }

    if(temperatureDegree.textContent < 10) {
        document.body.style.background = "linear-gradient(to right, rgb(53, 132, 228), rgb(50, 56, 203))"
    }

    
})
