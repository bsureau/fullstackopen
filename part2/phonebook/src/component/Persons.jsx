const Persons = ({
    persons,
    filter,
    handleDeletePerson
}) => {
    return persons.filter((person) => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))
        .map((person) => {
            return (
                <div key={person.id}>
                    {person.name} {person.phone}
                    <button key={person.id} onClick={() => { handleDeletePerson(person) }}>delete</button>
                </div>
            )
        })
}

export default Persons
