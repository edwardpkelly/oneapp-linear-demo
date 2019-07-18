export default (string) => {
    if (!string) return;
    return string.substring(0, 1).toUpperCase() + string.substring(1);
}