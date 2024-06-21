import './App.css';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './component/Header/header';

function App() {
  return (
    <div>
      {/* <Provider>  */}
      <Router>
      <Header/>
      <Routes>
        <Route path='/home' element={<Header/>}/>
      </Routes>
      </Router>
      {/* </Provider> */}
    </div>
  );
}

export default App;
