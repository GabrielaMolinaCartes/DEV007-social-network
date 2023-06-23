import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export const crearUsuarioConCorreoYContraseña = (email, contraseña) => {
  return createUserWithEmailAndPassword(auth, email, contraseña);
};

export const ingresarUsuarioConCorreoYContraseña = (email, contraseña) => {
  return signInWithEmailAndPassword(auth, email, contraseña);
};

export const ingresarUsuarioConCuentaGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const crearPost = async (text) => {
  const createPost = await addDoc(collection(db, "publicaciones"), {
    //date: serverTimestamp(), //para poner las fechas ordenasdas
    contenido: text,
    //usuario: user,
    like: [],
  });
};

export const mostrarPost = (callback) =>
  onSnapshot(collection(db, "publicaciones"), callback);

/* export const mostrarPost = (callback) =>
    onSnapshot(
      collection(db, "publicaciones", orderBy(("date", "desc"))),
      callback
    );*/
export const borrarPost = (id) => deleteDoc(doc(db, "publicaciones", id));

//1:00:22 duda porque usa getTask //llegue al 1:02:58

//export const getTask = (id) => getDoc(doc(db, "publicaciones", id));

// Dar likes y contador de likes
export const likePost = async (id, userLike) => {
  const likeRef = doc(db, "publicaciones", id); //accediendo a la colleccion de los posts
  const docSnap = await getDoc(likeRef); //estamos trayendo un post especifico con getDoc
  const postData = docSnap.data(); //nos permite agregar esta nueva data a cualquier elemneto de Dom
  const likesCount = postData.likesCounter;

  if (postData.likes.includes(userLike)) {
    await updateDoc(likeRef, {
      likes: arrayRemove(userLike),
      likesCounter: likesCount - 1,
    });
  } else {
    await updateDoc(likeRef, {
      likes: arrayUnion(userLike),
      likesCounter: likesCount + 1,
    });
  }
};
