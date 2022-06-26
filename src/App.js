import './App.css';
import NavBar from './nav-bar';
import Home from './routes/home';
import {Route, Routes} from 'react-router-dom';
import Account from './routes/account';
import Deposit from './routes/deposit';
import Withdraw from './routes/withdraw';
import Data from './routes/data';
import Toast from './components/toast';

function App() {
  return (
    <div className="card">
        <Toast/>
        <NavBar/>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/account'} element={<Account/>}/>
            <Route path={'/deposit'} element={<Deposit/>}/>
            <Route path={'/withdraw'} element={<Withdraw/>}/>
            <Route path={'/data'} element={<Data/>}/>
        </Routes>
    </div>
  );
}

export default App;
