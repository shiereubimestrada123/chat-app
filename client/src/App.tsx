import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import { useAppSelector } from '@/hooks/useAppSelector';
import { Login } from '@/pages/login/Login';
import { Loader } from '@/components/custom/Loader';

function App() {
  const navigate = useNavigate();
  const { loader } = useAppSelector(state => state.loaderReducer)

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {loader && <Loader />}
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
