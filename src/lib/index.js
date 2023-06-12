import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const crearUsuarioConCorreoYContraseña = (nombre, email, contraseña) => {
  return createUserWithEmailAndPassword(auth, nombre, email, contraseña)
};

export const ingresarUsuarioConCorreoYContraseña = (email, contraseña) => {
  return signInWithEmailAndPassword(auth, email, contraseña)
};

export const crearPost = (texto) => {
  return addDoc(collection(db, "publicaciones"),{
    contenido: texto
  })
};