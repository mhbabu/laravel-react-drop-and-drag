import Select from 'react-select';

export default function MultiSelectWithSearch ({data, placeholder, onChange, value }){

  return (
    <Select
      isMulti
      options={data?.map((item) =>({ value: item?.id, label: item?.name }))}
      value={value}
      onChange={onChange}
      placeholder={ placeholder}
      isSearchable
    />
  );
};
