import {MouseEvent} from 'react';

type FilmCardType = {
  id: number;
  name: string;
  previewImage: string;
  onMouseOver: (evt: MouseEvent<HTMLDivElement>) => void;
}

function FilmCard({id, name, previewImage, onMouseOver}: FilmCardType): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={onMouseOver}>
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{name}</a>
      </h3>
    </article>
  );
}

export default FilmCard;
