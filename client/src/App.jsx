import { Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import Layout from './components/Layout'
import Unauthorized from './components/Unauthorized'
import Missing from './components/Missing'
import RegistrationForm from "./components/RegistrationForm"
import LoginForm from "./components/LoginForm"
import { WelcomePage } from './components/Welcome'
import { ProblemsPage } from './components/Problems'
import { ProblemDetailPage } from './components/Problem'
import {ProfilePage} from './components/Profile'
import EmailVerification from './components/EmailVerification';
import { MyProblemsPage } from './components/MyProblems'
import { SolvedProblems } from './components/SolvedProblems'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegistrationForm />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="auth/:id/verify-email/:token" element={<EmailVerification />} />
        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="problems" element={<ProblemsPage />} />
          <Route path='profile/my' element={<MyProblemsPage/>}/>
          <Route path="/profile/solved-problems" element={<SolvedProblems/>} />
          <Route path="problems/:id" element={<ProblemDetailPage />} />
        </Route>
        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;