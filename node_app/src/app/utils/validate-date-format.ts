export function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!regex.test(dateString)) {
        return false;
    }

    const date = new Date(dateString);

    if (!date.getTime()) {
        return false;
    }

    return date.toISOString().slice(0, 10) === dateString;
}
