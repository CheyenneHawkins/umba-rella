import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignUpPhone from './components/SignUpPhone';
import { AuthProvider } from './contexts/AuthContext';
import { AuthContextProvider } from './contexts/AuthContextNew';
import { Route, Routes } from "react-router-dom";
import Account from './components/Account';
import Header from './components/Header';
import Special from './components/Special';
import Weather from './components/Weather';



function App() {
  return (
    <>
      <AuthContextProvider>
      <Header/>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupphone" element={<SignUpPhone />} />
          <Route path="/account" element={<Account />} />
          <Route path="/special" element={<Special />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </AuthContextProvider>

    </>
  );
}

export default App;
