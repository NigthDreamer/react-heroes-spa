/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter/>', () => {

  test('Debe de mostrar el login si no está autenticado', () => {
    
    const contextValue = {
      logged: false
    }
    
    render(
      // No se puede usar el MemoryRouter aquí porque AppRouter ya instancia un Router
      <AuthContext.Provider value={contextValue}>
        <AppRouter/>
      </AuthContext.Provider>
    );

    expect(screen.getAllByText('Login').length).toBe(2);
  });

  test('Debe de mostrar el login si no está autenticado', () => {

    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'Juan Carlos'
      }
    }
    
    render(
      // No se puede usar el MemoryRouter aquí porque AppRouter ya instancia un Router
      <AuthContext.Provider value={contextValue}>
        <AppRouter/>
      </AuthContext.Provider>
    );

    expect(screen.getAllByText('Marvel').length).toBeGreaterThan(0);

  });
});
