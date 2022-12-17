import { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCurrentFilm, getLoadingStatus } from '../../store/current-film-data/selectors';
import NotFound from '../notFound/notFound';
import PlayerControls from '../../components/playerControls/playerControls';
import { fetchFilmById } from '../../store/api-actions';
import LoadingScreen from '../loadingScreen/loadingScreen';

const loaderWrapperStyles: React.CSSProperties = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)'
};

function Player() : JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const filmId = String(useParams().filmId);

  const [isWaiting, setIsWaiting] = useState<boolean>(false);

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
      <video className="player__video" poster={currentFilm.backgroundImage} ref={videoRef} data-testid="video">
        <source src={currentFilm.videoLink} />
      </video>

      {
        isWaiting &&
        <div className='loader' style={loaderWrapperStyles}>
          <TailSpin
            height="150"
            width="150"
            color="#d9cd8d"
            ariaLabel="tail-spin-loading"
            radius="0"
            wrapperStyle={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </div>
      }

      <button type="button" className="player__exit" onClick={() => onExitClick()}>Exit</button>

      <PlayerControls videoRef={videoRef} name={currentFilm.name} setIsWaiting={setIsWaiting} />

    </div>
  );
}

export default Player;
