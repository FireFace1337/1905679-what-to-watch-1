import { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCurrentFilm, getLoadingStatus } from '../../store/current-film-data/selectors';
import NotFound from '../notFound/notFound';
import PlayerControls from '../../components/playerControls/playerControls';
import { fetchFilmById } from '../../store/api-actions';
import LoadingScreen from '../loadingScreen/loadingScreen';

function Player() : JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const filmId = String(useParams().filmId);

  const currentFilm = useAppSelector(getCurrentFilm);
  const isLoading = useAppSelector(getLoadingStatus);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    dispatch(fetchFilmById(filmId));
  }, [dispatch, filmId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!currentFilm) {
    return <NotFound />;
  }

  const onExitClick = () => {
    navigate(-1);
  };

  return (
    <div className="player">
      <video className="player__video" poster={currentFilm.backgroundImage} ref={videoRef}>
        <source src={currentFilm.videoLink} />
      </video>

      <button type="button" className="player__exit" onClick={() => onExitClick()}>Exit</button>

      <PlayerControls videoRef={videoRef} />

    </div>
  );
}

export default Player;
