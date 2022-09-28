import MainPage from '../../pages/main-page/main-page';

type mainInfo = {
  year: number;
  genre: string;
  title: string;
}

function App({year, genre, title}: mainInfo): JSX.Element {
  return (
    <MainPage mainInfo = {{year, genre, title}}/>
  );
}

export default App;
