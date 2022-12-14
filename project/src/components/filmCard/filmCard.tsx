import { Link } from 'react-router-dom';
import VideoPlayer from '../videoPlayer/videoPlayer';

type FilmCardProps = {
  name: string;
  previewImage: string;
  id: number;
  previewVideoLink: string;
  onMouseOver: (id: number) => void;
  onMouseOut: () => void;
  isActive: boolean;
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const {name, previewImage, id, previewVideoLink, onMouseOver, onMouseOut, isActive} = props;

  return (
    <article className="small-film-card catalog__films-card">
      <div
        className="small-film-card__image"
        onMouseOver={() => onMouseOver(id)}
        onMouseOut={() => onMouseOut()}
      >
        { isActive
          ? <VideoPlayer src={previewVideoLink} poster={previewImage} />
          : <img src={previewImage} alt={name} width="280" height="175" /> }
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
