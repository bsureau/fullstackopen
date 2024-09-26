import { useState } from "react"
import Country from "./Country"


const CountryList = ({
    countries
}) => {

    const [selectedCountry, setSelectedCountry] = useState(null)

    const [prevCountries, setPrevCountries] = useState(null)
    if (!prevCountries || prevCountries !== countries) {
        if (countries.length === 1) {
            setSelectedCountry(countries[0])
        } else {
            setSelectedCountry(null)
        }
        setPrevCountries(countries)
    }

    const handleSelectCountry = (selectedCountry) => {
        setSelectedCountry(selectedCountry)
    }

    if (selectedCountry) {
        return <Country country={selectedCountry} />
    }

    if (countries.length > 1 && countries.length < 10) {
        return countries.map((country) => <div key={country.area} >{country.name.common}<button onClick={() => handleSelectCountry(country)}>show</button></div >)
    }

    return (
        <div>
            <p>Too many matches, specify another filter</p>
        </div>
    )
}


export default CountryList
