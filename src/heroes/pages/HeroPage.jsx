import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { getHeroById, toPathRelative } from '../helpers';
import { useMemo } from 'react';
const { VITE_IMAGES_URL, PROD } = import.meta.env;

export const HeroPage = () => {
  const navigate = useNavigate();
  
  const location = useLocation();
  const urlImages = PROD ? toPathRelative(location.pathname, VITE_IMAGES_URL) : VITE_IMAGES_URL;
  console.log(urlImages)

  //Este hook recoge los parametros pasados en la ruta
  const { id } = useParams();

  //Para que solo cargue el heroe si el id pasado por parametro cambia
  const hero = useMemo(()=> getHeroById(id), [id]);

  const onNavigateBack = () => {
    //El -1 es para volver un paso atras en el historial de navegacion
    navigate(-1);
  };

  if (!hero) {
    return <Navigate to="/heroes" />;
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`${urlImages}/${id}.jpg`}
          alt={hero.supehero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>
      <div className="col-8 animate__animated animate__fadeInUp">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b className="me-2">Alter ego:</b>
            {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b className="me-2">Publisher:</b>
            {hero.publisher}
          </li>
          <li className="list-group-item">
            <b className="me-2">First appearance:</b>
            {hero.first_appearance}
          </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>

        <button className="btn btn-outline-primary" onClick={onNavigateBack}>
          Back
        </button>
      </div>
    </div>
  );
};
