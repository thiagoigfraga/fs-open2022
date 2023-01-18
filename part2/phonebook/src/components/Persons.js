const Persons = ({ name, number, handleDeletePerson }) => {
  return (
    <p>
      {name} {number}
      <button onClick={() => handleDeletePerson(name)}>delete</button>
    </p>
  );
};

export default Persons;
