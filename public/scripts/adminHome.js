const service = axios.create();

const allUserDeleteButtons = document.querySelectorAll(".userDeleteButton");
const allCollegeDeleteButtons = document.querySelectorAll(
  ".collegeDeleteButton"
);
// const str = window.location.pathname;

// const n = str.lastIndexOf("/");
// const result = str.substring(n + 1);

allUserDeleteButtons.forEach(setupListener1);
function setupListener1(element) {
  element.addEventListener("click", deleteUser);
}

allCollegeDeleteButtons.forEach(setupListener2);
function setupListener2(element) {
  element.addEventListener("click", deleteCollege);
}

// allCollegeDeleteButtons.onclick = deleteCollege;

function removeRow(userID) {
  let rowID = "row" + userID;
  document.getElementById(rowID).remove();
}

function deleteUser(evt) {
  evt.preventDefault();
  let userID = evt.target.id;

  service
    .get(`/delete-user/${userID}`)
    .then(removeRow(userID))
    .catch();
}

function deleteCollege(evt) {
  evt.preventDefault();
  let collegeID = evt.target.id;
  service
    .get(`/delete-college/${collegeID}`)
    .then(removeRow(collegeID))
    .catch();
}

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

window.openTab = openTab;
