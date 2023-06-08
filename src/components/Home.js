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

  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/login');
  });

  HomeDiv.innerHTML += `
    <input placeholder="Ingrese correo" type="email">
    <input placeholder="Ingrese contraseña" type="password">
    `;

  HomeDiv.appendChild(buttonRegister);
  HomeDiv.appendChild(buttonLogin);

  return HomeDiv;
};
