function print(data, type) {
  switch (type) {
    case "count":
      console.count(data);

      break;

    case "countReset":
      console.countReset(data);

      break;

    case "debug":
      console.debug(data);

      break;

    case "dir":
      console.dir(data);

      break;

    case "dirxml":
      console.dirxml(data);

      break;

    case "error":
      console.error(data);

      break;

    case "info":
      console.info(data);

      break;

    case "table":
      console.table(data);

      break;

    case "warn":
      console.warn(data);

      break;

    default:
      console.log(data);
  }
}

module.exports = print;
