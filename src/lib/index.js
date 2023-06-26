import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  serverTimestamp,
  orderBy,
  getDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

export const crearUsuarioConCorreoYContraseña = (email, contraseña) => createUserWithEmailAndPassword(auth, email, contraseña);

/* onAuthStateChanged(auth, (user) => {
  if (user) {
    onNavigate('/home');
  } else {
    onNavigate('/');
  }
}); */

export const ingresarUsuarioConCorreoYContraseña = (email, contraseña) => signInWithEmailAndPassword(auth, email, contraseña);

export const ingresarUsuarioConCuentaGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const crearPost = async (text) => {
  const createPost = await addDoc(collection(db, 'publicaciones'), {
    // date: serverTimestamp(), //para poner las fechas ordenasdas
    contenido: text,
    // usuario: user,
    likes: [],
    userId: auth.currentUser.uid,
  });
};

export const mostrarPost = (callback) => onSnapshot(collection(db, 'publicaciones'), callback);

/* export const mostrarPost = (callback) =>
    onSnapshot(
      collection(db, "publicaciones", orderBy(("date", "desc"))),
      callback
    ); */
export const borrarPost = (id) => deleteDoc(doc(db, 'publicaciones', id));

// 1:00:22 duda porque usa getTask //llegue al 1:02:58

// export const getTask = (id) => getDoc(doc(db, "publicaciones", id));

// Dar likes y contador de likes
export const addLike = async (id, userLike) => {
  await updateDoc(doc(db, 'publicaciones', id), {
    likes: arrayUnion(userLike),
  });
};
export const removeLike = async (id, userLike) => {
  await updateDoc(doc(db, 'publicaciones', id), {
    likes: arrayRemove(userLike),
  });
};

export const getUser = () => auth.currentUser;
export const getLikes = (id) => getDoc(doc(db, 'publicaciones', id));
