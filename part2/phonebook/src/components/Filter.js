const Filter = ({ value, onChangeFilter }) => {
  return (
    <label>
      filter shown with
      <input value={value} onChange={onChangeFilter} />
    </label>
  );
};

export default Filter;
