const locationSpan = document.getElementById("LocationSpan");
const currentLocationBtn = document.getElementById("currentLocationBtn");
const actualTpmTextDiv = document.getElementById("actualTpmTextDiv");
const feelsLikeTpmTextDiv = document.getElementById("feelsLikeTpmTextDiv");
const weatherDescriptionDiv = document.getElementById("weatherDescriptionDiv");
const cloudCoverDiv = document.getElementById("cloudCoverDiv");
const pressureDiv = document.getElementById("pressureDiv");
const windDirectionDiv = document.getElementById("windDirectionDiv");
const userInput = document.getElementById("userInput");
const searchBtn = document.getElementById("searchBtn");
const windSpeedDiv = document.getElementById("windSpeedDiv");
const maxTempDiv = document.getElementById("maxTempDiv");
const minTempDiv = document.getElementById("minTempDiv");
const sunriseDiv = document.getElementById("sunriseDiv");
const sunsetDiv = document.getElementById("sunsetDiv");
const humidityDiv = document.getElementById("humidityDiv");
const visibilityDiv = document.getElementById("visibilityDiv");
const cloudsDiv = document.getElementById("cloudsDiv");
const forecastContainer = document.getElementById("forecastContainer");
const forecastLodingDIv = document.getElementById("forecastLodingDIv");
const bengaluruBtn = document.getElementById("BengaluruBtn");
const newYorkBtn = document.getElementById("NewYorkBtn");
const mumbaiBtn = document.getElementById("MumbaiBtn");
const londonBtn = document.getElementById("LondonBtn");
const delhiBtn = document.getElementById("DelhiBtn");
const inputSearchSection = document.getElementById("inputSearchSection");

let actalTpm;
let feelsLikeTpm;
let maxTemp;
let minTemp;

