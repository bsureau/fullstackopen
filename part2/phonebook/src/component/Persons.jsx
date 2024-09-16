const Persons = ({
    persons,
    filter
}) => {
    return persons.filter((person) => person.name.toLowerCase().includes(filter.toLocaleLowerCase()))
        .map((person) => <p key={person.id}>{person.name} {person.phone}</p>)
}

export default Persons
