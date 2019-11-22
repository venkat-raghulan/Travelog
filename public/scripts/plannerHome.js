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
  // console.log(tripID);
  let row = evt.target.parentElement;
  service
    .get(`/populate-trainer-box`)
    .then(apiRes => {
      let trainers = apiRes.data;
      let tpl1 = `<br><select class="selectedTrainer"><option disabled selected>Select Trainer</option>`;
      let tpl2 = "";
      trainers.forEach(element => {
        tpl2 += `<option value=${element._id}>${element.name}</option>`;
      });
      let tpl3 = `</select><br><a href="" class="fa fa-plus-square table-icon assignTrainerButton"></a>`;
      let tpl = tpl1 + tpl2 + tpl3;
      row.innerHTML += tpl;

      const assignTrainerButton = document.querySelector(
        ".assignTrainerButton"
      );
      assignTrainerButton.addEventListener("click", assignTrainer);
      function assignTrainer(evt) {
        evt.preventDefault();
        const trainerID = evt.target.previousSibling.previousSibling.value;
        service
          .get(`assign-trainer/${trainerID}?id=${tripID}`)
          .then(apiRes => {
            console.log(apiRes);
            row.firstElementChild.innerHTML += `<div>${apiRes.data.name}</div>`;
          })
          .catch(apiErr => console.log(apiErr));
      }
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
