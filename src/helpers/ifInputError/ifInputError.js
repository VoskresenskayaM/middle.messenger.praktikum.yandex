export default function ifInputError(error, options) {
    if (error) {
        return options.fn(this)
    }
    else {
        return options.inverse(this);
    }
}
