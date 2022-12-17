import { MutableRefObject } from 'react';
import ProgressBar from './playerControls/progressBar';
import PlayButton from './playerControls/playButton';
import FullScreenButton from './playerControls/fullScreenButton';
import './playerControls.css';

type PlayerControlsProps = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
}

const PlayerControls = ({videoRef}: PlayerControlsProps): JSX.Element => (
  <div className="player__controls">
    <ProgressBar videoRef={videoRef} />
    <div className="player__controls-row">
      <PlayButton videoRef={videoRef} />
      <div className="player__name">Transpotting</div>
      <FullScreenButton />
    </div>
  </div>
);

export default PlayerControls;
