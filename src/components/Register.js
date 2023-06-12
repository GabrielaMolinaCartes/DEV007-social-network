export const Register = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  HomeDiv.textContent = 'Bienvenido al Registro';
  const buttonHome = document.createElement('button');

  buttonHome.textContent = 'Aceptar Registrp';

  buttonHome.addEventListener('click', () => onNavigate('/home'));

  HomeDiv.appendChild(buttonHome);

  return HomeDiv;
};
