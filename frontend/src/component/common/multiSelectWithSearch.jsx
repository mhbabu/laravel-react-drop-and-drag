import Select from 'react-select';

export default function MultiSelectWithSearch ({data, placeholder, onChange, value, selectedData }){

  return (
    <Select
      isMulti
      options={data?.map((item) =>({ value: item?.id, label: item?.name }))}
      value={value}
      defaultValue={selectedData}
      onChange={onChange}
      placeholder={ placeholder}
      isSearchable
    />
  );
};
