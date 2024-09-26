import { useEffect, useState } from "react"
import countriesFinder from "./services/CountriesFinder"
import CountryForm from "./components/CountryForm"
import CountryList from "./components/CountryList"

function App() {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearch = (e) => {
    setFilter(e.target.value)
  }

  useEffect(() => {
    countriesFinder
      .getAll()
      .then(countries => setCountries(countries))
  },
    []
  )

  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <CountryForm filter={filter} handleSearch={handleSearch} />
      {filter !== '' &&
        <CountryList countries={filteredCountries} />
      }
    </div>
  )

}

export default App
