import { ingresarUsuarioConCorreoYContraseña, ingresarUsuarioConCuentaGoogle } from "../lib/index";

export const Login = (onNavigate) => {
  const logoDiv = document.createElement("div");
  const logoImg = document.createElement("img");

  const HomeDiv = document.createElement("div");
  const loginDiv = document.createElement("div");
  const inputEmail = document.createElement("input");
  const inputPassword = document.createElement("input");
  const buttonLogin = document.createElement("button");
  const buttonRegister = document.createElement("button");
  //const googleDiv = document.createElement("div");

  const buttonLoginGoogle = document.createElement("button");
  const logoGoogleSpan = document.createElement("span");
  const logoGoogle = document.createElement("svg");
  const textGoogleSpan = document.createElement("span");

  HomeDiv.className = "container_all";
  logoDiv.className = "div_logo";
  logoImg.className = "img_logo";
  loginDiv.className = "container_login";
  //googleDiv.className = "container_google";

  buttonLoginGoogle.className = "google-button";
  logoGoogleSpan.className = "google-button__icon";
  textGoogleSpan.className = "google-button__text";

  logoImg.src = "images/MonuTrip.png";
  inputEmail.id = "inputEmail-id";
  inputEmail.classList.add("input_login");
  inputEmail.placeholder = " Ingrese Correo";
  inputPassword.classList.add("input_login");
  inputPassword.type = "password";
  inputPassword.id = "inputPassword-id";
  inputPassword.placeholder = " Ingrese Contraseña";
  inputPassword.minLength = 6;
  inputPassword.required = true;

  buttonLogin.textContent = "Iniciar Sesión";
  buttonRegister.textContent = "Registrarse";
  textGoogleSpan.textContent = "Iniciar sesión con Google";

  buttonLogin.classList.add("login_button");
  buttonRegister.classList.add("login_button");


  buttonLogin.addEventListener("click", (e) => {
    e.preventDefault();
    ingresarUsuarioConCorreoYContraseña(
      inputEmail.value,
      inputPassword.value
    ).then(() => {
      onNavigate("/home");
    });
  });

  buttonRegister.addEventListener("click", (e) => {
    e.preventDefault();
    onNavigate("/register");
  });

  HomeDiv.appendChild(logoDiv);
  HomeDiv.appendChild(loginDiv);
  logoDiv.appendChild(logoImg);
  loginDiv.appendChild(inputEmail);
  loginDiv.appendChild(inputPassword);
  loginDiv.appendChild(buttonLogin);
  loginDiv.appendChild(buttonRegister);
  loginDiv.appendChild(buttonLoginGoogle);
  buttonLoginGoogle.appendChild(logoGoogleSpan);
  logoGoogleSpan.appendChild(logoGoogle);
  buttonLoginGoogle.appendChild(textGoogleSpan);


  return HomeDiv;
};
