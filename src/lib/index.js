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
  updateDoc,
  getDoc,
  //serverTimestamp,
  //orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
//serverTimestamp,
//orderBy,

export const crearUsuarioConCorreoYContraseña = (email, contraseña) =>
  createUserWithEmailAndPassword(auth, email, contraseña);

export const ingresarUsuarioConCorreoYContraseña = (email, contraseña) =>
  signInWithEmailAndPassword(auth, email, contraseña);

export const ingresarUsuarioConCuentaGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Exporta el usuario actual
export const getCurrentUser = () => auth.currentUser;

//Crea y guarda el post

export const crearPost = async (text) => {
  const createPost = await addDoc(collection(db, "publicaciones"), {
    // date: serverTimestamp(), //para poner las fechas ordenasdas
    contenido: text,
    // usuario: user,
    likes: [],
    userId: auth.currentUser.uid,
  });
};

//Muestra los post en pantalla
export const mostrarPost = (callback) =>
  onSnapshot(collection(db, "publicaciones"), callback);

//Borrar post
export const borrarPost = (id) => deleteDoc(doc(db, "publicaciones", id));

// Likes

export const addLike = async (id, userLike) => {
  await updateDoc(doc(db, "publicaciones", id), {
    likes: arrayUnion(userLike),
  });
};
export const removeLike = async (id, userLike) => {
  await updateDoc(doc(db, "publicaciones", id), {
    likes: arrayRemove(userLike),
  });
};
export const getUser = () => auth.currentUser;
export const getLikes = (id) => getDoc(doc(db, "publicaciones", id));

//Editar
export const getPost = (id) => getDoc(doc(db, "publicaciones", id));

export const updatePost = (postId, updatedData) => {
  return updateDoc(doc(db, "publicaciones", postId), updatedData);
};
