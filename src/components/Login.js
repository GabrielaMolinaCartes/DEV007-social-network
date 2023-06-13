import { ingresarUsuarioConCorreoYContraseña } from "../lib/index";

export const Login = (onNavigate) => {
  const HomeDiv = document.createElement("div");
  const loginDiv = document.createElement("div");
  const buttonLogin = document.createElement("button");
  const buttonRegister = document.createElement("button");
  const containerLogin = document.createElement("div");
  const logo = document.createElement("div");

  HomeDiv.className = "container_all";
  loginDiv.className = "container_login";

  buttonLogin.textContent = "Iniciar Sesión";
  buttonRegister.textContent = "Registrarse";

  /*loginDiv.innerHTML += `
    <div class="logo">
      <img class="logo_imagen" src="images/MonuTrip.png" alt="logo">
    </div>
    <div class="container_login">
      <input class="input_login" id="input-email" placeholder="Ingrese correo" type="email">
      <input class="input_login" id="input-password" placeholder="Ingrese contraseña" type="password">
    </div>
    `;*/

  const inputEmail = loginDiv.querySelector("#input-email");
  const inputPassword = loginDiv.querySelector("#input-password");

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

  HomeDiv.appendChild(loginDiv);
  loginDiv.appendChild(containerLogin);
  loginDiv.appendChild(logo);
  containerLogin.appendChild(inputEmail);
  containerLogin.appendChild(inputPassword);
  containerLogin.appendChild(buttonLogin);
  containerLogin.appendChild(buttonRegister);

  return HomeDiv;
};
