// importamos la funcion que vamos a testear
// import { async } from "regenerator-runtime"; ?????
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ingresarUsuarioConCorreoYContraseña } from '../src/lib/index';

/* describe('myFunction', () => {
  it('debería ser una función', () => {
  expect(typeof myFunction).toBe('function');
  });
}); */

jest.mock('firebase/auth', () => {
  {
    () => {};
  } // quiero q retorne un objeto
});
// 1er test con mocks
describe('ingresarUsuarioConCorreoYContraseña', () => {
  // console.log(signInWithEmailAndPassword);
  it('Es una funcion', () => {
    expect(typeof ingresarUsuarioConCorreoYContraseña).toBe('function');
  });
  it('deberia llamar a la funcion signInWithEmailAndPassword', async () => {
    await ingresarUsuarioConCorreoYContraseña(
      'juanitaperez@mail.com',
      'juanita1234',
      () => {
        expect(signInWithEmailAndPassword).toHaveBeenCalled(1);
      },
    );
  });
  /* it('Deberia devolver un objeto.', async () => {
    const response = await ingresarUsuarioConCorreoYContraseña(
      'juanitaperez@mail.com',
      'juanita1234',
    );
    // eslint-disable-next-line no-console
    console.log(response);
    expect();
  }); */
});

// estos estaban antes, arriba empezo a usar mocks :S
/* it("Devuelve un objeto", async () => {
    const response = await ingresarUsuarioConCorreoYContraseña(
      "juanitarepez@mail.com",
      "juanita1234"
    );
    expect(typeof response).toBe("object");
  });
  it("Devuelve un objeto con la propiedad email", async () => {
    const response = await ingresarUsuarioConCorreoYContraseña(
      "juanitarepez@mail.com",
      "juanita1234"
    );
    expect(response.user).toHaveProperty("email");
  }); */
