import { get } from "@github/webauthn-json";

const loginSuccessMsg = "You successfully logged in, ";
const loginErrorMsg = "Oh no, something went terribly wrong.";

const LoginForm = form => {
  const headers = getJsonHeaders();
  const infoContainer = document.getElementById("information");

  const login = async () => {
    const username = document.getElementById("username-field").value;

    const preparePayload = { login: { username } };

    const prepareRequest = await fetch("/login/prepare", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(preparePayload),
      headers
    });

    if (!prepareRequest.ok) {
      const errors = await prepareRequest.json();
      infoContainer.innerHTML = JSON.stringify(errors);
      return;
    }

    const webauthnPayload = await get({
      publicKey: await prepareRequest.json()
    });

    const loginRequest = await fetch("/login", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(webauthnPayload),
      headers
    });

    if (loginRequest.ok) {
      infoContainer.innerHTML = loginSuccessMsg + username;
    } else {
      infoContainer.innerHTML = loginErrorMsg;
    }
  };

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    login();
  });
};

// helper methods

const getCsrfToken = () => {
  const csrfTag = document.querySelector('meta[name="csrf-token"]');
  if (!csrfTag) return null;

  return csrfTag.getAttribute("content");
};

const getJsonHeaders = () => ({
  "x-csrf-token": getCsrfToken(),
  "content-type": "application/json",
  accept: "application/json"
});

export { LoginForm };
