import { Link, useLocation } from 'react-router-dom';
import { toPathRelative } from '../helpers';
const { VITE_IMAGES_URL, PROD } = import.meta.env;

const CharactersByHero = ({ alter_ego, characters }) => {
  // if(alter_ego === characters) return(<></>);

  return alter_ego === characters ? <></> : <p>{characters}</p>;
};

export const HeroCard = ({
    id,
    superhero,
    alter_ego,
    first_appearance,
    characters,
  }) => {

  const location = useLocation();
  const urlImages = PROD ? toPathRelative(location.pathname, VITE_IMAGES_URL) : VITE_IMAGES_URL;

  // const charactersByHero = (<p>{characters}</p>)

  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={`${urlImages}/${id}.jpg`} className="card-img" alt={superhero} />
          </div>

          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{superhero}</h5>
              <p className="card-text">{alter_ego}</p>

              {/* {alter_ego !== characters && charactersByHero } */}

              <CharactersByHero characters={characters} alter_ego={alter_ego} />

              <p className="card-text">
                <small className="text-muted">{first_appearance}</small>
              </p>

              {/* Inserta el id del heroe en la ruta */}
              <Link to={`/heroes/hero/${id}`}>Mas...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
