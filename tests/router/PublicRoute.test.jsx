import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('Pruebas en <PublicRoute/>', () => {
  test('Debe de mostrar el children si no está autenticado', () => {
    const contextValue = {
      logged: false,
    };

    render(
      //Como el PublicRoute usa el authContext, debemos definirlo antes de renderizarlo
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Ruta Publica</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Ruta Publica')).toBeTruthy();
  });

  test('Debe de navegar si está autenticado', () => {

    const contextValue = {
      logged: true,
      user: {
        name: 'Strider',
        id: 'ABC123',
      },
    };

    render(
      //Como el PublicRoute usa el authContext, debemos definirlo antes de renderizarlo
      <AuthContext.Provider value={contextValue}>
        {/* Creo el router para pruebas con la ruta inicial */}
        <MemoryRouter initialEntries={['/login']}>
          {/* Creo las dos rutas a las que se va a navegar en funcion de si el usuario
          está logeado o no */}
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Ruta Publica</h1>
                </PublicRoute>
              }
            />
            <Route path="heroes" element={<h1>Página Marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Página Marvel')).toBeTruthy();
  });
});
