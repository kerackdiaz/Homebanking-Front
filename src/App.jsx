import { useEffect, useState } from 'react';
import { Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import MainLayout from './layout/MainLayout'
import './App.css'
import SideBar from './components/SideBar';
import Client from './pages/Client';
import Account from './pages/Account';
import Cards from './pages/Cards';
import Loans from './pages/Loans';
import Transfers from './pages/Transfers';
import Transactions from './pages/Transactions';
import NewLons from './pages/NewLoans';
import NewCard from './pages/NewCard';
import NewAccount from './pages/NewAccount';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authReducer.user.loggedIn);
  const dispatch = useDispatch();


  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const handleLogin = () => {
    if(auth===null){
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    dispatch(logout());

  };
useEffect(() => {
  if(auth){
    navigate('/')
    console.log(auth)
  }else{
    navigate('/')
  }
},[auth])
  return (

      <MainLayout>
        {isLoggedIn ? (
          <>
            <SideBar />
            <Routes>
              <Route path="/" element={<Client />} />
              <Route path="/account/" element={<Account />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/transfers" element={<Transfers />} />
              <Route path='/transactions' element={<Transactions />} />
              <Route path="/loans/new" element={<NewLons />} />
              <Route path="/cards/new" element={<NewCard />} />
              <Route path="/account/new" element={<NewAccount />} />
              <Route path="/profile" element={<Profile />} />
              <Route  element={<SideBar onLogin={handleLogout} />} /> 
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          </Routes>
        )}
      </MainLayout>

  );
}

export default App;