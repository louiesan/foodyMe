let mobMen = document.querySelector("#mobileM .fa-bars");
let isMen = false;
mobMen.onclick = () => {
  if (!isMen) {
    isMen = true;
    document.querySelector(".mobMen").classList.replace("hidden", "flex");
    document
      .querySelector("#mobileM .fa-bars")
      .classList.replace("fa-bars", "fa-xmark");
  } else {
    isMen = false;
    document.querySelector(".mobMen").classList.replace("flex", "hidden");
    document
      .querySelector("#mobileM .fa-xmark")
      .classList.replace("fa-xmark", "fa-bars");
  }
};
