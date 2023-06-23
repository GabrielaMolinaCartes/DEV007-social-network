import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export const crearUsuarioConCorreoYContraseña = (email, contraseña) => {
  return createUserWithEmailAndPassword(auth, email, contraseña);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    onNavigate('/home');
  } else {
    onNavigate('/');
  }
});

export const ingresarUsuarioConCorreoYContraseña = (email, contraseña) => {
  return signInWithEmailAndPassword(auth, email, contraseña);
};

export const ingresarUsuarioConCuentaGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const crearPost = async (text) => {
  const createPost = await addDoc(collection(db, "publicaciones"), {
    contenido: text,
  });
};

export const mostrarPost = (callback) =>
  onSnapshot(collection(db, "publicaciones"), callback);

export const borrarPost = (id) => deleteDoc(doc(db, "publicaciones", id));

//1:00:22 duda porque usa getTask //llegue al 1:02:58

//export const getTask = (id) => getDoc(doc(db, "publicaciones", id));
