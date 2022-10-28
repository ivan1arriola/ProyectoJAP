const INDEX = "index.html";
const ERROR =
  "Los datos ingresados no son validos, por favor, revise e inténtelo de nuevo";

const ids = ["email", "password"];



// Fetch all the forms we want to apply custom Bootstrap validation styles to
var forms = document.querySelectorAll(".needs-validation");

// Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach(function (form) {
  console.log(form);
  form.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (form.checkValidity()) {
        const user = document.getElementById("email").value;
        logIn(user);
      }
      form.classList.add("was-validated");
    },
    false
  );
});

const logIn = (user) => {
  localStorage.setItem("user", user);
  window.location = INDEX;
};

/**  https://stackoverflow.com/questions/71686512/gsi-logger-the-value-of-callback-is-not-a-function-configuration-ignored */
function decodeJwtResponse(token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

globalThis.inicioConGoogle = (response) => {
  const responsePayload = decodeJwtResponse(response.credential);

  perfilInfo = {
    id: responsePayload.sub,
    fullName: responsePayload.name,
    givenName: responsePayload.given_name,
    imageUrl: responsePayload.picture,
    email: responsePayload.email,
  };

  localStorage.setItem("perfilInfo", JSON.stringify(perfilInfo));

  logIn(responsePayload.name);
};
