import { MutableRefObject } from 'react';
import ProgressBar from './controls/progressBar';
import PlayButton from './controls/playButton';
import FullScreenButton from './controls/fullScreenButton';
import './playerControls.css';

type PlayerControlsProps = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  name: string;
  setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayerControls = ({videoRef, name, setIsWaiting}: PlayerControlsProps): JSX.Element => (
  <div className="player__controls">
    <ProgressBar videoRef={videoRef} />
    <div className="player__controls-row">
      <PlayButton videoRef={videoRef} setIsWaiting={setIsWaiting} />
      <div className="player__name">{name}</div>
      <FullScreenButton />
    </div>
  </div>
);

export default PlayerControls;
