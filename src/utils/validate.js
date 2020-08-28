export default function validate(values) {
  let errors = undefined;
  // if (!values.happy) {
  //   errors = "add a value for happy";
  // }
  // if (!values.calm) {
  //   errors = "add a value for calm";
  // }
  if (!values.sleep) {
    errors = "add a value for sleep";
  }
  return errors;
}
