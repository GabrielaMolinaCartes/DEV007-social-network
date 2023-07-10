import {
  ingresarUsuarioConCorreoYContraseña,
  ingresarUsuarioConCuentaGoogle,
} from '../lib/index';
import logo from '../images/MonuTrip1.png';
import imgGoogle from '../images/logoGoogle.svg';

export const Login = (onNavigate) => {
  // Variables de divs del DOM
  const HomeDiv = document.createElement('div');
  const logoDiv = document.createElement('div');
  const logoImg = document.createElement('img');
  const loginDiv = document.createElement('div');
  const registerContainer = document.createElement('section');
  // Variables de inputs y buttons
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const hrLine = document.createElement('hr');
  const titleRegister = document.createElement('p');
  const buttonRegister = document.createElement('button');
  // Variables para login con google
  const buttonLoginGoogle = document.createElement('button');
  const logoGoogleSpan = document.createElement('span');
  const logoGoogle = document.createElement('img');
  const textGoogleSpan = document.createElement('span');

  // Atributos de Variables DOM
  HomeDiv.className = 'container_all';
  logoDiv.className = 'div_logo';
  loginDiv.className = 'container_login';
  registerContainer.className = 'container_register';
  // Atributos de imagen del título
  logoImg.className = 'img_logo';
  logoImg.src = logo;
  // Atributos de inputs y buttons
  inputEmail.id = 'inputEmail-id';
  inputEmail.classList.add('input_login');
  inputEmail.placeholder = 'Ingrese Correo';
  inputPassword.id = 'inputPassword-id';
  inputPassword.classList.add('input_login');
  inputPassword.type = 'password';
  inputPassword.placeholder = ' Ingrese Contraseña';
  buttonLogin.classList.add('login_button');
  buttonLogin.textContent = 'Iniciar Sesión';
  hrLine.className = 'line_hr';
  titleRegister.className = 'register_title';
  titleRegister.textContent = '¿No tienes cuenta?';
  buttonRegister.classList.add('register_button');
  buttonRegister.textContent = 'Regístrate Aquí';
  // Atributos de login con google
  buttonLoginGoogle.className = 'google-button';
  logoGoogle.src = imgGoogle;
  logoGoogle.className = 'google-icon';
  logoGoogleSpan.className = 'google-button__icon';
  textGoogleSpan.className = 'google-button__text';
  textGoogleSpan.textContent = 'Iniciar sesión con Google';

  // Event Listener de botones
  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    ingresarUsuarioConCorreoYContraseña(inputEmail.value, inputPassword.value)
      .then(() => {
        onNavigate('/home');
      })
      .catch((err) => {
        const errorCode = err.code;
        if (errorCode === 'auth/invalid-email') {
          // eslint-disable-next-line no-alert
          alert('¡Campos vacíos! Ingrese sus datos para acceder');
        }
        if (errorCode === 'auth/user-not-found') {
          // eslint-disable-next-line no-alert
          alert('¡Usuario no encontrado! Regístrese para acceder');
        }
        if (errorCode === 'auth/wrong-password') {
          // eslint-disable-next-line no-alert
          alert('Contraseña Incorrecta');
        }
      });
  });

  buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/register');
  });

  buttonLoginGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    ingresarUsuarioConCuentaGoogle().then(() => {
      onNavigate('/home');
    });
  });

  // Todos los Append Child
  HomeDiv.appendChild(logoDiv);
  HomeDiv.appendChild(loginDiv);
  logoDiv.appendChild(logoImg);
  loginDiv.appendChild(inputEmail);
  loginDiv.appendChild(inputPassword);
  loginDiv.appendChild(buttonLogin);
  loginDiv.appendChild(hrLine);
  loginDiv.appendChild(buttonLoginGoogle);
  loginDiv.appendChild(registerContainer);
  registerContainer.appendChild(titleRegister);
  registerContainer.appendChild(buttonRegister);
  buttonLoginGoogle.appendChild(logoGoogleSpan);
  logoGoogleSpan.appendChild(logoGoogle);
  buttonLoginGoogle.appendChild(textGoogleSpan);

  return HomeDiv;
};
