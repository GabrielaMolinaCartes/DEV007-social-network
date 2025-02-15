import {
  crearUsuarioConCorreoYContraseña,
  ingresarUsuarioConCuentaGoogle,
} from '../lib/index';
import logo from '../images/MonuTrip1.png';
import imgGoogle from '../images/logoGoogle.svg';

export const Register = (onNavigate) => {
  // Variables de divs del DOM
  const HomeDiv = document.createElement('div');
  const logoDiv = document.createElement('div');
  const logoImg = document.createElement('img');
  const registerDiv = document.createElement('form');
  // Variables de inputs y buttons
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const buttonRegister = document.createElement('button');
  const hrLine = document.createElement('hr');
  // Variables para register con google
  const buttonRegisterGoogle = document.createElement('button');
  const logoGoogleSpan = document.createElement('span');
  const logoGoogle = document.createElement('img');
  const textGoogleSpan = document.createElement('span');
  // Variable button volver al login
  const buttonBack = document.createElement('button');

  // Atributos de Variables del DOM
  HomeDiv.className = 'container_all';
  logoDiv.className = 'div_logo';
  registerDiv.className = 'container_login';
  // Atributos de imagen del título
  logoImg.className = 'img_logo';
  logoImg.src = logo;
  // Atributos de inputs y buttons
  inputName.className = 'input_login';
  inputName.id = 'nameId';
  inputName.type = 'text';
  inputName.required = true;
  inputName.placeholder = 'Ingrese nombre';
  inputEmail.id = 'inputEmail-id';
  inputEmail.classList.add('input_login');
  inputEmail.placeholder = 'Ingrese Correo';
  inputPassword.id = 'inputPassword-id';
  inputPassword.classList.add('input_login');
  inputPassword.type = 'password';
  inputPassword.placeholder = ' Ingrese Contraseña';
  buttonRegister.classList.add('login_button');
  buttonRegister.textContent = 'Registrarse';
  hrLine.className = 'line_hr';
  // Atributos de register con google
  buttonRegisterGoogle.className = 'google-button';
  logoGoogle.src = imgGoogle;
  logoGoogle.className = 'google-icon';
  logoGoogleSpan.className = 'google-button__icon';
  textGoogleSpan.className = 'google-button__text';
  textGoogleSpan.textContent = 'Registrarse con Google';
  // Atributos button volver login
  buttonBack.classList.add('back_button');
  buttonBack.textContent = 'Volver Atrás';

  // Event Listener de botones
  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    crearUsuarioConCorreoYContraseña(
      inputEmail.value,
      inputPassword.value,
    )
      .then(() => {
        onNavigate('/home');
      })
      .catch((err) => {
        const errorCode = err.code;
        if (errorCode === 'auth/email-already-in-use') {
          // eslint-disable-next-line no-alert
          alert('Este correo electrónico ya esta registrado');
        }
        if (errorCode === 'auth/invalid-email') {
          // eslint-disable-next-line no-alert
          alert('Ingrese un correo electrónico válido');
        }
        if (errorCode === 'auth/weak-password') {
          // eslint-disable-next-line no-alert
          alert('Ingrese contraseña de al menos 6 caracteres');
        }
      });
  });

  buttonRegisterGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    ingresarUsuarioConCuentaGoogle().then(() => {
      onNavigate('/home');
    });
  });

  buttonBack.addEventListener('click', () => onNavigate('/'));

  // Todos los Append Child
  HomeDiv.appendChild(logoDiv);
  HomeDiv.appendChild(registerDiv);
  logoDiv.appendChild(logoImg);
  registerDiv.appendChild(inputName);
  registerDiv.appendChild(inputEmail);
  registerDiv.appendChild(inputPassword);
  registerDiv.appendChild(buttonRegister);
  registerDiv.appendChild(hrLine);
  registerDiv.appendChild(buttonRegisterGoogle);
  buttonRegisterGoogle.appendChild(logoGoogleSpan);
  logoGoogleSpan.appendChild(logoGoogle);
  buttonRegisterGoogle.appendChild(textGoogleSpan);
  registerDiv.appendChild(buttonBack);

  return HomeDiv;
};
