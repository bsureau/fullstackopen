const Country = ({
    country
}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital[0]}</p>
            <p>capital: {country.area}</p>
            <h3>languages: </h3>
            {Object.values(country.languages).map((language) => <p key={language}>{language}</p>)}
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

export default Country
