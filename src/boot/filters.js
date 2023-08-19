import { boot } from "quasar/wrappers";

function editValue(value) {
  if (value < 10) {
    return "0" + value;
  }
  return value;
}
export default boot(({ app }) => {
  app.config.globalProperties.$filters = {
    formatDataBR(value) {
      const currentDate = new Date(value);

      const day = editValue(currentDate.getDate());
      const month = editValue(currentDate.getMonth() + 1);
      const year = currentDate.getFullYear();
      const min = editValue(currentDate.getMinutes());
      const hours = currentDate.getHours();

      const dataFormatDate = `${day}/${month}/${year} as ${hours}:${min}`;

      return dataFormatDate;
    },
  };
});
