/* eslint-disable no-undef */
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes';

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

describe('Pruebas en <SearchPage/>', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe de mostrarse correctamente con valores por defecto', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test('Debe de mostrarse a Batman y el input con el valor de queryString', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('batman');

    const img = screen.getByRole('img');
    expect(img.src).toContain('dc-batman.jpg');

    const div = screen.getByTestId('search-div');
    expect(div.style.display).toBe('none');
  });

  test('Debe de mostrar un error si no se encuentra el hero (batman123)', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    );

    const error = screen.getByTestId('search-error-div');
    expect(error.style.display).not.toBe('none');
  });

  test('Debe de llamar al navigate al hacer el submit del formulario', () => {
    const inputValue = 'superman';

    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    );

    //Seteamos el valor del input
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {
      target: { name: 'searchText', value: inputValue },
    });

    //Hacemos el submit del formulario
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    screen.debug();

    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
  });
});
