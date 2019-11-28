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
  date,
  data
) {
  let formattedDate = moment(date).format("YYYY-MM-DD");
  let dataString = `data-session-name = ${session.name} data-session-timings = ${session.timings} data-date =${formattedDate}`;

  let filteredData = data.filter(
    obj =>
      obj.sessionName.name == session.name &&
      obj.date.setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0)
  );

  let tpl = "";
  //iterates through the batches to create inputs
  for (let i = 0; i < number; i++) {
    let topic = filteredData
      .filter(a => a.batchName.batch == "B" + (i + 1))
      .reduce((acc, val) => acc + val.topic, "");

    let trainer = filteredData
      .filter(a => a.batchName.batch == "B" + (i + 1))
      .reduce((acc, val) => acc + val.trainer, "");

    // console.log(topic);
    // console.log(trainer);

    tpl += `<td class="table-division"> 
      <select class="schedule-trainer" data-batch=B${i + 1} ${dataString}>
      <option disabled selected value>Select Trainer</option>`;
    // Iterates through the trainer list to create options in the dropdown
    trainerlist.forEach((element, index) => {
      var options = "";
      let name = element.name;
      let id = element.employeeID;
      if (element._id == trainer) {
        options = `<option selected value = "${id}:${name}">${id}:${name}</option>`;
      } else {
        options = `<option value = "${id}:${name}">${id}:${name}</option>`;
      }

      tpl += options;
    });

    console.log(topic);
    // Create input for entering topic
    tpl += `</select>
      <input type="text" class="schedule-topic" data-batch=B${i +
        1} name="topic" placeholder="Enter Topic" ${dataString} value="${topic}">
  </td>`;
  }
  return tpl;
});

hbs.registerHelper("compare", function(lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
    "==": function(l, r) {
      return l == r;
    },
    "===": function(l, r) {
      return l === r;
    },
    "!=": function(l, r) {
      return l != r;
    },
    "<": function(l, r) {
      return l < r;
    },
    ">": function(l, r) {
      return l > r;
    },
    "<=": function(l, r) {
      return l <= r;
    },
    ">=": function(l, r) {
      return l >= r;
    },
    typeof: function(l, r) {
      return typeof l == r;
    }
  };

  if (!operators[operator])
    throw new Error(
      "Handlerbars Helper 'compare' doesn't know the operator " + operator
    );

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("list-dates", function(dates) {
  const dateArray = [];
  dates.forEach(date => {
    let rule = "DD-MM-YYYY";
    dateArray.push(moment(date).format(rule));
  });

  return `<li><span class="bold">Start Date: </span> ${dateArray[0]}</li><li><span class="bold"> End Date: </span> ${dateArray[1]}</li>`;
});

hbs.registerHelper("nav-bar", function(user) {
  if (user.includes("Admin") && user.includes("Planner")) {
    return `<a href="/admin">Admin</a><a href="/planner">Planner</a>`;
  } else if (user.includes("Admin")) {
    return `<a href="/admin">Admin</a>`;
  } else if (user.includes("Planner")) {
    return `<a href="/planner">Planner</a>`;
  }
});
