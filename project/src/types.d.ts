interface Document {
  exitFullscreen: () => Promise<void>;
  mozCancelFullScreen: () => Promise<void>;
  webkitExitFullscreen: () => Promise<void>;
  msExitFullscreen: () => Promise<void>;
  fullscreenElement: Element | null;
  mozFullScreenElement: Element | null;
  webkitFullscreenElement: Element | null;
  msFullscreenElement: Element | null;
}

interface Element {
  requestFullscreen: (options?: FullscreenOptions) => Promise<void>;
  webkitRequestFullscreen: (options?: FullscreenOptions) => Promise<void>;
  mozRequestFullScreen: (options?: FullscreenOptions) => Promise<void>;
  msRequestFullscreen: () => Promise<void>;
}
