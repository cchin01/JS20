//unsplash API
const apiUrl =
  "https://api.unsplash.com/photos/random/?client_id=4KX4g9C-Txil0LQXoncp0H-aiu97YBf94iD6oaHtqVM&count=3";
const imagecontainer = document.querySelector("#img-container");
const loader = document.querySelector("#loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Check if all images are loaded
function checkImgLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready:", ready);
    imagesLoaded = 0;
  }
}

//helper function to set attributes to DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  totalImages = photosArray.length;
  console.log("totalImages:", totalImages);

  photosArray.forEach((photo) => {
    //creat element for a
    const item = document.createElement("a");
    /*item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");*/
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //creat element for img
    const img = document.createElement("img");
    /*img.setAttribute("title", photo.description);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("src", photo.urls.regular);*/
    setAttributes(img, {
      title: photo.description,
      alt: photo.alt_description,
      src: photo.urls.regular,
    });

    //add event listener to make sure getting img after loading is complete
    img.addEventListener("load", checkImgLoaded);

    //put img in a, a in img-container
    item.appendChild(img);
    imagecontainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //catch error
  }
}

//
window.addEventListener("scroll", function () {
  /*console.log("window.innerHeight:", window.innerHeight);
  console.log("window.scrollY:", window.scrollY);
  console.log("document.body.offsetHeight:", document.body.offsetHeight);
  console.log("document.innerHeight:", document.innerHeight);
  console.log("-----------------------------------------");
  console.log("-----------------------------------------");*/
  if (window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

//onload
getPhotos();
