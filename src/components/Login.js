import { crearUsuarioConCorreoYContraseña } from '../lib';

export const Login = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  buttonLogin.textContent = 'Iniciar Sesión';
  buttonRegister.textContent = 'Registrarse';

  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/home');
  });

  HomeDiv.innerHTML += `
    <input id="input-email" placeholder="Ingrese correo" type="email">
    <input id="input-password" placeholder="Ingrese contraseña" type="password">
    `;

  const inputEmail = HomeDiv.querySelector('#input-email');
  const inputPassword = HomeDiv.querySelector('#input-password');

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    crearUsuarioConCorreoYContraseña(inputEmail.value, inputPassword.value).then(() => {
      onNavigate('/register');
    });
  });

  HomeDiv.appendChild(buttonRegister);
  HomeDiv.appendChild(buttonLogin);

  return HomeDiv;
};
