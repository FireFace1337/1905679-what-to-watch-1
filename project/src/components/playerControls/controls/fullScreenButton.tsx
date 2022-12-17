const FullScreenButton = (): JSX.Element => {
  const player = document.querySelector('.player') as HTMLDivElement;

  const checkFullScreen = (): Element | null => (
    document.fullscreenElement
      || document.mozFullScreenElement
      || document.webkitFullscreenElement
      || document.msFullscreenElement
  );

  const exitFullscreen = (): void => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
  };

  const enterFullScreen = (): void => {
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.msRequestFullscreen) {
      player.msRequestFullscreen();
    } else if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen();
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    }
  };

  const onFullScreenClick = (): void => {
    if (checkFullScreen()) {
      exitFullscreen();
    } else {
      enterFullScreen();
    }
  };

  return (
    <button type="button" className="player__full-screen" onClick={() => onFullScreenClick()} data-testid='full_screen'>
      <svg viewBox="0 0 27 27" width="27" height="27">
        <use xlinkHref="#full-screen"></use>
      </svg>
      <span>Full screen</span>
    </button>
  );
};

export default FullScreenButton;
