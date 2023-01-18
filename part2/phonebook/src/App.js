import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import {
  create,
  deletePerson,
  getPersons,
  update,
} from "./services/personServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [modified, setModified] = useState(false);

  useEffect(() => {
    getPersons().then((returnedPersons) => setPersons(returnedPersons));
  }, [persons]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userAlreadyExists = persons.find((p) => p.name === newName);

    if (!userAlreadyExists) {
      create(newName, newNumber).then((returnedPerson) =>
        setPersons(persons.concat(returnedPerson))
      );
      setNewName("");
      setNewNumber("");
      return;
    } else if (
      userAlreadyExists &&
      userAlreadyExists.number !== newNumber &&
      newNumber.length > 0
    ) {
      if (
        window.confirm(
          `${userAlreadyExists.name} is already added to phonebook, replace the older number with a new one?`
        )
      ) {
        const updatedObject = {
          name: userAlreadyExists.name,
          number: newNumber,
        };

        update(userAlreadyExists.id, updatedObject).then((updatedPerson) =>
          persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
        );
      }
    } else {
      window.alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setModified(true);
  };

  const handleDeletePerson = (name) => {
    const person = persons.find((p) => p.name === name);

    if (person) {
      if (window.confirm(`Delete ${name} ?`)) {
        const { id: personId } = person;

        deletePerson(personId).then((returnedDelPerson) => {
          persons.filter((p) => p.id === returnedDelPerson.id);
        });
      }
    }
  };

  const usersToShow = modified
    ? persons.filter((p) =>
        p.name.toLowerCase().includes(search.toLocaleLowerCase(), 0)
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChangeFilter={handleSearchChange} />
      <PersonForm
        handleSubmit={handleSubmit}
        onChangeNewName={handleNewNameChange}
        onChangeNewNumber={handleNewNumberChange}
        newNameValue={newName}
        newNumberValue={newNumber}
      />
      <h2>Numbers</h2>
      {persons
        ? usersToShow.map((p) => (
            <Persons
              key={p.name}
              name={p.name}
              number={p.number}
              handleDeletePerson={handleDeletePerson}
            />
          ))
        : "..."}
    </div>
  );
};

export default App;
