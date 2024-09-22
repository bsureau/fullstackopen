import axios from 'axios'

const getAllPersons = () => {
    return axios
        .get('http://localhost:3000/persons')
        .then(response => {
            return response.data
        })
}

const createNewPerson = (newName, newPhone) => {
    return axios
        .post(
            'http://localhost:3000/persons',
            {
                name: newName,
                phone: newPhone
            }
        )
        .then(response => {
            return response.data
        })
}

const deletePerson = (personId) => {
    return axios
        .delete(`http://localhost:3000/persons/${personId}`)
        .then((response) => {
            return response.data
        })
}

const updatePerson = (person, newPhone) => {
    return axios
        .put(
            `http://localhost:3000/persons/${person.id}`,
            {
                ...person,
                phone: newPhone
            }
        )
        .then((response) => {
            return response.data
        })
}
export default { getAllPersons, createNewPerson, deletePerson, updatePerson }
