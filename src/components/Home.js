// import { async } from "regenerator-runtime";
import {
  crearPost,
  mostrarPost,
  borrarPost,
  addLike,
  getLikes,
  removeLike,
  getPost,
  updatePost,
} from '../lib/index.js';
import { getUser, auth } from '../firebase';

export const Home = (onNavigate) => {
  // Variables de divs del Dom
  const HomeDiv = document.createElement('div');
  const logoDiv = document.createElement('div');
  const logoImg = document.createElement('img');
  const postSection = document.createElement('section');
  const postDiv = document.createElement('form');
  const postFeedDiv = document.createElement('div');
  // Variable de botón salir
  const buttonLogout = document.createElement('button');
  const logoutImg = document.createElement('img');
  // Variables de formulario
  const titleWelcome = document.createElement('h2');
  const postPublish = document.createElement('input');
  const buttonPublish = document.createElement('button');

  // Atributos de variables DOM
  HomeDiv.className = 'container_all';
  HomeDiv.id = 'id-container-all';
  logoDiv.className = 'div_logo';
  postSection.className = 'section_post';
  postSection.id = 'id-section-post';
  postDiv.className = 'container_post';
  postDiv.id = 'id-container-post';
  // Atributo botón salir
  logoutImg.className = 'img_logout';
  logoutImg.src = 'images/logout1.png';
  buttonLogout.className = 'logout_button';

  // Atributos de imagen del título
  logoImg.className = 'img_logo';
  logoImg.src = 'images/MonuTrip1.png';
  // Atributos de formulario
  titleWelcome.className = 'welcome_title';
  titleWelcome.textContent = 'Bienvenida(o)';
  postPublish.id = 'post-input';
  postPublish.className = 'post_input';
  postPublish.placeholder = ' Comparte tu experiencia....';
  // postPublish.rows = "4"; // para que sean 4 lineas
  buttonPublish.className = 'publish_button';
  buttonPublish.textContent = 'Publicar';

  // Atributos de publicaciones creadas
  postFeedDiv.id = 'post-feed';

  // Event Listener de botones

  // Botón salir
  buttonLogout.addEventListener('click', () => onNavigate('/'));

  let postIdEditing = '';
  let editMode = false;
  // Botón publicar

  // Trim() elimina espacios en blanco y compara el resultado con una cadena vacía ('').

  buttonPublish.addEventListener('click', async (e) => {
    e.preventDefault();
    const contentInput = document.getElementById('post-input').value;
    if (contentInput.trim() === '') {
      // eslint-disable-next-line no-alert
      alert('¡Campo vacío! Ingrese Post');
      return;
    } if (editMode === false) {
      crearPost(contentInput).then(() => {});
    } else {
      const postInput = document.querySelector('#post-input');
      const updatedContent = postInput.value;
      await updatePost(postIdEditing, { contenido: updatedContent });
      mostrarPost();
      editMode = false;
      postIdEditing = '';
    }
  });

  // Limpia input
  function limpiarInput() {
    document.getElementById('post-input').value = '';
  }
  // Muestra los post, botonos editar, eliminar y likes en pantalla
  mostrarPost((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc) => {
      const currentUser = getUser();
      const dataLikes = doc.data();
      const userLike = dataLikes.likes.includes(currentUser.uid);
      const imgLikeButton = userLike ? 'like.png' : 'dislike.png';
      const publicacion = doc.data();
      const fecha = publicacion.date.toDate().toLocaleString();
      html += `
      <div class="container_feed_post" data-id="${doc.id}">
        <p class="content_date" >${fecha}</p>
        <p class="content_user">${publicacion.usuario}</p>
        <p class="content_post" id ="id-content-post">${publicacion.contenido}</p>
        <div class="button_feed_container">
          <div>
            <button class="like_btn" id="${doc.id}">
            <img src="images/${imgLikeButton}" class="like_heart" >${publicacion.likes.length}</img>
            </button>
          </div>
          <button class="button_edit" data-id="${doc.id}" >Editar</button>
          <button class="button_delete" data-id="${doc.id}" >Borrar</button>
        </div>
      </div>
      `;
      limpiarInput();
    });

    // Boton de likes
    function likeEvent() {
      const likeButton = postFeedDiv.querySelectorAll('.like_btn'); // tomamos el valor del selector
      likeButton.forEach((button) => {
        button.addEventListener('click', () => {
          const likeValue = button.id;
          const userId = getUser().uid;
          getLikes(likeValue).then((postLike) => {
            const allData = postLike.data();
            const posts = allData.likes;
            if (posts.includes(userId)) {
              removeLike(likeValue, userId);
            } else {
              addLike(likeValue, userId); // guardamos los parametros para entregarselos a las fx
            }
          });
        });
      });
    }

    postFeedDiv.innerHTML = html;
    likeEvent();

    const dialog = document.createElement('dialog');
    const dialogTitle = document.createElement('h3');
    const dialogMessage = document.createElement('p');
    const confirmButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    dialog.setAttribute('id', 'modal');
    confirmButton.setAttribute('id', 'confirmButton');
    cancelButton.setAttribute('id', 'cancelButton');
    dialogTitle.textContent = 'Eliminar publicación';
    dialogMessage.textContent = '¿Estás seguro que deseas eliminar esta publicación?';
    confirmButton.innerHTML = '<b>Eliminar</b>';
    cancelButton.innerHTML = '<b>Cancelar</b>';

    dialog.appendChild(dialogTitle);
    dialog.appendChild(dialogMessage);
    dialog.appendChild(confirmButton);
    dialog.appendChild(cancelButton);

    // para cuando se de en eliminar aparezca en modal con las opciones
    const deleteModal = doc.data();
    if (crearPost.userId === deleteModal.email) {
      deleteBtn.addEventListener('click', () => {
        document.body.appendChild(dialog);
        dialog.showModal();
      });

      // elimina publicación
      confirmButton.addEventListener('click', () => {
        deletePost(docum.id)
          .then(() => {
            dialog.close();
          });
      });

      // cancela publicación que se quiere eliminar
      cancelButton.addEventListener('click', () => {
        dialog.close();
      });
    }

    // Boton borrar
    const buttonDelete = postFeedDiv.querySelectorAll('.button_delete');
    buttonDelete.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        borrarPost(dataset.id);
      });
    });

    // Editar post
    const postForm = document.getElementById('id-container-post');
    const buttonEdit = postFeedDiv.querySelectorAll('.button_edit');

    buttonEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        // console.log(editMode);
        editMode = true;
        // console.log(editMode);
        const postId = e.target.dataset.id; // ID de un post específico cuando se hace click
        postIdEditing = postId;
        const doc = await getPost(postId);
        const task = doc.data(); // accede a los datos del post
        const postInput = postForm.querySelector('#post-input');
        if (postInput) {
          postInput.value = task.contenido;
        }
      });
    });
  });

  // Todos los Append Child
  HomeDiv.appendChild(logoDiv);
  HomeDiv.appendChild(postSection);
  postSection.appendChild(postDiv);
  postSection.appendChild(postFeedDiv);
  logoDiv.appendChild(logoImg);
  logoDiv.appendChild(buttonLogout);
  buttonLogout.appendChild(logoutImg);
  postDiv.appendChild(titleWelcome);
  postDiv.appendChild(postPublish);
  postDiv.appendChild(buttonPublish);

  return HomeDiv;
};
