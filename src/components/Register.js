import { crearUsuarioConCorreoYContraseña } from '../lib/index';

export const Register = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  HomeDiv.textContent = 'Bienvenido al Registro';
  const buttonHome = document.createElement('button');

  buttonHome.textContent = 'Aceptar Registro';

  HomeDiv.innerHTML += `
    <input id="input-name-user" placeholder="Ingrese nombre de usuario" type="text" required>
    <input id="input-email" placeholder="Ingrese correo" type="email">
    <input id="input-password" placeholder="Ingrese contraseña" type="password">
    `;

  const inputNameUser = HomeDiv.querySelector('#input-name-user');
  const inputEmail = HomeDiv.querySelector('#input-email');
  const inputPassword = HomeDiv.querySelector('#input-password');

  buttonHome.addEventListener('click', (e) => {
    e.preventDefault();
    crearUsuarioConCorreoYContraseña(inputNameUser.value, inputEmail.value, inputPassword.value)
      .then(() => {
        onNavigate('/home');
      });
  });

  HomeDiv.appendChild(buttonHome);

  return HomeDiv;
};
