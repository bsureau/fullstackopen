import CountryForm from "./components/CountryForm"
import Countries from "./components/Countries"
import { useEffect, useState } from "react"
import countriesFinder from "./services/CountriesFinder"

function App() {

  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    countriesFinder
      .getAll()
      .then(countries => setResult(countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))))
  },
    [search]
  )

  return (
    <>
      <CountryForm search={search} handleSearch={handleSearch} />
      {search !== '' &&
        <Countries result={result} />
      }
    </>
  )
}

export default App
