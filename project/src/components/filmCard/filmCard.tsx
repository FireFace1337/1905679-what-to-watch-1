import { Link } from 'react-router-dom';
import { useState } from 'react';
import VideoPlayer from '../videoPlayer/videoPlayer';

type FilmCardProps = {
  name: string;
  previewImage: string;
  id: number;
  previewVideoLink: string;
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const {name, previewImage, id, previewVideoLink} = props;

  return (
    <article className="small-film-card catalog__films-card">
      <Link
        className="small-film-card__link"
        to={`/films/${id}`}
        onMouseOver={() => setIsActive(true)}
        onMouseOut={() => setIsActive(false)}
      >
        <div
          className="small-film-card__image"
        >
          { isActive
            ? <VideoPlayer src={previewVideoLink} poster={previewImage} />
            : <img src={previewImage} alt={name} width="280" height="175" /> }
        </div>
        <h3 className="small-film-card__title">{name}</h3>
      </Link>
    </article>
  );
}

export default FilmCard;
