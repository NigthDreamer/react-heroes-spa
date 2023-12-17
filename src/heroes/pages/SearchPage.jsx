import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { HeroCard } from '../components';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../helpers';

export const SearchPage = () => {
  const navigate = useNavigate();

  //Este hook muestra la localizacion actual del router
  const location = useLocation();

  /**
   * Con la dependencia 'query-string' podemos extraer de forma automática toda la información
   * contenida dentro de la propiedad search del objeto location. Dicha información será un
   * desglose de los query params
   */
  const { q = '' } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);

  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (event) => {
    event.preventDefault(); //Esto es para que al hacer el onSubmit, no se recarge la pagina

    //De esta forma mandamos un query parameter con el texto introducido
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />

            <button className="btn btn-outline-primary mt-3">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          {/* {q === '' ? (
            <div className="alert alert-primary mt-3">Search a hero</div>
          ) : (
            heroes.length === 0 && (
              <div className="alert alert-danger mt-3">
                No hero with <b>{q}</b>
              </div>
            )
          )} */}

          <div
            className="alert alert-primary mt-3 animate__animated animate__fadeIn"
            style={{ display: showSearch ? '' : 'none' }}
          >
            Search a hero
          </div>

          <div
            className="alert alert-danger mt-3 animate__animated animate__fadeIn"
            style={{ display: showError ? '' : 'none' }}
          >
            No hero with <b>{q}</b>
          </div>

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
