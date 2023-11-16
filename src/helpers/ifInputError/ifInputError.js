export default function ifInputError(error, options) {
  if (error) {
    return options.fn(this);
  }

  return options.inverse(this);
}
