import axios from 'axios'

const getAllPersons = () => {
    return axios
        .get('/api/persons')
        .then(response => {
            return response.data
        })
}

const createNewPerson = (newName, newPhone) => {
    return axios
        .post(
            '/api/persons',
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
        .delete(`/api/persons/${personId}`)
        .then((response) => {
            return response.data
        })
}

const updatePerson = (person, newPhone) => {
    return axios
        .put(
            `/api/persons/${person.id}`,
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
