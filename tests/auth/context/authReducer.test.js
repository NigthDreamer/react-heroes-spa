import { authReducer } from '../../../src/auth';

describe('Pruebas en authReducer', () => {
  test('Debe de devolver el estado por defecto', () => {
    const initialState = {
      logged: false,
      name: null,
    };

    const state = authReducer(initialState, {});

    expect(state).toBe(initialState);
  });

  test('Al llamar a la accion de login debe de autenticar y establecer el user', () => {
    const loginAction = {
      type: '[Auth] Login',
      payload: {
        id: '123',
        name: 'Fernando Herrera',
      },
    };

    const state = authReducer({}, loginAction);

    expect(state).toEqual({ logged: true, user: loginAction.payload });
  });

  test('Al llamar a la accion de logout debe de borrar el name del usuario y establecer logged en false', () => {
    const logoutAction = {
      type: '[Auth] Logout',
    };

    const state = authReducer({}, logoutAction);

    expect(state).toEqual({ logged: false, user: null });
  });
});
