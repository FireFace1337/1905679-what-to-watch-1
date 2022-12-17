const FullScreenButton = (): JSX.Element => {
  const onFullScreenClick = () => {
    if (!document.fullscreenElement) {
      const player = document.querySelector('.player');
      player?.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <button type="button" className="player__full-screen" onClick={() => onFullScreenClick()}>
      <svg viewBox="0 0 27 27" width="27" height="27">
        <use xlinkHref="#full-screen"></use>
      </svg>
      <span>Full screen</span>
    </button>
  );
};

export default FullScreenButton;
