import { useState } from "react";

export default function useForm(submit) {
  const [values, setValues] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    submit(values);
  }

  function handleChange(value, name) {
    console.log(name);
    console.log(value);
    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }

  return {
    values,
    handleSubmit,
    handleChange,
  };
}
