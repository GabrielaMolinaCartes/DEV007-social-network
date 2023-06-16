//import { async } from "regenerator-runtime";
import { crearPost, mostrarPost } from "../lib/index.js";

export const Home = (onNavigate) => {
  const logoDiv = document.createElement("div");
  const logoImg = document.createElement("img");

  const HomeDiv = document.createElement("div");
  const postDiv = document.createElement("div");
  const titlePostLabel = document.createElement("label"); //para darle titulo al input
  const titlePost = document.createElement("input"); // input para escribir titulo dela publicacion
  const postPublish = document.createElement("textarea");
  const titlePublish = document.createElement("label"); //agregue el label para darle titulo al texarea
  const buttonPublish = document.createElement("button");
  const postFeedDiv = document.createElement("div");
  const buttonLogout = document.createElement("button");

  HomeDiv.className = "container_all";
  logoDiv.className = "div_logo";
  logoImg.className = "img_logo";
  logoImg.src = "images/MonuTrip.png";
  postDiv.className = "container_login";
  titlePostLabel.className = "title_post_label"; //el label
  titlePost.className = "title_post"; //el titulo del post
  titlePost.id = "id_title_post";
  titlePublish.className = "title_publish"; //clase del titulo post
  postPublish.className = "post_textarea";
  postPublish.placeholder = "Comparte tu experiencia....";
  postPublish.id = "post-textarea";
  postPublish.rows = "4"; //para q sean 4 lineas
  buttonPublish.className = "publish_button";
  postFeedDiv.id = "post-feed";
  buttonLogout.className = "logout_button";

  titlePostLabel.textContent = "Escribe titulo al post"; //agregue el titulo del post
  titlePublish.textContent = "Escribe un Post"; //agregue el titulo de donde se escribe el post
  buttonPublish.textContent = "Publicar";
  buttonLogout.textContent = "Cerrar sesión";

  buttonPublish.addEventListener("click", (e) => {
    e.preventDefault();
    const contentInput = document.getElementById("id_title_post").value;
    const contentTextarea = document.getElementById("post-textarea").value;
    crearPost(contentInput, contentTextarea).then(() => {
      //alert("Hola");
    });
  });

  const contentFeed = document.getElementById("post-feed");

  window.addEventListener("DOMContentLoaded", async () => {
    const querySnapshot = await mostrarPost();

    let html = "";
    querySnapshot.forEach((doc) => {
      const publicacion = doc.data();
      html += `
      <div>
        <h3>${publicacion.titulo}</h3>
        <p>${publicacion.contenido}</p>
      </div>
      `;
    });
    contentFeed.innerHTML = html;
  });

  buttonLogout.addEventListener("click", () => onNavigate("/"));

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
