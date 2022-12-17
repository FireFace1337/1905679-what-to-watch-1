import { render, screen } from '@testing-library/react';
import VideoPlayer from './videoPlayer';

describe('Component: VideoPlayer', () => {
  it('Should render correctly', () => {
    render(
      <VideoPlayer src='video.mp4' poster='poster.jpg' />
    );

    window.HTMLVideoElement.prototype.play = jest.fn();

    expect(screen.getByTestId('videoplayer')).toBeInTheDocument();
  });
});
