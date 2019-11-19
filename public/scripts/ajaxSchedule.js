const service = axios.create();

const finishedPlan = document.getElementById("plan-status");
const allInputs = document.querySelectorAll(".schedule-input");

allInputs.forEach(setupListener);

function setupListener(element) {
  element.addEventListener("change", callback);
}

function callback(evt) {
  console.log(evt.target.getAttribute("data-batch"));
  console.log(evt.target.getAttribute("data-session-name"));
  console.log(evt.target.getAttribute("data-session-timings"));
  console.log(evt.target.getAttribute("data-date"));
}

function updatePlanStatus(evt) {
  let str = window.location.pathname;

  var n = str.lastIndexOf("/");
  var result = str.substring(n + 1);

  service
    .get(`/update-status/?status=${finishedPlan.checked}&id=${result}`)
    .then(apiRes => {
      console.log(apiRes);
    })
    .catch(apiErr => console.log(apiErr));
}

finishedPlan.oninput = updatePlanStatus;
