import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComp from '../src/loginui/loginComponet';
import BonjourPage from '../src/homeui/BonjourPage';
import SessionDetails from '../src/pages/SessionDetails';

import "primereact/resources/themes/lara-light-indigo/theme.css";  // thème
import "primereact/resources/primereact.min.css";                  // core css
import "primeicons/primeicons.css";                               // icons
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyCodePage from './pages/VerifyCodePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComp />} />
        <Route path="/bonjour" element={<BonjourPage />} />
        <Route path="/session/:id" element={<SessionDetails />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="/verifycode" element={<VerifyCodePage />} />
      </Routes>
    </Router>
  );
}

export default App;
