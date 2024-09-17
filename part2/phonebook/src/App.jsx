import axios from 'axios'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import { useEffect, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  const handleSearch = (e) => {
    setFilter(e.target.value)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const isPersonAlreadyInPhonebook = (persons.filter((person) => person.name.toLowerCase() === newName.toLowerCase())).length > 0
    if (isPersonAlreadyInPhonebook)
      alert(`${newName} is already added to phonebook`)
    else
      setPersons(persons.concat({ name: newName, phone: newPhone, id: persons.length + 1 }))
  }

  useEffect(() => {
    axios
      .get('http://localhost:3000/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        search={filter}
        handleSearch={handleSearch}
      />
      <h2>Add New</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
