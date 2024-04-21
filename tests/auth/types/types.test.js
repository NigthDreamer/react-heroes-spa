/* eslint-disable no-undef */
import { types } from '../../../src/auth';

describe('Pruebas en types', () => {
  test('Debe de devolver estos types', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',
    });
  });
});
