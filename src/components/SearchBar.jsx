import { AsyncPaginate } from 'react-select-async-paginate';

const SearchBar = ({ value, onChange, loadOptions }) => {
  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={500}
      value={value}
      onChange={onChange}
      loadOptions={loadOptions}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(8px)',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.3)',
          padding: '5px',
          color: '#18181a',
          width: '100%',
          fontSize: '1.5rem',
        }),
        input: (base) => ({ ...base, color: '#18181a' }),
        placeholder: (base) => ({ ...base, color: '#18181a' }),
        singleValue: (base) => ({ ...base, color: '#18181a' }),
        menu: (base) => ({
          ...base,
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(6px)',
        }),
      }}
    />
  );
};

export default SearchBar;
