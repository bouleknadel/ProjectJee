import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComp from '../src/loginui/loginComponet';
import BonjourPage from '../src/homeui/BonjourPage';
import "primereact/resources/themes/lara-light-indigo/theme.css";  // thème
import "primereact/resources/primereact.min.css";                  // core css
import "primeicons/primeicons.css";                               // icons

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComp />} />
        <Route path="/bonjour" element={<BonjourPage />} />
      </Routes>
    </Router>
  );
}

export default App;
