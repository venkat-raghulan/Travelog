const hbs = require("hbs");
const moment = require("moment");

hbs.registerHelper("format-date", function(date, rule) {
  if (!rule) rule = "YYYY-MM-DD";
  return moment(date).format(rule);
});

hbs.registerHelper("create-rows", function(rows) {
  let tpl = "";
  for (let i = 0; i < rows; i++) {
    tpl += `<th class="table-head">Batch ${i + 1}</th>`;
  }
  return tpl;
});

hbs.registerHelper("create-inputs", function(number) {
  let tpl = "";

  for (let i = 0; i < number; i++) {
    tpl += `<td class="table-division">
      <input type="text" name="" placeholder="Enter trainer"><input type="text" name="" placeholder="Enter Topic">
  </td>`;
  }
  return tpl;
});
