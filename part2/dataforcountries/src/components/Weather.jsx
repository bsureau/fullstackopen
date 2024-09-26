import { useEffect, useState } from "react"
import WeatherApi from '../services/WeatherApi'

const Weather = ({ country }) => {

    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        WeatherApi
            .getWeather(country.capitalInfo)
            .then(weatherData => setWeatherData(weatherData))
    }, [country])

    if (weatherData) {

        const celsiusTemperature = Math.round(weatherData.main.temp - 273.15)
        const icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        const wind = weatherData.wind.speed

        return (
            <div>
                <h2>Weather in {country.capital[0]}</h2>
                <p>Temperature {celsiusTemperature} Celsius</p>
                <img src={icon} alt="weather icon" />
                <p>Wind {wind} m/s</p>
            </div>
        )
    }

}

export default Weather
