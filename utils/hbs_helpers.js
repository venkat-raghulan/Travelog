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

hbs.registerHelper("create-inputs", function(
  number,
  trainerlist,
  session,
  date
) {
  let formattedDate = moment(date).format("YYYY-MM-DD");
  let dataString = `data-session-name = ${session.name} data-session-timings = ${session.timings} data-date =${formattedDate}`;

  let tpl = "";

  for (let i = 0; i < number; i++) {
    tpl += `<td class="table-division"> 
      <select class="schedule-trainer" data-batch=B${i + 1} ${dataString}>
      <option disabled selected value>Select Trainer</option>`;

    trainerlist.forEach(element => {
      var options = "";
      let name = element.name;
      let id = element.employeeID;
      options = `<option value = "${id}:${name}">${id}:${name}</option>`;
      tpl += options;
    });

    tpl += `</select>
      <input type="text" class="schedule-topic" data-batch=B${i +
        1} name="topic" placeholder="Enter Topic" ${dataString}>
  </td>`;
  }
  return tpl;
});
