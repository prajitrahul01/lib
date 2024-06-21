import './App.css';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './component/Header/header';
import Front from './component/Front';
import CascadingImages from './component/Front';
import CascadingImg from './component/Front/try';

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
