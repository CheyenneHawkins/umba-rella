import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignUpPhone from './components/SignUpPhone';
import { AuthContextProvider } from './contexts/AuthContextNew';
import { Route, Routes } from "react-router-dom";
import Account from './components/Account';
import Header from './components/Header';
import Info from './components/Info';
import Weather from './components/Weather';
import Start from './components/Start';



function App() {
  return (
    <>
      <AuthContextProvider>
        <Header/>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signupphone" element={<SignUpPhone />} />
            <Route path="/account" element={<Account />} />
            <Route path="/info" element={<Info />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
      </AuthContextProvider>

    </>
  );
}

export default App;
