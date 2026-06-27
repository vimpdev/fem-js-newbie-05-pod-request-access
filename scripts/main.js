const signupForm = document.querySelector(".signup-form");
const emailInput = document.querySelector("#email");
const errorMessage = document.querySelector("#error-message");
const toast = document.querySelector(".toast");

let toastTimeout;

function getErrorMessage(input) {
  if (input.validity.valueMissing) {
    return "Oops! Please add your email";
  }

  if (input.validity.typeMismatch || input.validity.patternMismatch) {
    return "Oops! Please check your email";
  }

  return "";
}

function showError() {
  errorMessage.textContent = getErrorMessage(emailInput);
  errorMessage.removeAttribute("hidden");

  emailInput.setAttribute("aria-describedby", "error-message");
  emailInput.setAttribute("aria-invalid", "true");
  emailInput.focus();

}

function clearError() {
  errorMessage.setAttribute("hidden", "");

  emailInput.removeAttribute("aria-describedby");
  emailInput.removeAttribute("aria-invalid");

  errorMessage.textContent = "";
}


function showToast(message) {
  clearTimeout(toastTimeout);

  toast.textContent = message;

  toast.removeAttribute("hidden");

  toast.classList.remove("is-hiding");
  toast.classList.add("is-visible");

  toastTimeout = setTimeout(() => {
    toast.classList.add("is-hiding");
  }, 3000);
}


signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!emailInput.validity.valid) {
    showError();
    return;
  }

  clearError();
  signupForm.reset();

  showToast("Thanks! We'll notify you soon.");
});

emailInput.addEventListener("input", () => {
  if (emailInput.validity.valid) {
    clearError();
  }
});

toast.addEventListener("animationend", (e) => {
  if (e.animationName === "toast-exit") {
    toast.setAttribute("hidden", "");

    toast.classList.remove("is-visible");
    toast.classList.remove("is-hiding");
  }
});