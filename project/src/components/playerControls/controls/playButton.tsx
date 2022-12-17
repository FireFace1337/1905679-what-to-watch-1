import { useState, MutableRefObject, useEffect, useRef } from 'react';

type PlayButtonProps = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>;
}

const PLAYING_DEBOUNCE_TIME = 50;
const WAITING_DEBOUNCE_TIME = 200;

const PlayButton = ({videoRef, setIsWaiting}: PlayButtonProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const isWaitingTimeout = useRef<NodeJS.Timeout | null>(null);
  const isPlayingTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const waitingHandler = () => {
      isWaitingTimeout.current && clearTimeout(isWaitingTimeout.current);

      isWaitingTimeout.current = setTimeout(() => {
        setIsWaiting(true);
      }, WAITING_DEBOUNCE_TIME);
    };

    const playHandler = () => {
      isWaitingTimeout.current && clearTimeout(isWaitingTimeout.current);
      isPlayingTimeout.current && clearTimeout(isPlayingTimeout.current);

      isPlayingTimeout.current = setTimeout(() => {
        setIsPlaying(true);
        setIsWaiting(false);
      }, PLAYING_DEBOUNCE_TIME);
    };

    const pauseHandler = () => {
      isWaitingTimeout.current && clearTimeout(isWaitingTimeout.current);
      isPlayingTimeout.current && clearTimeout(isPlayingTimeout.current);

      isPlayingTimeout.current = setTimeout(() => {
        setIsPlaying(false);
        setIsWaiting(false);
      }, PLAYING_DEBOUNCE_TIME);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('waiting', waitingHandler);
      video.addEventListener('play', playHandler);
      video.addEventListener('playing', playHandler);
      video.addEventListener('pause', pauseHandler);
    }

    return () => {
      isWaitingTimeout.current && clearTimeout(isWaitingTimeout.current);
      isPlayingTimeout.current && clearTimeout(isPlayingTimeout.current);

      if (video) {
        video.removeEventListener('waiting', waitingHandler);
        video.removeEventListener('play', playHandler);
        video.removeEventListener('playing', playHandler);
        video.removeEventListener('pause', pauseHandler);
      }
    };
  }, [setIsWaiting, videoRef]);

  const onPlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  if (videoRef.current) {
    videoRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
    });
  }

  return (
    <button type="button" className="player__play" onClick={() => onPlayClick()} data-testid='play'>
      {
        isPlaying
          ?
          <svg viewBox="0 0 14 21" width="14" height="21">
            <use xlinkHref="#pause"></use>
          </svg>
          :
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
      }
      <span>Play</span>
    </button>
  );
};

export default PlayButton;
