// Main DOM elements:

const email = document.getElementById("email-input");
const password = document.getElementById("password-input");
const repeat = document.getElementById("repeat-input");
const conditions = document.getElementsByClassName("conditions-container")[0];
const signupButton = document.getElementById("sign-up-button");
const checkbox = document.getElementById("tou-input");

// Password conditions' list DOM elements:

const lowerCaseElem = document.getElementById("lowercase-check");
const upperCaseElem = document.getElementById("uppercase-check");
const numberElem = document.getElementById("number-check");
const specialElem = document.getElementById("special-check");
const lengthElem = document.getElementById("length-check");

// Conditions for a proper password:

let lowerCaseCheck = new RegExp("(?=.*[a-z])");
let upperCaseCheck = new RegExp("(?=.*[A-Z])");
let numberCheck = new RegExp("(?=.*[0-9])");
let specialCheck = new RegExp("(?=.*[^A-Za-z0-9])");
let lengthCheck = new RegExp("(?=.{8,})");

let partCheck = false; //Check for all RegExp conditions

//Bolden passed conditions:

password.addEventListener("keyup", () => {
  lowerCaseCheck.test(password.value)
    ? lowerCaseElem.classList.add("passed-condition")
    : lowerCaseElem.classList.remove("passed-condition");

  upperCaseCheck.test(password.value)
    ? upperCaseElem.classList.add("passed-condition")
    : upperCaseElem.classList.remove("passed-condition");

  numberCheck.test(password.value)
    ? numberElem.classList.add("passed-condition")
    : numberElem.classList.remove("passed-condition");

  specialCheck.test(password.value)
    ? specialElem.classList.add("passed-condition")
    : specialElem.classList.remove("passed-condition");

  lengthCheck.test(password.value)
    ? lengthElem.classList.add("passed-condition")
    : lengthElem.classList.remove("passed-condition");

  // If all conditions above are true, hide conditions container

  if (
    lowerCaseCheck.test(password.value) &&
    upperCaseCheck.test(password.value) &&
    numberCheck.test(password.value) &&
    specialCheck.test(password.value) &&
    lengthCheck.test(password.value)
  ) {
    conditions.style.display = "none";
    partCheck = true;
  } else {
    conditions.style.display = "flex";
    partCheck = false;
  }
});

//======================================================================================

// Eye icon DOM elements:

const passwordImgOff = document.getElementById("password-input__img--off");
const passwordImgOn = document.getElementById("password-input__img--on");
const repeatImgOff = document.getElementById("repeat-input__img--off");
const repeatImgOn = document.getElementById("repeat-input__img--on");

// Showing password when an eye icon is being held and hiding when released:

function showPassword() {
  passwordImgOn.classList.remove("hidden");
  password.type === "password"
    ? (password.type = "text")
    : (password.type = "password");
}

function hidePassword() {
  passwordImgOn.classList.add("hidden");
  password.type === "password"
    ? (password.type = "text")
    : (password.type = "password");
}

function showRepeat() {
  repeatImgOn.classList.remove("hidden");
  repeat.type === "password"
    ? (repeat.type = "text")
    : (repeat.type = "password");
}

function hideRepeat() {
  repeatImgOn.classList.add("hidden");
  repeat.type === "password"
    ? (repeat.type = "text")
    : (repeat.type = "password");
}

passwordImgOff.addEventListener("mousedown", showPassword);
passwordImgOff.addEventListener("touchstart", showPassword);

passwordImgOn.addEventListener("mouseup", hidePassword);
passwordImgOn.addEventListener("touchend", hidePassword);

repeatImgOff.addEventListener("mousedown", showRepeat);
repeatImgOff.addEventListener("touchstart", showRepeat);

repeatImgOn.addEventListener("mouseup", hideRepeat);
repeatImgOn.addEventListener("touchend", hideRepeat);

//======================================================================================

// Conditions for a proper email address

let mailCheck =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Signup final verification:

function validateForm() {
  if (!email.value.match(mailCheck)) {
    alert("Wrong email address");
    return false;
  }

  if (!partCheck) {
    alert("Insufficient password");
    return false;
  }

  if (repeat.value !== password.value) {
    alert("Passwords do not match");
    return false;
  }

  if (!checkbox.checked) {
    alert("You must agree to the Terms of use");
    return false;
  }

  // Allow for pressing sign up button when all necessary conditions are met:

  if (
    email.value.match(mailCheck) &&
    partCheck &&
    repeat.value === password.value &&
    checkbox.checked
  ) {
    // Reset all fields:

    partCheck = false;
    email.value = "";
    password.value = "";
    repeat.value = "";
    checkbox.checked = false;

    // Reset conditions container:

    if (partCheck) {
      conditions.style.display = "none";
    } else {
      conditions.style.display = "flex";
      lowerCaseElem.classList.remove("passed-condition");
      upperCaseElem.classList.remove("passed-condition");
      numberElem.classList.remove("passed-condition");
      specialElem.classList.remove("passed-condition");
      lengthElem.classList.remove("passed-condition");
    }

    alert("Form sent properly");
    return true;
  }
}
