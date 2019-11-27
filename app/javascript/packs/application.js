require("turbolinks").start();

window.onload = function() {
  const regFormEl = document.getElementById("registration-form");

  if (Boolean(regFormEl)) {
    const { RegistrationForm } = require("packs/registration");
    RegistrationForm(regFormEl);
  }
};
