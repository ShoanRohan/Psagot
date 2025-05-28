import './App.css';
import store from './features/store';
import AppRouter from './routers/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CourseSearch from './components/CourseSearch';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
        {/* <CourseSearch/> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
