// Animations
// Select element function
const selectElement = function (element) {
  return document.querySelector(element);
};

const body = selectElement("body");

document.querySelector(".menu-toggle").addEventListener("click", function () {
  body.classList.toggle("open");
});

document.querySelector(".nav-list").addEventListener("click", function () {
  if (body.classList.contains("open")) {
    body.classList.toggle("open");
  }
});

// Scroll reveal
window.sr = ScrollReveal();

sr.reveal(".animate-left", {
  origin: "left",
  duration: 1000,
  distance: "25rem",
  delay: 300,
});

sr.reveal(".animate-right", {
  origin: "right",
  duration: 1000,
  distance: "25rem",
  delay: 600,
});

sr.reveal(".animate-top", {
  origin: "top",
  duration: 1000,
  distance: "25rem",
  delay: 600,
});

sr.reveal(".animate-bottom", {
  origin: "bottom",
  duration: 1000,
  distance: "25rem",
  delay: 600,
});

// Sends Form
function sendMail(contactForm) {
  document.getElementById("submit").disabled = true;
  document.querySelector(".loader").style.display = "inline-block";

  emailjs
    .send("gmail", "velocitysteel", {
      from_name: contactForm.name.value,
      from_company: contactForm.company.value,
      from_number: contactForm.number.value,
      from_email: contactForm.email.value,
      from_message: contactForm.message.value,
    })
    .then(
      function (response) {
        console.log("success", response);
        location.reload();
      },
      function (error) {
        console.log("failed", error);
      }
    );
  return false;
}

// Slider
const a = document.getElementsByClassName("slider-a");
const cfImg = document.getElementsByClassName("coverflow__image");

let scaleI = 0;
for (scaleI; scaleI < a.length; scaleI++) {
  if (scaleI === 3) {
    continue;
  } else {
    a[scaleI].style.cursor = "default";
    a[scaleI].addEventListener("click", prevDef);
  }
}

function prevDef(e) {
  e.preventDefault();
}

function forScale(coverflowPos) {
  for (scaleI = 0; scaleI < a.length; scaleI++) {
    a[scaleI].style.cursor = "default";
    a[scaleI].addEventListener("click", prevDef);
  }
  for (scaleI = 0; scaleI < cfImg.length; scaleI++) {
    if (cfImg[scaleI].getAttribute("data-coverflow-index") == coverflowPos) {
      cfImg[scaleI].parentElement.style.cursor = "pointer";
      cfImg[scaleI].parentElement.removeEventListener("click", prevDef);
    }
  }
}

function setupCoverflow(coverflowContainer) {
  let coverflowContainers;

  if (typeof coverflowContainer !== "undefined") {
    if (Array.isArray(coverflowContainer)) {
      coverflowContainers = coverflowContainer;
    } else {
      coverflowContainers = [coverflowContainer];
    }
  } else {
    coverflowContainers = Array.prototype.slice.apply(
      document.getElementsByClassName("coverflow")
    );
  }

  coverflowContainers.forEach(function (containerElement) {
    const coverflow = {};
    let prevArrows, nextArrows;

    // Capture coverflow elements
    coverflow.container = containerElement;
    coverflow.images = Array.prototype.slice.apply(
      containerElement.getElementsByClassName("coverflow__image")
    );
    coverflow.position = Math.floor(coverflow.images.length / 2) + 1;

    // Set indicies on images
    coverflow.images.forEach(function (coverflowImage, i) {
      coverflowImage.dataset.coverflowIndex = i + 1;
    });

    // Set initial position
    coverflow.container.dataset.coverflowPosition = coverflow.position;

    // Get prev/next arrows
    prevArrows = Array.prototype.slice.apply(
      coverflow.container.getElementsByClassName("prev-arrow")
    );
    nextArrows = Array.prototype.slice.apply(
      coverflow.container.getElementsByClassName("next-arrow")
    );

    // Event handlers
    function setPrevImage() {
      coverflow.position = Math.max(1, coverflow.position - 1);
      coverflow.container.dataset.coverflowPosition = coverflow.position;

      forScale(coverflow.position);
    }

    function setNextImage() {
      coverflow.position = Math.min(
        coverflow.images.length,
        coverflow.position + 1
      );
      coverflow.container.dataset.coverflowPosition = coverflow.position;

      forScale(coverflow.position);
    }

    function jumpToImage(evt) {
      coverflow.position = Math.min(
        coverflow.images.length,
        Math.max(1, evt.target.dataset.coverflowIndex)
      );
      coverflow.container.dataset.coverflowPosition = coverflow.position;

      setTimeout(function () {
        forScale(coverflow.position);
      }, 1);
    }

    function onKeyPress(evt) {
      switch (evt.which) {
        case 37: //left arrow
          setPrevImage();
          break;
        case 39: //right arrow
          setNextImage();
          break;
      }
    }
    prevArrows.forEach(function (prevArrow) {
      prevArrow.addEventListener("click", setPrevImage);
    });
    nextArrows.forEach(function (nextArrow) {
      nextArrow.addEventListener("click", setNextImage);
    });
    coverflow.images.forEach(function (image) {
      image.addEventListener("click", jumpToImage);
    });
    window.addEventListener("keyup", onKeyPress);
  });
}

setupCoverflow();
