import { crearUsuarioConCorreoYContraseña } from '../lib';

export const Home = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  const buttonRegister = document.createElement('button');
  const buttonLogin = document.createElement('button');

  buttonRegister.textContent = 'Registrarse';
  buttonLogin.textContent = 'Iniciar Sesión';

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/register');
  });

  HomeDiv.innerHTML += `
    <input id="input-email" placeholder="Ingrese correo" type="email">
    <input id="input-password" placeholder="Ingrese contraseña" type="password">
    `;

  const inputEmail = HomeDiv.querySelector('#input-email');
  const inputPassword = HomeDiv.querySelector('#input-password');

  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    crearUsuarioConCorreoYContraseña(inputEmail.value, inputPassword.value).then(() => {
      onNavigate('/login');
    });
  });

  HomeDiv.appendChild(buttonRegister);
  HomeDiv.appendChild(buttonLogin);

  return HomeDiv;
};
