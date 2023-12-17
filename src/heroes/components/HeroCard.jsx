import { Link } from 'react-router-dom';
const imagesUrl = import.meta.env.VITE_IMAGES_URL;

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
  const heroImageUrl = `${imagesUrl}/${id}.jpg`;

  // const charactersByHero = (<p>{characters}</p>)

  return (
    <div className="col animate__animated animate__fadeIn">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-4">
            <img src={heroImageUrl} className="card-img" alt={superhero} />
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
