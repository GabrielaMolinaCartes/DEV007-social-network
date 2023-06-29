// importamos la funcion que vamos a testear
// import { async } from "regenerator-runtime"; ?????
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, auth,
} from 'firebase/auth';
import { deleteDoc, getDoc, addDoc } from 'firebase/firestore';
import {
  crearUsuarioConCorreoYContraseña,
  ingresarUsuarioConCorreoYContraseña,
  ingresarUsuarioConCuentaGoogle,
  borrarPost,
  getPost,
  getLikes,
  crearPost,
} from '../src/lib/index';

jest.mock('firebase/auth');
// 1er test con mocks
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

describe('ingresarUsuarioConCuentaGoogle', () => {
  it('Es una funcion', () => {
    expect(typeof ingresarUsuarioConCuentaGoogle).toBe('function');
  });
  it('Deberia llamar a la funcion signInWithPopup()', async () => {
    await ingresarUsuarioConCuentaGoogle('monumento@mail.com', 'contraseña');
    expect(signInWithPopup).toHaveBeenCalled();
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

describe('getPost', () => {
  it('Es una función', () => {
    expect(typeof getPost).toBe('function');
  });
  it('deberia llamar a la funcion getDoc cuando es ejecutada', async () => {
    await getPost('id');
    expect(getDoc).toHaveBeenCalled();
  });
});

describe('getLikes', () => {
  it('Es una función', () => {
    expect(typeof getLikes).toBe('function');
  });
  it('deberia llamar a la funcion getDoc cuando es ejecutada', async () => {
    await getLikes('id');
    expect(getDoc).toHaveBeenCalled();
  });
});

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
describe('crearPost', () => {
  it('debería retornar un post creado', async () => {
    addDoc.mockReturnValueOnce({ text: 'Hola' });
    // console.log(mock);
    const mockAuthUser = jest.fn().mockResolvedValue();
    auth.currentUser.uid = mockAuthUser;
    const mockCrearPost = jest.fn().mockResolvedValue();
    await crearPost();
    expect(mockCrearPost).toHaveBeenCalled();
  });
});
