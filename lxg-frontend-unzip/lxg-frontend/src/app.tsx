import { AppProvider } from './store/AppContext';
import './app.scss';

function App(props) {
  return (
    <AppProvider>
      {props.children}
    </AppProvider>
  );
}

export default App;
