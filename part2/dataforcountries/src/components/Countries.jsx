import Country from "./Country"

const Countries = ({
    result
}) => {
    if (result.length === 0)
        return
    if (result.length > 1 && result.length < 10)
        return result.map((country) => <div key={country.area} >{country.name.common}<button>show</button></div>)
    else if (result.length === 1)
        return <Country country={result[0]} />
    else {
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
}

export default Countries
