import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './Components/Chat';
import Sidebar from './Components/Sidebar';
import { useStateValues } from './StateProvider';
import Login from './Components/Login';

function App() {
  const [{ user }] = useStateValues();
  return (
    <div className="app">
      {!user ? (<Login />) : (
        <div className='app__body'>
          <Sidebar />
          <Routes>
            <Route exact path='/' element={<> <Chat /></>} />
            <Route exact path='/rooms/:roomId' element={<><Chat /></>} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
