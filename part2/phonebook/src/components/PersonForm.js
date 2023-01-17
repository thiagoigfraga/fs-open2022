const PersonForm = ({
  handleSubmit,
  onChangeNewName,
  onChangeNewNumber,
  newNameValue,
  newNumberValue,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>add a new</h3>
      <div>
        name: <input onChange={onChangeNewName} value={newNameValue} />
      </div>
      <div>
        number: <input onChange={onChangeNewNumber} value={newNumberValue} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
