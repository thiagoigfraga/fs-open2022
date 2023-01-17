import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [modified, setModified] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userAlreadyExists =
      persons.filter((p) => p.name === newName).length > 0;

    if (!userAlreadyExists) {
      const newNameObject = { name: newName, number: newNumber };
      setPersons(persons.concat(newNameObject));
      setNewName("");
      setNewNumber("");
      return;
    }

    window.alert(`${newName} is already added to phonebook`);
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
            <Persons key={p.name} name={p.name} number={p.number} />
          ))
        : "..."}
    </div>
  );
};

export default App;