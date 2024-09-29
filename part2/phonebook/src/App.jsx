import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import { useEffect, useState } from 'react'
import phoneBookService from './services/PhoneService'
import NotificationMessage from './component/NotificationMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  const handleSearch = (e) => {
    setFilter(e.target.value)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  const handleDeletePerson = (personToDelete) => {
    const confirm = window.confirm(`Are you sure you want to delete ${personToDelete.name} from your phone book?`)
    if (confirm) {
      phoneBookService
        .deletePerson(personToDelete.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personToDelete.id))
        })
    }
  }

  const addPerson = (e) => {
    e.preventDefault()
    const person = persons.find((person) => person.name.toLowerCase() == newName.toLocaleLowerCase())
    if (person !== undefined) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        phoneBookService
          .updatePerson(person, newPhone)
          .then((personUpdated) => {
            setPersons(persons.filter((person) => person.id !== personUpdated.id).concat(personUpdated))
          })
          .catch((error) => {
            alert(`Information of ${person.name} has already been removed from server`)
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
          setSuccessMessage(`${newName} was added to phone book!`)
          setTimeout(() => setSuccessMessage(null), 5000)
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
      {successMessage !== null && <NotificationMessage message={successMessage} />}
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
