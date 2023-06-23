//import { async } from "regenerator-runtime";
//import { async } from "regenerator-runtime";
import { crearPost, mostrarPost, borrarPost, likePost } from "../lib/index.js";

export const Home = (onNavigate) => {
  //Variables de divs del Dom
  const HomeDiv = document.createElement("div");
  const logoDiv = document.createElement("div");
  const logoImg = document.createElement("img");
  const postSection = document.createElement("section");
  const postDiv = document.createElement("div");
  const postFeedDiv = document.createElement("div");
  //Variable de botón salir
  const buttonLogout = document.createElement("button");
  const logoutImg = document.createElement("img");
  //Variables de formulario
  const titleWelcome = document.createElement("h2");
  const postPublish = document.createElement("input");
  const buttonPublish = document.createElement("button");

  //Atributos de variables DOM
  HomeDiv.className = "container_all";
  logoDiv.className = "div_logo";
  postSection.className = "section_post";
  postDiv.className = "container_post";
  //Atributo botón salir
  logoutImg.className = "img_logout";
  logoutImg.src = "images/logout.png";
  buttonLogout.className = "logout_button";

  //Atributos de imagen del título
  logoImg.className = "img_logo";
  logoImg.src = "images/MonuTrip.png";
  //Atributos de formulario
  titleWelcome.className = "welcome_title";
  titleWelcome.textContent = "Bienvenida(o)";
  postPublish.id = "post-input";
  postPublish.className = "post_input";
  postPublish.placeholder = " Comparte tu experiencia....";
  postPublish.rows = "4"; //para que sean 4 lineas
  buttonPublish.className = "publish_button";
  buttonPublish.textContent = "Publicar";
  //Atributos de publicaciones creadas
  postFeedDiv.id = "post-feed";

  //Event Listener de botones
  buttonLogout.addEventListener("click", () => onNavigate("/"));

  buttonPublish.addEventListener("click", (e) => {
    e.preventDefault();
    const contentInput = document.getElementById("post-input").value;
    crearPost(contentInput).then(() => {
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
        <p class="content_post" >${publicacion.contenido}</p>
        <div class="button_feed_container">
          <div>
            <button class="like_btn" id="id_like_btn">
            <img src="images/like.png" class="like_heart" >${publicacion.like}</img>
            </button>
          </div>
        <button class="button_edit" data-id="${doc.id}" >Editar</button>
        <button class="button_delete" data-id="${doc.id}" >Borrar</button>

        </div>
      </div>
      `;

      limpiarInput(); //limpia input
    });

    postFeedDiv.innerHTML = html;

    //limpia input

    function limpiarInput() {
      document.getElementById("post-input").value = "";
    }

    const buttonDelete = postFeedDiv.querySelectorAll(".button_delete");
    buttonDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        borrarPost(dataset.id);
      });
    });

    /*const buttonEdit = postFeedDiv.querySelectorAll(".button_edit");
    buttonEdit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target.dataset.id);
      });
    });*/
  });

  // Evento para dar likes
  const likeButton = postFeedDiv.querySelectorAll(".like_btn"); //tomamos el valor del selector
  likeButton.forEach((e) => {
    e.addEventListener("click", () => {
      const likeValue = e.value;
      const userId = auth.currentUser.uid;
      likePost(likeValue, userId); //guardamos los parametros para entregarselos a las funciones de index.js
    });
  });

  //Todos los Append Child
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
