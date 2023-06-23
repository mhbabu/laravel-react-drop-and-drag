import Joi from "joi-browser";

export function formValidation(formData, dataSchema) {
  const options = { abortEarly: false };
  const { error } = Joi.validate(formData, dataSchema, options);
  const errors = {};
  if (!error) return null;
  for (let item of error.details) errors[item.path[0]] = item.message;

  return errors;
}

export function validateProperty(input, dataSchema) {
  const { name, value } = input;
  const obj = { [name]: value };
  const schema = { [name]: dataSchema[name] };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
}

export function handleOnChangeData(input, dataSchema, formData, formErrors) {
  const errors = { ...formErrors };
  const errorMsg = validateProperty(input, dataSchema);
  if (errorMsg) errors[input.name] = errorMsg;
  else delete errors[input.name];

  const data = { ...formData };
  data[input.name] = input.value;

  return { data, errors };
}

export function handleSubmit(event, formData, dataSchema) {
  event.preventDefault();
  return formValidation(formData, dataSchema);
}

export function getStatus(){
  return [
    { _id: "Active", name: "Active" },
    { _id: "Inactive", name: "Inactive" },
  ];
}
