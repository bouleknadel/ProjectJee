import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComp from '../src/loginui/loginComponet';
import BonjourPage from '../src/homeui/BonjourPage';
import EnseignantList from '../src/components/EnseignantList'; // Import du composant EnseignantList
import LocalList from '../src/components/LocalList';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // thème
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import DepartementList from './components/DepartementList';
import DepartementEnseignantList from './components/DepartementEnseignantList';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginComp />} />
          <Route path="/bonjour" element={<BonjourPage />} />
          <Route path="/enseignant" element={<EnseignantList />} />{' '}
          <Route path="/local" element={<LocalList />} />
          <Route path="/departements" element={<DepartementList />} />
            <Route path="/departements/:departementId/enseignants" element={<DepartementEnseignantList />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
