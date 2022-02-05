// Converts a date string into a particular date format.
// Format options:
// 'short', 'long'
export const parseDate = (date, format) => {
    const shortFormat = { day: "numeric", month: 'numeric', year: 'numeric' };
    const longFormat = { weekday: 'long', month: 'long', year: 'numeric', day: "numeric" };

    switch (format) {
        case "long":
            return new Date(date).toLocaleDateString(undefined, longFormat);
        case "short":
            return new Date(date).toLocaleDateString(undefined, shortFormat);
        default:
            return '';
    }
}