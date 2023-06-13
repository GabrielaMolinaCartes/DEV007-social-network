import { crearUsuarioConCorreoYContraseña } from "../lib/index";

export const Register = (onNavigate) => {
  const logoDiv = document.createElement("div");
  const logoImg = document.createElement("img");

  const HomeDiv = document.createElement("div");
  const registerDiv = document.createElement("div");
  const inputEmail = document.createElement("input");
  const inputPassword = document.createElement("input");

  const buttonRegister = document.createElement("button");
  const buttonBack = document.createElement("button");

  HomeDiv.className = "container_all";
  logoDiv.className = "div_logo";
  logoImg.className = "img_logo";
  registerDiv.className = "container_login";

  logoImg.src = "images/MonuTrip.png";
  inputEmail.id = "inputEmail-id";
  inputEmail.classList.add("input_login");
  inputEmail.placeholder = "Ingrese Correo";
  inputPassword.classList.add("input_login");
  inputPassword.type = "password";
  inputPassword.id = "inputPassword-id";
  inputPassword.placeholder = " Ingrese Contraseña";
  inputPassword.minLength = 6;
  inputPassword.required = true;

  buttonRegister.textContent = "Registrarse";
  buttonBack.textContent = "Atrás";

  buttonBack.classList.add("login_button");
  buttonRegister.classList.add("login_button");

  buttonBack.addEventListener("click", () => onNavigate("/"));

  buttonRegister.addEventListener("click", (e) => {
    e.preventDefault();
    crearUsuarioConCorreoYContraseña(
      inputEmail.value,
      inputPassword.value
    ).then(() => {
      onNavigate("/home");
    });
  });

  HomeDiv.appendChild(logoDiv);
  HomeDiv.appendChild(registerDiv);
  logoDiv.appendChild(logoImg);
  registerDiv.appendChild(inputEmail);
  registerDiv.appendChild(inputPassword);
  registerDiv.appendChild(buttonRegister);
  registerDiv.appendChild(buttonBack);

  return HomeDiv;
};
