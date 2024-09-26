const CountryForm = ({
    filter,
    handleSearch
}) => {
    return (
        <div>
            Find countries : <input value={filter} onChange={handleSearch} />
        </div>
    )
}

export default CountryForm