function dropdownDisplay() {
  const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (recentCities.length > 0) {
    const dropdown = document.getElementById("dropdown");
    if (dropdown) {
      inputSearchSection.removeChild(dropdown);
    }
    const select = document.createElement("select");
    select.classList =
      "w-[100px] h-[40px] rounded-md cursor-pointer outline-none";
    select.id = "dropdown";
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Recent searches";
    select.appendChild(defaultOption);

    recentCities.forEach((ele) => {
      const option = document.createElement("option");
      option.value = ele;
      option.textContent = ele;
      select.appendChild(option);
    });
    inputSearchSection.insertBefore(select, searchBtn);
    select.addEventListener("change", () => {
      const city = select.value.trim();
      if (city !== "" && city !== "Recent searches") {
        locationSpan.textContent = "Loading...";
        actualTpmTextDiv.textContent = "Loading...";
        feelsLikeTpmTextDiv.textContent = "Loading...";
        weatherDescriptionDiv.textContent = "Loading...";
        cloudCoverDiv.textContent = "Loading...";
        pressureDiv.textContent = "Loading...";
        windDirectionDiv.textContent = "Loading...";
        windSpeedDiv.textContent = "Loading...";
        maxTempDiv.textContent = "Loading...";
        minTempDiv.textContent = "Loading...";
        sunriseDiv.textContent = "Loading...";
        sunsetDiv.textContent = "Loading...";
        humidityDiv.textContent = "Loading...";
        visibilityDiv.textContent = "Loading...";
        cloudsDiv.textContent = "Loading...";
        getWeatherReport(city).then((res) => {
          locationSpan.textContent = res.name
            ? `${res.name} ,`
            : `Error : ${res.message}`;
          locationSpan.style.color = res.name ? "" : "red";
          actalTpm = parseInt(res?.main?.temp) - 273.15;
          const actalTpminCelcius = actalTpm.toFixed(2);
          feelsLikeTpm = parseInt(res?.main?.feels_like) - 273.15;
          const feelsLikeTpminCelcius = feelsLikeTpm.toFixed(2);

          maxTemp = parseInt(res.main.temp_max) - 273.15;
          const maxTempinCelcius = maxTemp.toFixed(2);
          minTemp = parseInt(res.main.temp_min) - 273.15;
          const minTempinCelcius = minTemp.toFixed(2);
          /* Sunrise Time calculation */
          const sunriseTime = function () {
            const date = new Date(res?.sys?.sunrise * 1000);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const seconds = "0" + date.getSeconds();
            const formattedTime =
              hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
            return formattedTime;
          };
          /* Sunrise Time calculation */

          /* Sunset Time calculation */
          const sunsetTime = function () {
            const date = new Date(res?.sys?.sunset * 1000);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const seconds = "0" + date.getSeconds();
            const formattedTime =
              hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
            return formattedTime;
          };
          /* Sunset Time calculation */

          const visibilityInKm = parseInt(res?.visibility) / 1000;
          const visibilityFixed = visibilityInKm.toFixed(2);

          actualTpmTextDiv.textContent = res?.main?.temp
            ? `${actalTpminCelcius} °C`
            : `Error : ${res?.message}`;
          feelsLikeTpmTextDiv.textContent = res?.main?.feels_like
            ? `Feels like, ${feelsLikeTpminCelcius} °C`
            : `Error : ${res?.message}`;
          weatherDescriptionDiv.textContent = res?.main?.feels_like
            ? `${res?.weather[0]?.description}`
            : `Error : ${res?.message}`;
          cloudCoverDiv.textContent = res?.clouds?.all
            ? `${res?.clouds?.all} %`
            : `Error : ${res?.message}`;
          pressureDiv.textContent = res?.main?.pressure
            ? `${res?.main?.pressure} mb`
            : `Error : ${res?.message}`;
          windDirectionDiv.textContent = res?.wind?.deg
            ? `${res?.wind?.deg} °`
            : `Error : ${res?.message}`;

          windSpeedDiv.textContent = res.wind.speed
            ? `${res.wind.speed} kmph`
            : `Error : ${res.message}`;
          maxTempDiv.textContent = res.main.temp_max
            ? `${maxTempinCelcius} °C`
            : `Error : ${res.message}`;
          minTempDiv.textContent = res.main.temp_min
            ? `${minTempinCelcius} °C`
            : `Error : ${res.message}`;
          sunriseDiv.textContent = res.sys.sunrise
            ? `${sunriseTime()}`
            : `Error : ${res.message}`;
          sunsetDiv.textContent = res.sys.sunset
            ? `${sunsetTime()}`
            : `Error : ${res.message}`;
          humidityDiv.textContent = res.main.humidity
            ? `${res.main.humidity} %`
            : `Error : ${res.message}`;
          visibilityDiv.textContent = res.visibility
            ? `${visibilityFixed} km`
            : `Error : ${res.message}`;
          cloudsDiv.textContent = res?.clouds?.all
            ? `${res?.clouds?.all} %`
            : `Error : ${res.message}`;
        });
        getForecastData(city).then((res) => {
          forecastLodingDIv.textContent = "";
          forecastContainer.innerHTML = "";
          if (res.cod == 200) {
            forecastLodingDIv.style.display = "none";
            res.list.forEach((ele) => {
              const divCard = document.createElement("div");
              divCard.classList =
                "min-w-[200px] h-[90%] bg-white rounded flex shadow-gray-500 shadow-lg p-3 flex-col gap-2 justify-center items-center";
              const dateDiv = document.createElement("div");
              dateDiv.textContent = new Date(
                ele.dt * 1000
              ).toLocaleDateString();
              const image = document.createElement("img");
              image.src = "./assets/Images/cloud2.png";
              image.alt = "Icon";
              const tempDiv = document.createElement("div");
              actalTpm = parseInt(ele.main.temp) - 273.15;
              const actalTpminCelcius = actalTpm.toFixed(2);
              tempDiv.textContent = `Temp : ${actalTpminCelcius} °C`;
              const windDiv = document.createElement("div");
              windDiv.textContent = `Wind speed : ${ele.wind.speed} km`;
              const humidDiv = document.createElement("div");
              humidDiv.textContent = `Humidity : ${ele.main.humidity} %`;
              divCard.appendChild(dateDiv);
              divCard.appendChild(image);
              divCard.appendChild(tempDiv);
              divCard.appendChild(windDiv);
              divCard.appendChild(humidDiv);
              forecastContainer.appendChild(divCard);
            });
          } else {
            forecastLodingDIv.textContent = "Error fetching data";
            forecastLodingDIv.style.color = "red";
          }
          // console.log(res)
        });
      }
      // console.log(dropdown.value);
    });
  }
}
const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
if (recentCities.length > 0) {
  dropdownDisplay();
}
/* current location button click event listener */
currentLocationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    isGeolocationAllowed()
      .then((allowed) => {
        if (allowed) {
          forecastContainer.innerHTML = "";
          navigator.geolocation.getCurrentPosition((position) => {
            locationSpan.textContent = "Loading...";
            actualTpmTextDiv.textContent = "Loading...";
            feelsLikeTpmTextDiv.textContent = "Loading...";
            weatherDescriptionDiv.textContent = "Loading...";
            cloudCoverDiv.textContent = "Loading...";
            pressureDiv.textContent = "Loading...";
            windDirectionDiv.textContent = "Loading...";
            windSpeedDiv.textContent = "Loading...";
            maxTempDiv.textContent = "Loading...";
            minTempDiv.textContent = "Loading...";
            sunriseDiv.textContent = "Loading...";
            sunsetDiv.textContent = "Loading...";
            humidityDiv.textContent = "Loading...";
            visibilityDiv.textContent = "Loading...";
            cloudsDiv.textContent = "Loading...";
            // Get weather data using geolocation
            getWeatherReportBYCoordinates(
              position.coords.latitude,
              position.coords.longitude
            ).then((res) => {
              locationSpan.textContent = res.name
                ? `${res.name} ,`
                : `Error : ${res.message}`;

              actalTpm = parseInt(res.main.temp) - 273.15;
              const actalTpminCelcius = actalTpm.toFixed(2);
              feelsLikeTpm = parseInt(res.main.feels_like) - 273.15;
              const feelsLikeTpminCelcius = feelsLikeTpm.toFixed(2);

              maxTemp = parseInt(res.main.temp_max) - 273.15;
              const maxTempinCelcius = maxTemp.toFixed(2);
              minTemp = parseInt(res.main.temp_min) - 273.15;
              const minTempinCelcius = minTemp.toFixed(2);
              /* Sunrise Time calculation */
              const sunriseTime = function () {
                const date = new Date(res?.sys?.sunrise * 1000);
                const hours = date.getHours();
                const minutes = "0" + date.getMinutes();
                const seconds = "0" + date.getSeconds();
                const formattedTime =
                  hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
                return formattedTime;
              };
              /* Sunrise Time calculation */

              /* Sunset Time calculation */
              const sunsetTime = function () {
                const date = new Date(res?.sys?.sunset * 1000);
                const hours = date.getHours();
                const minutes = "0" + date.getMinutes();
                const seconds = "0" + date.getSeconds();
                const formattedTime =
                  hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
                return formattedTime;
              };
              /* Sunset Time calculation */

              const visibilityInKm = parseInt(res?.visibility) / 1000;
              const visibilityFixed = visibilityInKm.toFixed(2);

              actualTpmTextDiv.textContent = res.main.temp
                ? `${actalTpminCelcius} °C`
                : `Error : ${res.message}`;
              feelsLikeTpmTextDiv.textContent = res.main.feels_like
                ? `Feels like, ${feelsLikeTpminCelcius} °C`
                : `Error : ${res.message}`;
              weatherDescriptionDiv.textContent = res.weather[0].description
                ? `${res.weather[0].description}`
                : `Error : ${res.message}`;
              cloudCoverDiv.textContent = res.clouds.all
                ? `${res.clouds.all} %`
                : `Error : ${res.message}`;
              pressureDiv.textContent = res.main.pressure
                ? `${res.main.pressure} mb`
                : `Error : ${res.message}`;
              windDirectionDiv.textContent = res.wind.deg
                ? `${res.wind.deg} °`
                : `Error : ${res.message}`;

              windSpeedDiv.textContent = res.wind.speed
                ? `${res.wind.speed} kmph`
                : `Error : ${res.message}`;
              maxTempDiv.textContent = res.main.temp_max
                ? `${maxTempinCelcius} °C`
                : `Error : ${res.message}`;
              minTempDiv.textContent = res.main.temp_min
                ? `${minTempinCelcius} °C`
                : `Error : ${res.message}`;
              sunriseDiv.textContent = res.sys.sunrise
                ? `${sunriseTime()}`
                : `Error : ${res.message}`;
              sunsetDiv.textContent = res.sys.sunset
                ? `${sunsetTime()}`
                : `Error : ${res.message}`;
              humidityDiv.textContent = res.main.humidity
                ? `${res.main.humidity} %`
                : `Error : ${res.message}`;
              visibilityDiv.textContent = res.visibility
                ? `${visibilityFixed} km`
                : `Error : ${res.message}`;
              cloudsDiv.textContent = res?.clouds?.all
                ? `${res?.clouds?.all} %`
                : `Error : ${res.message}`;

              //   console.log(res);
              //   console.log(position.coords.latitude, position.coords.longitude);
            });
            getForecastReportBYCoordinates(
              position.coords.latitude,
              position.coords.longitude
            ).then((res) => {
              forecastLodingDIv.textContent = "";
              if (res.cod == 200) {
                forecastLodingDIv.style.display = "none";
                res.list.forEach((ele) => {
                  const divCard = document.createElement("div");
                  divCard.classList =
                    "min-w-[200px] h-[90%] bg-white rounded flex shadow-gray-500 shadow-lg p-3 flex-col gap-2 justify-center items-center";
                  const dateDiv = document.createElement("div");
                  dateDiv.textContent = new Date(
                    ele.dt * 1000
                  ).toLocaleDateString();
                  const image = document.createElement("img");
                  image.src = "./assets/Images/cloud2.png";
                  image.alt = "Icon";
                  const tempDiv = document.createElement("div");
                  actalTpm = parseInt(ele.main.temp) - 273.15;
                  const actalTpminCelcius = actalTpm.toFixed(2);
                  tempDiv.textContent = `Temp : ${actalTpminCelcius} °C`;
                  const windDiv = document.createElement("div");
                  windDiv.textContent = `Wind speed : ${ele.wind.speed} km`;
                  const humidDiv = document.createElement("div");
                  humidDiv.textContent = `Humidity : ${ele.main.humidity} %`;
                  divCard.appendChild(dateDiv);
                  divCard.appendChild(image);
                  divCard.appendChild(tempDiv);
                  divCard.appendChild(windDiv);
                  divCard.appendChild(humidDiv);
                  forecastContainer.appendChild(divCard);
                });
              } else {
                forecastLodingDIv.textContent = "Error fetching data";
                forecastLodingDIv.style.color = "red";
              }
              // console.log(res)
            });
          });
        } else {
          alert("Please allow location");
        }
      })
      .catch((error) => {
        alert("Error checking geolocation:", error);
      });
  } else {
    alert("Geolocation is not supported by browser");
  }
});
/* current location button click event listener */

