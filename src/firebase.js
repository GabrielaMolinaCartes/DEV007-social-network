// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-nGiEGbd9-_C9oIHBsEGf6nGbEw1eFxQ',
  authDomain: 'monutrip-82d19.firebaseapp.com',
  projectId: 'monutrip-82d19',
  storageBucket: 'monutrip-82d19.appspot.com',
  messagingSenderId: '862714919314',
  appId: '1:862714919314:web:9e420eb96257502873e94b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Conecta con authentication
export const auth = getAuth(app);
// Conecta con firestore
export const db = getFirestore(app);
// Autentifica el usuario
// export const user = auth.currentUser;
export const provider = new GoogleAuthProvider();
// función para obtener nombre de usuario logueado
export const getLoggedUser = () => {
  if (auth.currentUser) {
    localStorage.setItem('displayName', auth.currentUser.email);
  } else {
    // eslint-disable-next-line no-console
    console.log(null);
  }
};
