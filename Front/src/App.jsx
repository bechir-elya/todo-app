import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './Components/Header';
import Landing from './Pages/Landing';
import Register from './Pages/Register';
import { Route, Routes } from 'react-router-dom';
import TodoPage from './Pages/TodoPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import UserProfile from './Pages/UserProfile';
import Dashboard from './Pages/Dashboard';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='register' element={<Register />} />
        <Route path='todopage' element={<TodoPage />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
        <Route path='resetPassword' element={<ResetPassword />} />
        <Route path='userprofile/:id' element={<UserProfile />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
