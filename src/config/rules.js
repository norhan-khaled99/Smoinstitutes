export default {
required: [(val) => !!val || "This filed is required"],
  validEmail: [
    (val) => !!val || "Email is required!",
    (val) =>
      val.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ) || "Please enter valid Email",
  ],
}
