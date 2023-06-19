import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
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

export const crearPost = async (title, text) => {
  const createPost = await addDoc(collection(db, "publicaciones"), {
    titulo: title,
    contenido: text,
  });
};

export const mostrarPost = (callback) => onSnapshot(collection(db, "publicaciones"), callback);
