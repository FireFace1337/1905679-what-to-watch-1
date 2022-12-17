import { useState, MutableRefObject } from 'react';

type PlayButtonProps = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
}

const PlayButton = ({videoRef}: PlayButtonProps): JSX.Element => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const onPlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <button type="button" className="player__play" onClick={() => onPlayClick()}>
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
