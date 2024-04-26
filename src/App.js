import logo from './logo.svg';
import './App.css';
import Appoint from './Components/Appoint';
import Doctor from './Components/Doctor';
import Patient from './Components/Patient';

import { BrowserRouter , Routes , Route , Link , useNavigate} from 'react-router-dom'

function App() {

  const isLink = (path)=> window.location.pathname === path
  return (
    <BrowserRouter>
      <div className='container'>
      <h1 style={{ color : "green"}}> Hospital Registry</h1>
      <nav>
        <ul>
          <li className={isLink('/appointments') ? 'active' : ''}>
          <Link to='/appointments'> Appointments</Link>

          </li>

          <li className={isLink('/doctors') ? 'active' : ''}>
          <Link to='/doctors'> Doctors</Link>

          </li>

          <li className={isLink('/patients') ? 'active' : ''}>
          <Link to='/patients'> Patients</Link>

          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/appointments" element={<Appoint/>}></Route>
        <Route path="/" element={<Appoint/>}></Route>
        <Route path="/doctors" element={<Doctor/>}></Route>
        <Route path="/patients" element={<Patient/>}></Route>
      </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
