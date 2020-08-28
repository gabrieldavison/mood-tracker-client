import { useState } from "react";
import * as R from "ramda";

export default function useForm(submit, validate) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState(undefined);

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = validate(values);
    console.log("newErrors", newErrors);
    console.log(values);

    if (newErrors === undefined) {
      console.log("submit");
      submit(values);
    } else {
      console.log(newErrors);
      setErrors(newErrors);
    }
  }

  function handleChange(e) {
    const { value, name } = e.target;
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
    errors,
  };
}
