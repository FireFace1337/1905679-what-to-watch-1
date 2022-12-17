import { useState, useEffect, MutableRefObject, ChangeEvent } from 'react';

type ProgressBarProps = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
}

const ProgressBar = ({videoRef}: ProgressBarProps): JSX.Element => {
  const [timeLeft, setTimeLeft] = useState<string>('-00:00');
  const [progressValue, setProgressValue] = useState<number>(0);

  const getHHMMSS = (seconds: number | undefined): string => {
    if (seconds) {
      if (seconds < 3600) {
        return `-${new Date(seconds * 1000).toISOString().substring(14, 19).toString()}`;
      } else {
        return `-${new Date(seconds * 1000).toISOString().substring(11, 19).toString()}`;
      }
    }
    return '-00:00';
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', () => {
        if (videoRef.current) {
          const time = Math.round(videoRef.current.currentTime);
          if (videoRef.current.ended) {
            setTimeLeft('-00:00');
          } else {
            setTimeLeft(getHHMMSS(videoRef.current.duration - time));
          }
          setProgressValue(time);
        }
      });
    }
  }, [videoRef]);

  const onInputRangeChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Number(ev.target.value);
    }
  };

  const maxProgressValue = Math.floor(videoRef.current ? videoRef.current.duration : 0);

  return (
    <div className="player__controls-row" data-testid="progressbar">
      <div className="player__time">
        <input
          className="seek"
          id="seek"
          value={progressValue}
          min="0"
          max={maxProgressValue}
          type="range"
          step="1"
          onChange={(ev) => onInputRangeChange(ev)}
        />
        <progress className="player__progress" value={progressValue} max={maxProgressValue}></progress>
      </div>
      <div className="player__time-value">{timeLeft}</div>
    </div>
  );
};

export default ProgressBar;
