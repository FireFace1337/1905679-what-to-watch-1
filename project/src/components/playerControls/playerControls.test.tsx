import { render, screen } from '@testing-library/react';
import PlayerControls from './playerControls';

describe('Component: PlayerControls', () => {
  it('Should render correctly', () => {
    const reference = { current: null };

    render(
      <PlayerControls videoRef={reference} name='player_name' setIsWaiting={jest.fn()} />
    );

    expect(screen.getByTestId('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByTestId('play')).toBeInTheDocument();
    expect(screen.getByText('player_name')).toBeInTheDocument();
    expect(screen.getByTestId('full_screen')).toBeInTheDocument();
  });
});
