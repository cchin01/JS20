const videoElement = document.querySelector("#video");
const buttonSelect = document.querySelector("#button-select");
const buttonPlay = document.querySelector("#button-play");

//prompt to select media stream and pass to media element
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log("error");
  }
}

buttonPlay.addEventListener("click", async () => {
  //Disable Button
  buttonPlay.disabled = true;
  // Start picture in picture
  await videoElement.requestPictureInPicture();
  //Reset Button
  buttonPlay.disabled = false;
});

function stopCapture() {
  let tracks = videoElement.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoElement.srcObject = null;
}

buttonSelect.addEventListener("click", selectMediaStream);
window.addEventListener(
  "keydown",
  (e) => {
    if (e.key == "Escape") {
      stopCapture();
      console.log("esc");
    }
  },
  false
);

selectMediaStream();
