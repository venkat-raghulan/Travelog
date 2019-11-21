const service = axios.create();
const pathname = window.location.pathname;
const id = pathname.substr(17);
const userId = document.get;

const success = `
<div class="success">
<h1>Profile picture updated successfully</h1>
<a href="/home">Return to your dashboard</a>
</div>
`;

Webcam.set({
  width: 640,
  height: 480,
  image_format: "jpeg",
  jpeg_quality: 90
});

Webcam.attach("#my_camera");

let data = {
  image: "url"
};
const doc = document.querySelector(".camera-container");
const path = `/profile-picture/${id}?image_fmt=jpeg`;

function takePic() {
  Webcam.snap(data_uri => {
    document.getElementById("results").innerHTML =
      '<img src="' + data_uri + '"/>';
    data.image = data_uri;
    if (saveButton.classList.contains("hidden")) {
      saveButton.classList.toggle("hidden");
    }
  });
}

function savePic() {
  Webcam.upload(data.image, path, function(code, text) {
    if (code === 200) {
      doc.innerHTML = success;
    }
  });
}
const saveButton = document.querySelector(".save-pic");
const button = document.getElementById("take-pic");

button.onclick = takePic;

saveButton.onclick = savePic;
