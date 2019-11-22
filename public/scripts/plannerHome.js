const service = axios.create();

const allTripDeleteButtons = document.querySelectorAll(".tripDeleteButton");
const allAddTrainerButtons = document.querySelectorAll(".addTrainerButton");

allTripDeleteButtons.forEach(setupListener);
function setupListener(element) {
  element.addEventListener("click", deleteTrip);
}

allAddTrainerButtons.forEach(setupListener1);
function setupListener1(element) {
  element.addEventListener("click", addTrainerBox);
}

function addTrainerBox(evt) {
  evt.preventDefault();
  let id = evt.target.id;
  // const n = str.lastIndexOf("/");
  // const result = str.substring(n + 1);
  let n = id.lastIndexOf("~");
  let tripID = id.substring(n + 1);
  console.log(tripID);
  let row = evt.target.parentElement;
  service
    .get(`/populate-trainer-box`)
    .then(apiRes => {
      //   row.innerhtml += `$foo`;
    })
    .catch(apiErr => console.log(apiErr));
}

function removeRow(userID) {
  let rowID = "row" + userID;
  document.getElementById(rowID).remove();
}

function deleteTrip(evt) {
  evt.preventDefault();
  let tripID = evt.target.id;

  service
    .get(`/delete-trip/${tripID}`)
    .then(apiRes => {
      removeRow(tripID);
    })
    .catch(apiErr => console.log(apiErr));
}
