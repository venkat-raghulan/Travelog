const service = axios.create();

const finishedPlan = document.getElementById("plan-status");

console.log(finishedPlan);

console.log(service);

// function updatePlanStatus(evt) {
//   console.log(evt);
//   console.log(service);
//   service
//     .get(`/update-status?status=${evt.target.value}`)
//     .then(apiRes => {
//       console.log(evt.value);
//     })
//     .catch(apiErr => console.log(apiErr));
// }

// finishedPlan.oninput = updatePlanStatus;
