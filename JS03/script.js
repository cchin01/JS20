const videoElement = document.querySelector("#video");
const button = document.querySelector("#button");

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

button.addEventListener("click", async () => {
  //Disable Button
  button.disabled = true;
  // Start picture in picture
  await videoElement.requestPictureInPicture();
  //Reset Button
  button.disabled = false;
});

selectMediaStream();
