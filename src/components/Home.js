import { crearPost } from "../lib";

export const Home = (onNavigate) => {
  const logoDiv = document.createElement("div");
  const logoImg = document.createElement("img");

  const HomeDiv = document.createElement("div");
  const postDiv = document.createElement("div");
  const postPublish = document.createElement("textarea");
  const buttonPublish = document.createElement("button");
  const postFeedDiv = document.createElement("div");
  const buttonLogout = document.createElement("button");

  HomeDiv.className = "container_all";
  logoDiv.className = "div_logo";
  logoImg.className = "img_logo";
  logoImg.src = "images/MonuTrip.png";
  postDiv.className = "container_login";
  postPublish.className = "post_textarea";
  postPublish.placeholder = "Comparte tu experiencia....";
  postPublish.id = "post-textarea";
  buttonPublish.className = "publish_button";
  buttonLogout.className = "logout_button";

  buttonPublish.textContent = "Publicar";
  buttonLogout.textContent = "Cerrar sesión";

  /*postDiv.innerHTML += `
  <div class="new-post__container">
  <textarea class="new-post__container__textarea"></textarea>
  <button class="new-post__container__button">PUBLICAR</button>
  </div>
  `;*/

  /*buttonPublish
    .querySelector(".publish_button")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const contentTextarea = postPublish.querySelector(".post_textarea");
      crearPost(contentTextarea.value)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    });*/

  buttonPublish.addEventListener("click", (e) => {
    e.preventDefault();
    const contentTextarea = document.getElementById("post-textarea").value;
    createPost(contentTextarea);
    console.log("Se ha creado tu post");
  });

  buttonLogout.addEventListener("click", () => onNavigate("/"));

  HomeDiv.appendChild(logoDiv);
  HomeDiv.appendChild(postDiv);
  HomeDiv.appendChild(postFeedDiv);
  logoDiv.appendChild(logoImg);
  postDiv.appendChild(postPublish);
  postDiv.appendChild(buttonPublish);
  postFeedDiv.appendChild(buttonLogout);

  return HomeDiv;
};
