import { fireEvent, render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Navbar } from '../../../src/ui';

//Creo el mock del useNavigate
const mockedUseNavigate = jest.fn();

/**
 * Mockeo la librería donde se encuentra el useNavigate. OJO!!! La funcion anonima
 * devuelve un jsx con un objeto dentro, por eso los parentesis y despues las llaves
 */
jest.mock('react-router-dom', () => ({
  //Devuelvo todas las funciones de la librería
  ...jest.requireActual('react-router-dom'),
  /**
   * Expecto la funcion del hook que vamos a usar, la cual vamos a sobreescribir con
   * Nuestro mock
   */
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar/>', () => {
  const contextValue = {
    logged: true,
    user: {
      name: 'Juan Carlos',
    },
    logout: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe de mostrar el nombre del usuario', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Juan Carlos')).toBeTruthy();
  });

  test('Debe de llamar al logout y el navigate al hacer click en el boton', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole('button');
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});
