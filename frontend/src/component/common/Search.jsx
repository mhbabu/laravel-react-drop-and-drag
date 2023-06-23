const SearchBox = ({ value, onChange }) => {
    return (
      <div className='form-group'>
        <input
          type='text'
          name='query'
          className='form-control'
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          placeholder='Search...'
        />
      </div>
    );
  };
  
  export default SearchBox;