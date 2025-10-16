
import Nav from './components/Nav.jsx';
import Registration from './pages/Registration.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'



function App() {
  return (

    <Router>
      <Nav />

      <Routes>
        <Route path='/register' element={<Registration />} />
      </Routes>


    </Router>
  );
}

export default App;
