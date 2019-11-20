const service = axios.create();

const finishedPlan = document.getElementById("plan-status");
const allTrainerInputs = document.querySelectorAll(".schedule-trainer");
const allTopicInputs = document.querySelectorAll(".schedule-topic");
const str = window.location.pathname;

const n = str.lastIndexOf("/");
const result = str.substring(n + 1);

allTrainerInputs.forEach(setupListener1);
allTopicInputs.forEach(setupListener2);

function setupListener1(element) {
  element.addEventListener("change", callback1);
}

function setupListener2(element) {
  element.addEventListener("change", callback2);
}

function callback1(evt) {
  let batch = evt.target.getAttribute("data-batch");
  let sessionName = evt.target.getAttribute("data-session-name");
  let sessionTimings = evt.target.getAttribute("data-session-timings");
  let date = evt.target.getAttribute("data-date");
  let value = evt.target.value;

  service
    .get(
      `/update-trainer/?batch=${batch}&sessionName=${sessionName}&sessionTimings=${sessionTimings}&date=${date}&trainer=${value}&id=${result}`
    )
    .then()
    .catch();
}

function callback2(evt) {
  let batch = evt.target.getAttribute("data-batch");
  let sessionName = evt.target.getAttribute("data-session-name");
  let sessionTimings = evt.target.getAttribute("data-session-timings");
  let date = evt.target.getAttribute("data-date");
  let value = evt.target.value;

  service
    .get(
      `/update-topic/?batch=${batch}&sessionName=${sessionName}&sessionTimings=${sessionTimings}&date=${date}&topic=${value}&id=${result}`
    )
    .then()
    .catch();
}

function updatePlanStatus(evt) {
  service
    .get(`/update-status/?status=${finishedPlan.checked}&id=${result}`)
    .then(apiRes => {
      console.log(apiRes);
    })
    .catch(apiErr => console.log(apiErr));
}

finishedPlan.oninput = updatePlanStatus;
