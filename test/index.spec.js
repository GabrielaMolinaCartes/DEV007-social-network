// importamos la funcion que vamos a testear
// import { async } from "regenerator-runtime"; ?????
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,
} from 'firebase/auth';
import {
  deleteDoc, getDoc, addDoc, onSnapshot, updateDoc,
} from 'firebase/firestore';
import {
  crearUsuarioConCorreoYContraseña,
  ingresarUsuarioConCorreoYContraseña,
  ingresarUsuarioConCuentaGoogle,
  borrarPost,
  getPost,
  getLikes,
  crearPost,
  updatePost,
  mostrarPost,
  addLike,
  removeLike,
  // removeLike,
} from '../src/lib/index';
import { auth } from '../src/firebase';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../src/firebase.js', () => ({
  auth: {
    currentUser: {
      displayName: 'Javier',
      email: 'javier1234@mail.com',
      uid: '1234567',
    },
  },
}));

describe('crearUsuarioConCorreoYContraseña', () => {
  it('Es una funcion', () => {
    expect(typeof crearUsuarioConCorreoYContraseña).toBe('function');
  });
  it('deberia llamar a la funcion createUserWithEmailAndPassword cuando es ejecutada', async () => {
    await crearUsuarioConCorreoYContraseña('hola12345@mail.com', 'hola12345', () => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalled(1);
    });
  });
  it('Deberia devolver un objeto.', async () => {
    createUserWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'hola12345@mail.com' } });
    const response = await crearUsuarioConCorreoYContraseña('hola12345@mail.com', 'hola12345');
    expect(response.user.email).toBe('hola12345@mail.com');
  });
});

describe('ingresarUsuarioConCorreoYContraseña', () => {
  it('Es una funcion', () => {
    expect(typeof ingresarUsuarioConCorreoYContraseña).toBe('function');
  });
  it('deberia llamar a la funcion signInWithEmailAndPassword cuando es ejecutada', async () => {
    await ingresarUsuarioConCorreoYContraseña(
      'juanitaperez@mail.com',
      'juanita1234',
      () => {
        expect(signInWithEmailAndPassword).toHaveBeenCalled(1);
      },
    );
  });
  it('Deberia devolver un objeto.', async () => {
    signInWithEmailAndPassword.mockReturnValueOnce({ user: { email: 'juanitaperez@mail.com' } });
    const response = await ingresarUsuarioConCorreoYContraseña(
      'juanitaperez@mail.com',
      'juanita1234',
    );
    expect(response.user.email).toBe('juanitaperez@mail.com');
  });
});

describe('ingresarUsuarioConCuentaGoogle', () => {
  it('Es una funcion', () => {
    expect(typeof ingresarUsuarioConCuentaGoogle).toBe('function');
  });
  it('Deberia llamar a la funcion signInWithPopup()', async () => {
    await ingresarUsuarioConCuentaGoogle('monumento@mail.com', 'contraseña');
    expect(signInWithPopup).toHaveBeenCalled();
  });
  it('Deberia devolver datos del usuario una vez logeado', async () => {
    signInWithPopup.mockReturnValueOnce({ user: 'Javier Perez' });
    const provider = GoogleAuthProvider.mockReturnValueOnce({});
    // eslint-disable-next-line no-console
    console.log(provider);
    const response = await ingresarUsuarioConCuentaGoogle();
    expect(response.user).toBe('Javier Perez');
  });
});

describe('crearPost', () => {
  it('Es una función', () => {
    expect(typeof crearPost).toBe('function');
  });
  it('debería retornar un post creado', async () => {
    const mockAddDoc = jest.fn().mockResolvedValue({ text: 'Hola' });
    addDoc.mockImplementationOnce(mockAddDoc);
    auth.currentUser = {
      uid: '1234567',
    };
    await crearPost('Hola');
    expect(mockAddDoc).toHaveBeenCalled();
  });
});

// Aqui va mostrar post
describe('mostrarPost', () => {
  it('Es una función', () => {
    expect(typeof mostrarPost).toBe('function');
  });
  it('deberia llamar a la funcion deleteDoc cuando es ejecutada', async () => {
    await mostrarPost('ID');
    expect(onSnapshot).toHaveBeenCalled();
  });
});

describe('borrarPost', () => {
  it('Es una función', () => {
    expect(typeof borrarPost).toBe('function');
  });
  it('deberia llamar a la funcion deleteDoc cuando es ejecutada', async () => {
    await borrarPost('ID');
    expect(deleteDoc).toHaveBeenCalled();
  });
});
// Aqui va add like
describe('addLike', () => {
  it('Es una función', () => {
    expect(typeof addLike).toBe('function');
  });
  it('deberia llamar a la funcion addLikes cuando es ejecutada', async () => {
    await addLike('id');
    expect(updateDoc).toHaveBeenCalled();
  });
});

// Aqui va remove like
describe('removeLike', () => {
  it('Es una función', () => {
    expect(typeof removeLike).toBe('function');
  });
  it('deberia llamar a la funcion removeLike cuando es ejecutada', async () => {
    await removeLike('id');
    expect(updateDoc).toHaveBeenCalled();
  });
});

describe('getLikes', () => {
  it('Es una función', () => {
    expect(typeof getLikes).toBe('function');
  });
  it('deberia llamar a la funcion getLikes cuando es ejecutada', async () => {
    await getLikes('id');
    expect(getDoc).toHaveBeenCalled();
  });
});

describe('getPost', () => {
  it('Es una función', () => {
    expect(typeof getPost).toBe('function');
  });
  it('deberia llamar a la funcion getDoc cuando es ejecutada', async () => {
    await getPost('id');
    expect(getDoc).toHaveBeenCalled();
  });
});

// Aqui va update post
describe('updatePost', () => {
  it('Es una función', () => {
    expect(typeof updatePost).toBe('function');
  });
  it('deberia llamar a la funcion updateDoc cuando es ejecutada', async () => {
    await updatePost('id');
    expect(updateDoc).toHaveBeenCalled();
  });
});
