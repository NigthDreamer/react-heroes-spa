/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas en <PrivateRoute/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe de mostrar el children si está autenticado', () => {
    //Mock de la funcion setItem del LocalStorage
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: 'abc',
        name: 'Juan Carlos',
      },
    };

    render(
      //Como el PublicRoute usa el authContext, debemos definirlo antes de renderizarlo
      <AuthContext.Provider value={contextValue}>
        {/* Creo el router para pruebas con la ruta inicial */}
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Ruta Privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Ruta Privada')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'lastpath',
      '/search?q=batman'
    );
  });
});
