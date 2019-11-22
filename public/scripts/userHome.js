const service = axios.create();

const buttons = document.querySelectorAll(".see-more");

function formatData(data) {
  let htmlData = "";
  let scheduleData = "";
  const collegeData = data.trip.college;
  let divOpen = `<div class="schedule-holder">`;
  let divClose = `</div>`;
  const college = `<div class="college-information">
    <h2>College Information: </h2>
    <ul class="college-details">
    <li><span>Name:</span> ${collegeData.collegeName}</li>
    <li><span>Address:</span>  ${collegeData.collegeAddress}</li>
    <li><span>City:</span>  ${collegeData.city}</li>
    <li><span>College ID:</span>  ${collegeData.collegeID}</li>
    <li><span>Contact Name:</span>  ${collegeData.collegeSPOC.name}</li>
    <li><span>Contact Info:</span>  ${collegeData.collegeSPOC.phone}</li>
    </ul></div>
    <h2 class="schedule-title">Schedules</h2>
    `;
  if (data.schedule.length > 0) {
    data.schedule.forEach(schedule => {
      scheduleData += `
        <div class="schedule-data">
        <ul>
        <li><span>Batch:</span> ${schedule.batchName.batch}</li>
        <li><span>Date:</span> ${moment(schedule.date).format(
          "DD/MM/YYYY"
        )}</li>
        <li><span>Times:</span> ${schedule.sessionName.timings}</li>
        <li><span>Session Name:</span> ${schedule.sessionName.name}</li>
        <li><span>Session Topic:</span> ${schedule.topic}</li>
        </ul>
        </div>
        `;
    });
  } else {
    scheduleData = `<h2>There is no schedule available at this time</h2>`;
  }
  divOpen += scheduleData + divClose;
  htmlData += college + divOpen;
  return htmlData;
}

const viewMore = function(evt) {
  const assignmentId = evt.target.getAttribute("data-id");
  const divider = document.querySelector(".main-container");
  const divNode = document.createElement("div");
  const viewMore = document.querySelector(".more-information");
  if (viewMore) viewMore.remove();
  divNode.className = "more-information";
  service
    .get(`/home/${assignmentId}`)
    .then(res => {
      const travelData = res.data;
      divider.appendChild(divNode);
      divNode.innerHTML = formatData(travelData);
      console.log(travelData);
    })
    .catch(err => console.log(err));
};

buttons.forEach(button => {
  button.onclick = viewMore;
});
