const CountryForm = ({
    search,
    handleSearch
}) => {
    return (
        <div>
            Find countries : <input value={search} onChange={handleSearch} />
        </div>
    )
}

export default CountryForm
