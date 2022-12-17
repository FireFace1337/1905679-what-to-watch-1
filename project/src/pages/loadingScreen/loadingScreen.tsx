import { ThreeDots } from 'react-loader-spinner';

function LoadingScreen(): JSX.Element {
  return (
    <div className='user-page'>
      <ThreeDots
        height="80"
        width="100%"
        color="#dfcf77"
        wrapperStyle={{
          'position': 'absolute',
          'top': '50%',
          'left': '50%',
          'transform': 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
}

export default LoadingScreen;