/* cheking the location status */
function isGeolocationAllowed() {
  return new Promise((resolve, reject) => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((status) => {
        if (status.state === "granted") {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
/* cheking the location status */

// Get weather data using geolocation
async function getWeatherReportBYCoordinates(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aaab9223e458518b5949e5298b6c8f99`
    );
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    return err;
  }
}
// Get weather data using geolocation

/* search Button click event listener */
searchBtn.addEventListener("click", () => {
  let city = userInput.value;
  if (city.trim().length) {
    forecastContainer.innerHTML = "";
    const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    if (!recentCities.includes(city)) {
      recentCities.push(city);
    }
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
    dropdownDisplay();
    locationSpan.textContent = "Loading...";
    actualTpmTextDiv.textContent = "Loading...";
    feelsLikeTpmTextDiv.textContent = "Loading...";
    weatherDescriptionDiv.textContent = "Loading...";
    cloudCoverDiv.textContent = "Loading...";
    pressureDiv.textContent = "Loading...";
    windDirectionDiv.textContent = "Loading...";
    windSpeedDiv.textContent = "Loading...";
    maxTempDiv.textContent = "Loading...";
    minTempDiv.textContent = "Loading...";
    sunriseDiv.textContent = "Loading...";
    sunsetDiv.textContent = "Loading...";
    humidityDiv.textContent = "Loading...";
    visibilityDiv.textContent = "Loading...";
    cloudsDiv.textContent = "Loading...";
    getWeatherReport(city).then((res) => {
      locationSpan.textContent = res.name
        ? `${res.name} ,`
        : `Error : ${res.message}`;
      locationSpan.style.color = res.name ? "" : "red";
      actalTpm = parseInt(res?.main?.temp) - 273.15;
      const actalTpminCelcius = actalTpm.toFixed(2);
      feelsLikeTpm = parseInt(res?.main?.feels_like) - 273.15;
      const feelsLikeTpminCelcius = feelsLikeTpm.toFixed(2);

      maxTemp = parseInt(res.main.temp_max) - 273.15;
      const maxTempinCelcius = maxTemp.toFixed(2);
      minTemp = parseInt(res.main.temp_min) - 273.15;
      const minTempinCelcius = minTemp.toFixed(2);
      /* Sunrise Time calculation */
      const sunriseTime = function () {
        const date = new Date(res?.sys?.sunrise * 1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        const formattedTime =
          hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
        return formattedTime;
      };
      /* Sunrise Time calculation */

      /* Sunset Time calculation */
      const sunsetTime = function () {
        const date = new Date(res?.sys?.sunset * 1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        const formattedTime =
          hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
        return formattedTime;
      };
      /* Sunset Time calculation */

      const visibilityInKm = parseInt(res?.visibility) / 1000;
      const visibilityFixed = visibilityInKm.toFixed(2);

      actualTpmTextDiv.textContent = res?.main?.temp
        ? `${actalTpminCelcius} °C`
        : `Error : ${res?.message}`;
      feelsLikeTpmTextDiv.textContent = res?.main?.feels_like
        ? `Feels like, ${feelsLikeTpminCelcius} °C`
        : `Error : ${res?.message}`;
      weatherDescriptionDiv.textContent = res?.main?.feels_like
        ? `${res?.weather[0]?.description}`
        : `Error : ${res?.message}`;
      cloudCoverDiv.textContent = res?.clouds?.all
        ? `${res?.clouds?.all} %`
        : `Error : ${res?.message}`;
      pressureDiv.textContent = res?.main?.pressure
        ? `${res?.main?.pressure} mb`
        : `Error : ${res?.message}`;
      windDirectionDiv.textContent = res?.wind?.deg
        ? `${res?.wind?.deg} °`
        : `Error : ${res?.message}`;

      windSpeedDiv.textContent = res.wind.speed
        ? `${res.wind.speed} kmph`
        : `Error : ${res.message}`;
      maxTempDiv.textContent = res.main.temp_max
        ? `${maxTempinCelcius} °C`
        : `Error : ${res.message}`;
      minTempDiv.textContent = res.main.temp_min
        ? `${minTempinCelcius} °C`
        : `Error : ${res.message}`;
      sunriseDiv.textContent = res.sys.sunrise
        ? `${sunriseTime()}`
        : `Error : ${res.message}`;
      sunsetDiv.textContent = res.sys.sunset
        ? `${sunsetTime()}`
        : `Error : ${res.message}`;
      humidityDiv.textContent = res.main.humidity
        ? `${res.main.humidity} %`
        : `Error : ${res.message}`;
      visibilityDiv.textContent = res.visibility
        ? `${visibilityFixed} km`
        : `Error : ${res.message}`;
      cloudsDiv.textContent = res?.clouds?.all
        ? `${res?.clouds?.all} %`
        : `Error : ${res.message}`;
    });
    getForecastData(city).then((res) => {
      forecastLodingDIv.textContent = "";
      if (res.cod == 200) {
        forecastLodingDIv.style.display = "none";
        res.list.forEach((ele) => {
          const divCard = document.createElement("div");
          divCard.classList =
            "min-w-[200px] h-[90%] bg-white rounded flex shadow-gray-500 shadow-lg p-3 flex-col gap-2 justify-center items-center";
          const dateDiv = document.createElement("div");
          dateDiv.textContent = new Date(ele.dt * 1000).toLocaleDateString();
          const image = document.createElement("img");
          image.src = "./assets/Images/cloud2.png";
          image.alt = "Icon";
          const tempDiv = document.createElement("div");
          actalTpm = parseInt(ele.main.temp) - 273.15;
          const actalTpminCelcius = actalTpm.toFixed(2);
          tempDiv.textContent = `Temp : ${actalTpminCelcius} °C`;
          const windDiv = document.createElement("div");
          windDiv.textContent = `Wind speed : ${ele.wind.speed} km`;
          const humidDiv = document.createElement("div");
          humidDiv.textContent = `Humidity : ${ele.main.humidity} %`;
          divCard.appendChild(dateDiv);
          divCard.appendChild(image);
          divCard.appendChild(tempDiv);
          divCard.appendChild(windDiv);
          divCard.appendChild(humidDiv);
          forecastContainer.appendChild(divCard);
        });
      } else {
        forecastLodingDIv.textContent = "Error fetching data";
        forecastLodingDIv.style.color = "red";
      }
      // console.log(res)
    });
  } else {
    alert("Please Enter a city name");
  }
  userInput.value = "";
});
/* search Button click event listener */

/* City Bengaluru  */
bengaluruBtn.addEventListener("click", () => {
  locationSpan.textContent = "Loading...";
  actualTpmTextDiv.textContent = "Loading...";
  feelsLikeTpmTextDiv.textContent = "Loading...";
  weatherDescriptionDiv.textContent = "Loading...";
  cloudCoverDiv.textContent = "Loading...";
  pressureDiv.textContent = "Loading...";
  windDirectionDiv.textContent = "Loading...";
  windSpeedDiv.textContent = "Loading...";
  maxTempDiv.textContent = "Loading...";
  minTempDiv.textContent = "Loading...";
  sunriseDiv.textContent = "Loading...";
  sunsetDiv.textContent = "Loading...";
  humidityDiv.textContent = "Loading...";
  visibilityDiv.textContent = "Loading...";
  cloudsDiv.textContent = "Loading...";
  getWeatherReport("Bengaluru").then((res) => {
    locationSpan.textContent = res.name
      ? `${res.name} ,`
      : `Error : ${res.message}`;
    locationSpan.style.color = res.name ? "" : "red";
    actalTpm = parseInt(res?.main?.temp) - 273.15;
    const actalTpminCelcius = actalTpm.toFixed(2);
    feelsLikeTpm = parseInt(res?.main?.feels_like) - 273.15;
    const feelsLikeTpminCelcius = feelsLikeTpm.toFixed(2);

    maxTemp = parseInt(res.main.temp_max) - 273.15;
    const maxTempinCelcius = maxTemp.toFixed(2);
    minTemp = parseInt(res.main.temp_min) - 273.15;
    const minTempinCelcius = minTemp.toFixed(2);
    /* Sunrise Time calculation */
    const sunriseTime = function () {
      const date = new Date(res?.sys?.sunrise * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    };
    /* Sunrise Time calculation */

    /* Sunset Time calculation */
    const sunsetTime = function () {
      const date = new Date(res?.sys?.sunset * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    };
    /* Sunset Time calculation */

    const visibilityInKm = parseInt(res?.visibility) / 1000;
    const visibilityFixed = visibilityInKm.toFixed(2);

    actualTpmTextDiv.textContent = res?.main?.temp
      ? `${actalTpminCelcius} °C`
      : `Error : ${res?.message}`;
    feelsLikeTpmTextDiv.textContent = res?.main?.feels_like
      ? `Feels like, ${feelsLikeTpminCelcius} °C`
      : `Error : ${res?.message}`;
    weatherDescriptionDiv.textContent = res?.main?.feels_like
      ? `${res?.weather[0]?.description}`
      : `Error : ${res?.message}`;
    cloudCoverDiv.textContent = res?.clouds?.all
      ? `${res?.clouds?.all} %`
      : `Error : ${res?.message}`;
    pressureDiv.textContent = res?.main?.pressure
      ? `${res?.main?.pressure} mb`
      : `Error : ${res?.message}`;
    windDirectionDiv.textContent = res?.wind?.deg
      ? `${res?.wind?.deg} °`
      : `Error : ${res?.message}`;

    windSpeedDiv.textContent = res.wind.speed
      ? `${res.wind.speed} kmph`
      : `Error : ${res.message}`;
    maxTempDiv.textContent = res.main.temp_max
      ? `${maxTempinCelcius} °C`
      : `Error : ${res.message}`;
    minTempDiv.textContent = res.main.temp_min
      ? `${minTempinCelcius} °C`
      : `Error : ${res.message}`;
    sunriseDiv.textContent = res.sys.sunrise
      ? `${sunriseTime()}`
      : `Error : ${res.message}`;
    sunsetDiv.textContent = res.sys.sunset
      ? `${sunsetTime()}`
      : `Error : ${res.message}`;
    humidityDiv.textContent = res.main.humidity
      ? `${res.main.humidity} %`
      : `Error : ${res.message}`;
    visibilityDiv.textContent = res.visibility
      ? `${visibilityFixed} km`
      : `Error : ${res.message}`;
    cloudsDiv.textContent = res?.clouds?.all
      ? `${res?.clouds?.all} %`
      : `Error : ${res.message}`;
  });
  getForecastData("Bengaluru").then((res) => {
    forecastLodingDIv.textContent = "";
    forecastContainer.innerHTML = "";
    if (res.cod == 200) {
      forecastLodingDIv.style.display = "none";
      res.list.forEach((ele) => {
        const divCard = document.createElement("div");
        divCard.classList =
          "min-w-[200px] h-[90%] bg-white rounded flex shadow-gray-500 shadow-lg p-3 flex-col gap-2 justify-center items-center";
        const dateDiv = document.createElement("div");
        dateDiv.textContent = new Date(ele.dt * 1000).toLocaleDateString();
        const image = document.createElement("img");
        image.src = "./assets/Images/cloud2.png";
        image.alt = "Icon";
        const tempDiv = document.createElement("div");
        actalTpm = parseInt(ele.main.temp) - 273.15;
        const actalTpminCelcius = actalTpm.toFixed(2);
        tempDiv.textContent = `Temp : ${actalTpminCelcius} °C`;
        const windDiv = document.createElement("div");
        windDiv.textContent = `Wind speed : ${ele.wind.speed} km`;
        const humidDiv = document.createElement("div");
        humidDiv.textContent = `Humidity : ${ele.main.humidity} %`;
        divCard.appendChild(dateDiv);
        divCard.appendChild(image);
        divCard.appendChild(tempDiv);
        divCard.appendChild(windDiv);
        divCard.appendChild(humidDiv);
        forecastContainer.appendChild(divCard);
      });
    } else {
      forecastLodingDIv.textContent = "Error fetching data";
      forecastLodingDIv.style.color = "red";
    }
  });
});
/* City Bengaluru  */

/* City New York  */
newYorkBtn.addEventListener("click", () => {
  locationSpan.textContent = "Loading...";
  actualTpmTextDiv.textContent = "Loading...";
  feelsLikeTpmTextDiv.textContent = "Loading...";
  weatherDescriptionDiv.textContent = "Loading...";
  cloudCoverDiv.textContent = "Loading...";
  pressureDiv.textContent = "Loading...";
  windDirectionDiv.textContent = "Loading...";
  windSpeedDiv.textContent = "Loading...";
  maxTempDiv.textContent = "Loading...";
  minTempDiv.textContent = "Loading...";
  sunriseDiv.textContent = "Loading...";
  sunsetDiv.textContent = "Loading...";
  humidityDiv.textContent = "Loading...";
  visibilityDiv.textContent = "Loading...";
  cloudsDiv.textContent = "Loading...";
  getWeatherReport("New York").then((res) => {
    locationSpan.textContent = res.name
      ? `${res.name} ,`
      : `Error : ${res.message}`;
    locationSpan.style.color = res.name ? "" : "red";
    actalTpm = parseInt(res?.main?.temp) - 273.15;
    const actalTpminCelcius = actalTpm.toFixed(2);
    feelsLikeTpm = parseInt(res?.main?.feels_like) - 273.15;
    const feelsLikeTpminCelcius = feelsLikeTpm.toFixed(2);

    maxTemp = parseInt(res.main.temp_max) - 273.15;
    const maxTempinCelcius = maxTemp.toFixed(2);
    minTemp = parseInt(res.main.temp_min) - 273.15;
    const minTempinCelcius = minTemp.toFixed(2);
    /* Sunrise Time calculation */
    const sunriseTime = function () {
      const date = new Date(res?.sys?.sunrise * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    };
    /* Sunrise Time calculation */

    /* Sunset Time calculation */
    const sunsetTime = function () {
      const date = new Date(res?.sys?.sunset * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    };
    /* Sunset Time calculation */

    const visibilityInKm = parseInt(res?.visibility) / 1000;
    const visibilityFixed = visibilityInKm.toFixed(2);

    actualTpmTextDiv.textContent = res?.main?.temp
      ? `${actalTpminCelcius} °C`
      : `Error : ${res?.message}`;
    feelsLikeTpmTextDiv.textContent = res?.main?.feels_like
      ? `Feels like, ${feelsLikeTpminCelcius} °C`
      : `Error : ${res?.message}`;
    weatherDescriptionDiv.textContent = res?.main?.feels_like
      ? `${res?.weather[0]?.description}`
      : `Error : ${res?.message}`;
    cloudCoverDiv.textContent = res?.clouds?.all
      ? `${res?.clouds?.all} %`
      : `Error : ${res?.message}`;
    pressureDiv.textContent = res?.main?.pressure
      ? `${res?.main?.pressure} mb`
      : `Error : ${res?.message}`;
    windDirectionDiv.textContent = res?.wind?.deg
      ? `${res?.wind?.deg} °`
      : `Error : ${res?.message}`;

    windSpeedDiv.textContent = res.wind.speed
      ? `${res.wind.speed} kmph`
      : `Error : ${res.message}`;
    maxTempDiv.textContent = res.main.temp_max
      ? `${maxTempinCelcius} °C`
      : `Error : ${res.message}`;
    minTempDiv.textContent = res.main.temp_min
      ? `${minTempinCelcius} °C`
      : `Error : ${res.message}`;
    sunriseDiv.textContent = res.sys.sunrise
      ? `${sunriseTime()}`
      : `Error : ${res.message}`;
    sunsetDiv.textContent = res.sys.sunset
      ? `${sunsetTime()}`
      : `Error : ${res.message}`;
    humidityDiv.textContent = res.main.humidity
      ? `${res.main.humidity} %`
      : `Error : ${res.message}`;
    visibilityDiv.textContent = res.visibility
      ? `${visibilityFixed} km`
      : `Error : ${res.message}`;
    cloudsDiv.textContent = res?.clouds?.all
      ? `${res?.clouds?.all} %`
      : `Error : ${res.message}`;
  });
  getForecastData("New York").then((res) => {
    forecastLodingDIv.textContent = "";
    forecastContainer.innerHTML = "";
    if (res.cod == 200) {
      forecastLodingDIv.style.display = "none";
      res.list.forEach((ele) => {
        const divCard = document.createElement("div");
        divCard.classList =
          "min-w-[200px] h-[90%] bg-white rounded flex shadow-gray-500 shadow-lg p-3 flex-col gap-2 justify-center items-center";
        const dateDiv = document.createElement("div");
        dateDiv.textContent = new Date(ele.dt * 1000).toLocaleDateString();
        const image = document.createElement("img");
        image.src = "./assets/Images/cloud2.png";
        image.alt = "Icon";
        const tempDiv = document.createElement("div");
        actalTpm = parseInt(ele.main.temp) - 273.15;
        const actalTpminCelcius = actalTpm.toFixed(2);
        tempDiv.textContent = `Temp : ${actalTpminCelcius} °C`;
        const windDiv = document.createElement("div");
        windDiv.textContent = `Wind speed : ${ele.wind.speed} km`;
        const humidDiv = document.createElement("div");
        humidDiv.textContent = `Humidity : ${ele.main.humidity} %`;
        divCard.appendChild(dateDiv);
        divCard.appendChild(image);
        divCard.appendChild(tempDiv);
        divCard.appendChild(windDiv);
        divCard.appendChild(humidDiv);
        forecastContainer.appendChild(divCard);
      });
    } else {
      forecastLodingDIv.textContent = "Error fetching data";
      forecastLodingDIv.style.color = "red";
    }
  });
});
/* City New York  */

/* City Mumbai  */
mumbaiBtn.addEventListener("click", () => {
  locationSpan.textContent = "Loading...";
  actualTpmTextDiv.textContent = "Loading...";
  feelsLikeTpmTextDiv.textContent = "Loading...";
  weatherDescriptionDiv.textContent = "Loading...";
  cloudCoverDiv.textContent = "Loading...";
  pressureDiv.textContent = "Loading...";
  windDirectionDiv.textContent = "Loading...";
  windSpeedDiv.textContent = "Loading...";
  maxTempDiv.textContent = "Loading...";
  minTempDiv.textContent = "Loading...";
  sunriseDiv.textContent = "Loading...";
  sunsetDiv.textContent = "Loading...";
  humidityDiv.textContent = "Loading...";
  visibilityDiv.textContent = "Loading...";
  cloudsDiv.textContent = "Loading...";
  getWeatherReport("Mumbai").then((res) => {
    locationSpan.textContent = res.name
      ? `${res.name} ,`
      : `Error : ${res.message}`;
    locationSpan.style.color = res.name ? "" : "red";
    actalTpm = parseInt(res?.main?.temp) - 273.15;
    const actalTpminCelcius = actalTpm.toFixed(2);
    feelsLikeTpm = parseInt(res?.main?.feels_like) - 273.15;
    const feelsLikeTpminCelcius = feelsLikeTpm.toFixed(2);

    maxTemp = parseInt(res.main.temp_max) - 273.15;
    const maxTempinCelcius = maxTemp.toFixed(2);
    minTemp = parseInt(res.main.temp_min) - 273.15;
    const minTempinCelcius = minTemp.toFixed(2);
    /* Sunrise Time calculation */
    const sunriseTime = function () {
      const date = new Date(res?.sys?.sunrise * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    };
    /* Sunrise Time calculation */

    /* Sunset Time calculation */
    const sunsetTime = function () {
      const date = new Date(res?.sys?.sunset * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    };
    /* Sunset Time calculation */

    const visibilityInKm = parseInt(res?.visibility) / 1000;
    const visibilityFixed = visibilityInKm.toFixed(2);

    actualTpmTextDiv.textContent = res?.main?.temp
      ? `${actalTpminCelcius} °C`
      : `Error : ${res?.message}`;
    feelsLikeTpmTextDiv.textContent = res?.main?.feels_like
      ? `Feels like, ${feelsLikeTpminCelcius} °C`
      : `Error : ${res?.message}`;
    weatherDescriptionDiv.textContent = res?.main?.feels_like
      ? `${res?.weather[0]?.description}`
      : `Error : ${res?.message}`;
    cloudCoverDiv.textContent = res?.clouds?.all
      ? `${res?.clouds?.all} %`
      : `Error : ${res?.message}`;
    pressureDiv.textContent = res?.main?.pressure
      ? `${res?.main?.pressure} mb`
      : `Error : ${res?.message}`;
    windDirectionDiv.textContent = res?.wind?.deg
      ? `${res?.wind?.deg} °`
      : `Error : ${res?.message}`;

    windSpeedDiv.textContent = res.wind.speed
      ? `${res.wind.speed} kmph`
      : `Error : ${res.message}`;
    maxTempDiv.textContent = res.main.temp_max
      ? `${maxTempinCelcius} °C`
      : `Error : ${res.message}`;
    minTempDiv.textContent = res.main.temp_min
      ? `${minTempinCelcius} °C`
      : `Error : ${res.message}`;
    sunriseDiv.textContent = res.sys.sunrise
      ? `${sunriseTime()}`
      : `Error : ${res.message}`;
    sunsetDiv.textContent = res.sys.sunset
      ? `${sunsetTime()}`
      : `Error : ${res.message}`;
    humidityDiv.textContent = res.main.humidity
      ? `${res.main.humidity} %`
      : `Error : ${res.message}`;
    visibilityDiv.textContent = res.visibility
      ? `${visibilityFixed} km`
      : `Error : ${res.message}`;
    cloudsDiv.textContent = res?.clouds?.all
      ? `${res?.clouds?.all} %`
      : `Error : ${res.message}`;
  });
  getForecastData("Mumbai").then((res) => {
    forecastLodingDIv.textContent = "";
    forecastContainer.innerHTML = "";
    if (res.cod == 200) {
      forecastLodingDIv.style.display = "none";
      res.list.forEach((ele) => {
        const divCard = document.createElement("div");
        divCard.classList =
          "min-w-[200px] h-[90%] bg-white rounded flex shadow-gray-500 shadow-lg p-3 flex-col gap-2 justify-center items-center";
        const dateDiv = document.createElement("div");
        dateDiv.textContent = new Date(ele.dt * 1000).toLocaleDateString();
        const image = document.createElement("img");
        image.src = "./assets/Images/cloud2.png";
        image.alt = "Icon";
        const tempDiv = document.createElement("div");
        actalTpm = parseInt(ele.main.temp) - 273.15;
        const actalTpminCelcius = actalTpm.toFixed(2);
        tempDiv.textContent = `Temp : ${actalTpminCelcius} °C`;
        const windDiv = document.createElement("div");
        windDiv.textContent = `Wind speed : ${ele.wind.speed} km`;
        const humidDiv = document.createElement("div");
        humidDiv.textContent = `Humidity : ${ele.main.humidity} %`;
        divCard.appendChild(dateDiv);
        divCard.appendChild(image);
        divCard.appendChild(tempDiv);
        divCard.appendChild(windDiv);
        divCard.appendChild(humidDiv);
        forecastContainer.appendChild(divCard);
      });
    } else {
      forecastLodingDIv.textContent = "Error fetching data";
      forecastLodingDIv.style.color = "red";
    }
  });
});
/* City Mumbai  */

/* City London  */
londonBtn.addEventListener("click", () => {
  locationSpan.textContent = "Loading...";
  actualTpmTextDiv.textContent = "Loading...";
  feelsLikeTpmTextDiv.textContent = "Loading...";
  weatherDescriptionDiv.textContent = "Loading...";
  cloudCoverDiv.textContent = "Loading...";
  pressureDiv.textContent = "Loading...";
  windDirectionDiv.textContent = "Loading...";
  windSpeedDiv.textContent = "Loading...";
  maxTempDiv.textContent = "Loading...";
  minTempDiv.textContent = "Loading...";
  sunriseDiv.textContent = "Loading...";
  sunsetDiv.textContent = "Loading...";
  humidityDiv.textContent = "Loading...";
  visibilityDiv.textContent = "Loading...";
  cloudsDiv.textContent = "Loading...";
  getWeatherReport("London").then((res) => {
    locationSpan.textContent = res.name
      ? `${res.name} ,`
      : `Error : ${res.message}`;
    locationSpan.style.color = res.name ? "" : "red";
    actalTpm = parseInt(res?.main?.temp) - 273.15;
    const actalTpminCelcius = actalTpm.toFixed(2);
    feelsLikeTpm = parseInt(res?.main?.feels_like) - 273.15;
    const feelsLikeTpminCelcius = feelsLikeTpm.toFixed(2);

    maxTemp = parseInt(res.main.temp_max) - 273.15;
    const maxTempinCelcius = maxTemp.toFixed(2);
    minTemp = parseInt(res.main.temp_min) - 273.15;
    const minTempinCelcius = minTemp.toFixed(2);
    /* Sunrise Time calculation */
    const sunriseTime = function () {
      const date = new Date(res?.sys?.sunrise * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    };
    /* Sunrise Time calculation */

    /* Sunset Time calculation */
    const sunsetTime = function () {
      const date = new Date(res?.sys?.sunset * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    };
    /* Sunset Time calculation */

    const visibilityInKm = parseInt(res?.visibility) / 1000;
    const visibilityFixed = visibilityInKm.toFixed(2);

    actualTpmTextDiv.textContent = res?.main?.temp
      ? `${actalTpminCelcius} °C`
      : `Error : ${res?.message}`;
    feelsLikeTpmTextDiv.textContent = res?.main?.feels_like
      ? `Feels like, ${feelsLikeTpminCelcius} °C`
      : `Error : ${res?.message}`;
    weatherDescriptionDiv.textContent = res?.main?.feels_like
      ? `${res?.weather[0]?.description}`
      : `Error : ${res?.message}`;
    cloudCoverDiv.textContent = res?.clouds?.all
      ? `${res?.clouds?.all} %`
      : `Error : ${res?.message}`;
    pressureDiv.textContent = res?.main?.pressure
      ? `${res?.main?.pressure} mb`
      : `Error : ${res?.message}`;
    windDirectionDiv.textContent = res?.wind?.deg
      ? `${res?.wind?.deg} °`
      : `Error : ${res?.message}`;

    windSpeedDiv.textContent = res.wind.speed
      ? `${res.wind.speed} kmph`
      : `Error : ${res.message}`;
    maxTempDiv.textContent = res.main.temp_max
      ? `${maxTempinCelcius} °C`
      : `Error : ${res.message}`;
    minTempDiv.textContent = res.main.temp_min
      ? `${minTempinCelcius} °C`
      : `Error : ${res.message}`;
    sunriseDiv.textContent = res.sys.sunrise
      ? `${sunriseTime()}`
      : `Error : ${res.message}`;
    sunsetDiv.textContent = res.sys.sunset
      ? `${sunsetTime()}`
      : `Error : ${res.message}`;
    humidityDiv.textContent = res.main.humidity
      ? `${res.main.humidity} %`
      : `Error : ${res.message}`;
    visibilityDiv.textContent = res.visibility
      ? `${visibilityFixed} km`
      : `Error : ${res.message}`;
    cloudsDiv.textContent = res?.clouds?.all
      ? `${res?.clouds?.all} %`
      : `Error : ${res.message}`;
  });
  getForecastData("London").then((res) => {
    forecastLodingDIv.textContent = "";
    forecastContainer.innerHTML = "";
    if (res.cod == 200) {
      forecastLodingDIv.style.display = "none";
      res.list.forEach((ele) => {
        const divCard = document.createElement("div");
        divCard.classList =
          "min-w-[200px] h-[90%] bg-white rounded flex shadow-gray-500 shadow-lg p-3 flex-col gap-2 justify-center items-center";
        const dateDiv = document.createElement("div");
        dateDiv.textContent = new Date(ele.dt * 1000).toLocaleDateString();
        const image = document.createElement("img");
        image.src = "./assets/Images/cloud2.png";
        image.alt = "Icon";
        const tempDiv = document.createElement("div");
        actalTpm = parseInt(ele.main.temp) - 273.15;
        const actalTpminCelcius = actalTpm.toFixed(2);
        tempDiv.textContent = `Temp : ${actalTpminCelcius} °C`;
        const windDiv = document.createElement("div");
        windDiv.textContent = `Wind speed : ${ele.wind.speed} km`;
        const humidDiv = document.createElement("div");
        humidDiv.textContent = `Humidity : ${ele.main.humidity} %`;
        divCard.appendChild(dateDiv);
        divCard.appendChild(image);
        divCard.appendChild(tempDiv);
        divCard.appendChild(windDiv);
        divCard.appendChild(humidDiv);
        forecastContainer.appendChild(divCard);
      });
    } else {
      forecastLodingDIv.textContent = "Error fetching data";
      forecastLodingDIv.style.color = "red";
    }
  });
});
/* City London  */

/* City Delhi  */
delhiBtn.addEventListener("click", () => {
  locationSpan.textContent = "Loading...";
  actualTpmTextDiv.textContent = "Loading...";
  feelsLikeTpmTextDiv.textContent = "Loading...";
  weatherDescriptionDiv.textContent = "Loading...";
  cloudCoverDiv.textContent = "Loading...";
  pressureDiv.textContent = "Loading...";
  windDirectionDiv.textContent = "Loading...";
  windSpeedDiv.textContent = "Loading...";
  maxTempDiv.textContent = "Loading...";
  minTempDiv.textContent = "Loading...";
  sunriseDiv.textContent = "Loading...";
  sunsetDiv.textContent = "Loading...";
  humidityDiv.textContent = "Loading...";
  visibilityDiv.textContent = "Loading...";
  cloudsDiv.textContent = "Loading...";
  getWeatherReport("Delhi").then((res) => {
    locationSpan.textContent = res.name
      ? `${res.name} ,`
      : `Error : ${res.message}`;
    locationSpan.style.color = res.name ? "" : "red";
    actalTpm = parseInt(res?.main?.temp) - 273.15;
    const actalTpminCelcius = actalTpm.toFixed(2);
    feelsLikeTpm = parseInt(res?.main?.feels_like) - 273.15;
    const feelsLikeTpminCelcius = feelsLikeTpm.toFixed(2);

    maxTemp = parseInt(res.main.temp_max) - 273.15;
    const maxTempinCelcius = maxTemp.toFixed(2);
    minTemp = parseInt(res.main.temp_min) - 273.15;
    const minTempinCelcius = minTemp.toFixed(2);
    /* Sunrise Time calculation */
    const sunriseTime = function () {
      const date = new Date(res?.sys?.sunrise * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    };
    /* Sunrise Time calculation */

    /* Sunset Time calculation */
    const sunsetTime = function () {
      const date = new Date(res?.sys?.sunset * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
      return formattedTime;
    };
    /* Sunset Time calculation */

    const visibilityInKm = parseInt(res?.visibility) / 1000;
    const visibilityFixed = visibilityInKm.toFixed(2);

    actualTpmTextDiv.textContent = res?.main?.temp
      ? `${actalTpminCelcius} °C`
      : `Error : ${res?.message}`;
    feelsLikeTpmTextDiv.textContent = res?.main?.feels_like
      ? `Feels like, ${feelsLikeTpminCelcius} °C`
      : `Error : ${res?.message}`;
    weatherDescriptionDiv.textContent = res?.main?.feels_like
      ? `${res?.weather[0]?.description}`
      : `Error : ${res?.message}`;
    cloudCoverDiv.textContent = res?.clouds?.all
      ? `${res?.clouds?.all} %`
      : `Error : ${res?.message}`;
    pressureDiv.textContent = res?.main?.pressure
      ? `${res?.main?.pressure} mb`
      : `Error : ${res?.message}`;
    windDirectionDiv.textContent = res?.wind?.deg
      ? `${res?.wind?.deg} °`
      : `Error : ${res?.message}`;

    windSpeedDiv.textContent = res.wind.speed
      ? `${res.wind.speed} kmph`
      : `Error : ${res.message}`;
    maxTempDiv.textContent = res.main.temp_max
      ? `${maxTempinCelcius} °C`
      : `Error : ${res.message}`;
    minTempDiv.textContent = res.main.temp_min
      ? `${minTempinCelcius} °C`
      : `Error : ${res.message}`;
    sunriseDiv.textContent = res.sys.sunrise
      ? `${sunriseTime()}`
      : `Error : ${res.message}`;
    sunsetDiv.textContent = res.sys.sunset
      ? `${sunsetTime()}`
      : `Error : ${res.message}`;
    humidityDiv.textContent = res.main.humidity
      ? `${res.main.humidity} %`
      : `Error : ${res.message}`;
    visibilityDiv.textContent = res.visibility
      ? `${visibilityFixed} km`
      : `Error : ${res.message}`;
    cloudsDiv.textContent = res?.clouds?.all
      ? `${res?.clouds?.all} %`
      : `Error : ${res.message}`;
  });
  getForecastData("Delhi").then((res) => {
    forecastLodingDIv.textContent = "";
    forecastContainer.innerHTML = "";
    if (res.cod == 200) {
      forecastLodingDIv.style.display = "none";
      res.list.forEach((ele) => {
        const divCard = document.createElement("div");
        divCard.classList =
          "min-w-[200px] h-[90%] bg-white rounded flex shadow-gray-500 shadow-lg p-3 flex-col gap-2 justify-center items-center";
        const dateDiv = document.createElement("div");
        dateDiv.textContent = new Date(ele.dt * 1000).toLocaleDateString();
        const image = document.createElement("img");
        image.src = "./assets/Images/cloud2.png";
        image.alt = "Icon";
        const tempDiv = document.createElement("div");
        actalTpm = parseInt(ele.main.temp) - 273.15;
        const actalTpminCelcius = actalTpm.toFixed(2);
        tempDiv.textContent = `Temp : ${actalTpminCelcius} °C`;
        const windDiv = document.createElement("div");
        windDiv.textContent = `Wind speed : ${ele.wind.speed} km`;
        const humidDiv = document.createElement("div");
        humidDiv.textContent = `Humidity : ${ele.main.humidity} %`;
        divCard.appendChild(dateDiv);
        divCard.appendChild(image);
        divCard.appendChild(tempDiv);
        divCard.appendChild(windDiv);
        divCard.appendChild(humidDiv);
        forecastContainer.appendChild(divCard);
      });
    } else {
      forecastLodingDIv.textContent = "Error fetching data";
      forecastLodingDIv.style.color = "red";
    }
  });
});
/* City Delhi  */

// Get weather data using city name
async function getWeatherReport(cityName = "Hyderabad") {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=aaab9223e458518b5949e5298b6c8f99`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}
/* calling the function with default Location  */
getWeatherReport().then((res) => {
  locationSpan.textContent = res.name
    ? `${res.name} ,`
    : `Error : ${res.message}`;
  actalTpm = parseInt(res.main.temp) - 273.15;
  const actalTpminCelcius = actalTpm.toFixed(2);
  feelsLikeTpm = parseInt(res.main.feels_like) - 273.15;
  const feelsLikeTpminCelcius = feelsLikeTpm.toFixed(2);

  maxTemp = parseInt(res.main.temp_max) - 273.15;
  const maxTempinCelcius = maxTemp.toFixed(2);
  minTemp = parseInt(res.main.temp_min) - 273.15;
  const minTempinCelcius = minTemp.toFixed(2);
  /* Sunrise Time calculation */
  const sunriseTime = function () {
    const date = new Date(res?.sys?.sunrise * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };
  /* Sunrise Time calculation */

  /* Sunset Time calculation */
  const sunsetTime = function () {
    const date = new Date(res?.sys?.sunset * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    const formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };
  /* Sunset Time calculation */

  const visibilityInKm = parseInt(res?.visibility) / 1000;
  const visibilityFixed = visibilityInKm.toFixed(2);

  actualTpmTextDiv.textContent = res.main.temp
    ? `${actalTpminCelcius} °C`
    : `Error : ${res.message}`;
  feelsLikeTpmTextDiv.textContent = res.main.feels_like
    ? `Feels like, ${feelsLikeTpminCelcius} °C`
    : `Error : ${res.message}`;
  weatherDescriptionDiv.textContent = res.weather[0].description
    ? `${res.weather[0].description}`
    : `Error : ${res.message}`;
  cloudCoverDiv.textContent = res.clouds.all
    ? `${res.clouds.all} %`
    : `Error : ${res.message}`;
  pressureDiv.textContent = res.main.pressure
    ? `${res.main.pressure} mb`
    : `Error : ${res.message}`;
  windDirectionDiv.textContent = res.wind.deg
    ? `${res.wind.deg} °`
    : `Error : ${res.message}`;

  windSpeedDiv.textContent = res.wind.speed
    ? `${res.wind.speed} kmph`
    : `Error : ${res.message}`;
  maxTempDiv.textContent = res.main.temp_max
    ? `${maxTempinCelcius} °C`
    : `Error : ${res.message}`;
  minTempDiv.textContent = res.main.temp_min
    ? `${minTempinCelcius} °C`
    : `Error : ${res.message}`;
  sunriseDiv.textContent = res.sys.sunrise
    ? `${sunriseTime()}`
    : `Error : ${res.message}`;
  sunsetDiv.textContent = res.sys.sunset
    ? `${sunsetTime()}`
    : `Error : ${res.message}`;
  humidityDiv.textContent = res.main.humidity
    ? `${res.main.humidity} %`
    : `Error : ${res.message}`;
  visibilityDiv.textContent = res.visibility
    ? `${visibilityFixed} km`
    : `Error : ${res.message}`;
  cloudsDiv.textContent = res?.clouds?.all
    ? `${res?.clouds?.all} %`
    : `Error : ${res.message}`;
});
/* calling the function with default Location  */

async function getForecastData(cityName = "Hyderabad") {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=aaab9223e458518b5949e5298b6c8f99`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}
/* calling the function with default  */
getForecastData().then((res) => {
  forecastLodingDIv.textContent = "";
  if (res.cod == 200) {
    forecastLodingDIv.style.display = "none";
    res.list.forEach((ele) => {
      const divCard = document.createElement("div");
      divCard.classList =
        "min-w-[200px] h-[90%] bg-white rounded flex shadow-gray-500 shadow-lg py-3 flex-col gap-2 justify-center items-center";
      const dateDiv = document.createElement("div");
      dateDiv.textContent = new Date(ele.dt * 1000).toLocaleDateString();
      const image = document.createElement("img");
      image.src = "./assets/Images/cloud2.png";
      image.alt = "Icon";
      const tempDiv = document.createElement("div");
      actalTpm = parseInt(ele.main.temp) - 273.15;
      const actalTpminCelcius = actalTpm.toFixed(2);
      tempDiv.textContent = `Temp : ${actalTpminCelcius} °C`;
      const windDiv = document.createElement("div");
      windDiv.textContent = `Wind speed : ${ele.wind.speed} km`;
      const humidDiv = document.createElement("div");
      humidDiv.textContent = `Humidity : ${ele.main.humidity} %`;
      divCard.appendChild(dateDiv);
      divCard.appendChild(image);
      divCard.appendChild(tempDiv);
      divCard.appendChild(windDiv);
      divCard.appendChild(humidDiv);
      forecastContainer.appendChild(divCard);
    });
  } else {
    forecastLodingDIv.textContent = "Error fetching data";
    forecastLodingDIv.style.color = "red";
  }
  // console.log(res)
});
/* calling the function with default  */

/* forecast by location */
async function getForecastReportBYCoordinates(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=aaab9223e458518b5949e5298b6c8f99`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
}
/* forecast by location */
