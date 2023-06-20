//import { async } from "regenerator-runtime";
import { crearPost, mostrarPost, borrarPost } from "../lib/index.js";

export const Home = (onNavigate) => {
  //Variables de divs del Dom
  const HomeDiv = document.createElement("div");
  const logoDiv = document.createElement("div");
  const logoImg = document.createElement("img");
  const postDiv = document.createElement("div");
  //Variable de botón salir
  const buttonLogout = document.createElement("button");
  //Variables de formulario
  const titlePostLabel = document.createElement("label");
  const titlePost = document.createElement("input");
  const titlePublish = document.createElement("label");
  const postPublish = document.createElement("textarea");
  const buttonPublish = document.createElement("button");
  //Variables de publicaciones creadas
  const postFeedDiv = document.createElement("div");

  //Atributos de variables DOM
  HomeDiv.className = "container_all";
  logoDiv.className = "div_logo";
  postDiv.className = "container_login";
  //Atributo botón salir
  buttonLogout.className = "logout_button";
  buttonLogout.textContent = "Cerrar sesión";
  //Atributos de imagen del título
  logoImg.className = "img_logo";
  logoImg.src = "images/MonuTrip.png";
  //Atributos de formulario
  titlePostLabel.className = "title_post_label";
  titlePostLabel.textContent = "Escribe titulo al post";
  titlePost.id = "id_title_post";
  titlePost.className = "title_post";
  titlePublish.className = "title_publish";
  titlePublish.textContent = "Escribe un Post";
  postPublish.id = "post-textarea";
  postPublish.className = "post_textarea";
  postPublish.placeholder = "Comparte tu experiencia....";
  postPublish.rows = "4"; //para que sean 4 lineas
  buttonPublish.className = "publish_button";
  buttonPublish.textContent = "Publicar";
  //Atributos de publicaciones creadas
  postFeedDiv.id = "post-feed";

  //Event Listener de botones
  buttonLogout.addEventListener("click", () => onNavigate("/"));

  buttonPublish.addEventListener("click", (e) => {
    e.preventDefault();
    const contentInput = document.getElementById("id_title_post").value;
    const contentTextarea = document.getElementById("post-textarea").value;
    crearPost(contentInput, contentTextarea).then(() => {
      //alert("Hola");
    });
  });

  const contentFeed = document.getElementById("post-feed");

  mostrarPost((querySnapshot) => {
    let html = "";
    querySnapshot.forEach((doc) => {
      const publicacion = doc.data();
      html += `
      <div class="container_feed_post">
        <h3>${publicacion.titulo}</h3>
        <p>${publicacion.contenido}</p>
        <div class="button_feed_container">
        <button class="button_edit" data-id="${doc.id}" >Editar</button>
          <button class="button_delate" data-id="${doc.id}" >Borrar</button>
        </div>
      </div>
      `;

      limpiarInput(); //limpia el input
      limpiarTextarea(); //limpia textarea
    });

    postFeedDiv.innerHTML = html;

    //limpia input y textarea
    function limpiarInput() {
      document.getElementById("id_title_post").value = "";
    }

    function limpiarTextarea() {
      document.getElementById("post-textarea").value = "";
    }

    const buttonDelete = postFeedDiv.querySelectorAll(".button_delate");
    buttonDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        borrarPost(dataset.id);
      });
    });

    const buttonEdit = postFeedDiv.querySelectorAll(".button_edit");
    buttonEdit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target.dataset.id);
      });
    });
  });

  //Todos los Append Child
  HomeDiv.appendChild(logoDiv);
  HomeDiv.appendChild(postDiv);
  HomeDiv.appendChild(postFeedDiv);
  logoDiv.appendChild(logoImg);
  logoDiv.appendChild(buttonLogout);
  postDiv.appendChild(titlePostLabel);
  postDiv.appendChild(titlePost);
  postDiv.appendChild(titlePublish);
  postDiv.appendChild(postPublish);
  postDiv.appendChild(buttonPublish);

  return HomeDiv;
};
