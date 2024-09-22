import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import { useEffect, useState } from 'react'
import phoneBookService from './services/PhoneService'

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

  const handleDeletePerson = (person) => {
    const confirm = window.confirm(`Are you sure you want to delete ${person.name} from your phone book?`)
    if (confirm) {
      phoneBookService
        .deletePerson(person.id)
        .then((deletedPerson) => {
          setPersons(persons.filter((person) => person.id !== deletedPerson.id))
        })
    }
  }

  const addPerson = (e) => {
    e.preventDefault()
    const person = persons.find((person) => person.name.toLowerCase() == newName.toLocaleLowerCase())
    if (person !== null) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        phoneBookService
          .updatePerson(person, newPhone)
          .then((personUpdated) => {
            setPersons(persons.filter((person) => person.id !== personUpdated.id).concat(personUpdated))
          })
      }
    }
    else {
      phoneBookService
        .createNewPerson(
          newName,
          newPhone
        )
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewPhone('')
        })
    }
  }

  useEffect(() => {
    phoneBookService
      .getAllPersons()
      .then(persons => {
        setPersons(persons)
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
        newPhone={newPhone}
        handlePhoneChange={handlePhoneChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App
