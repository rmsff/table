var idCounter = 0;
export default (prefix = '') => {
  var id = ++idCounter;
  return String(prefix) + id;
}
