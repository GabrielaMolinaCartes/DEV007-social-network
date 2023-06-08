import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";

export const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)

