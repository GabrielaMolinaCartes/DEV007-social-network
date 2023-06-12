import { crearPost } from '../lib';

export const Home = (onNavigate) => {
  const HomeDiv = document.createElement('div');
  HomeDiv.textContent = 'Bienvenido a Monutrip';
  HomeDiv.className = 'home-div';
  const buttonHome = document.createElement('button');

  buttonHome.classList = 'home-div__button';
  buttonHome.textContent = 'Regresar al Home';

  buttonHome.addEventListener('click', () => onNavigate('/'));

  HomeDiv.innerHTML += `
  <div class="new-post__container">
  <textarea class="new-post__container__textarea"></textarea>
  <button class="new-post__container__button">PUBLICAR</button>
  </div>
  <section class="posts">
  <div class="posts__post">
  <p>Este Monumento Nacional es muy bello y tiene grandes áreas verdes</p>
  <h6>Juanita Pérez</h6>
  </div>
  </section>
  `;

  HomeDiv.querySelector('.new-post__container__button').addEventListener('click', () => {
    const contenidoDelTextarea = HomeDiv.querySelector('.new-post__container__textarea');
    crearPost(contenidoDelTextarea.value).then(() => {
    }).catch((err) => {
      console.log(err);
    });
  });

  HomeDiv.appendChild(buttonHome);

  return HomeDiv;
};
