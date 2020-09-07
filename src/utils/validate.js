export default function validate(values) {
  let errors = [];
  if (!values.happy) {
    errors.push("add a value for happy");
  }
  if (!values.calm) {
    errors.push("add a value for calm");
  }
  return errors;
}
