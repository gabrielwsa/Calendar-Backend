
const isDate = (value, { req, location, path }) => {
    if (!value) {
        return false;
    }
    const date = new Date(value);
    if (isNaN(date)) {
        return false;
    }
    return true;
}

module.exports = { isDate };