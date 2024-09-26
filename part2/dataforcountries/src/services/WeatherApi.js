import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (cityInfos) => {
    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityInfos.latlng[0]}&lon=${cityInfos.latlng[1]}&appid=${API_KEY}`)
        .then(response => {
            return response.data
        })
}

export default { getWeather }
