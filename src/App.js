import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginComp from '../src/loginui/loginComponet';
import BonjourPage from '../src/homeui/BonjourPage';
import EnseignantList from '../src/components/EnseignantList'; // Import du composant EnseignantList
import LocalList from '../src/components/LocalList';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // thème
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // icons
import DepartementList from './components/DepartementList';
import DepartementEnseignantList from './components/DepartementEnseignantList';
import SessionDetails from '../src/pages/SessionDetails';
import "primereact/resources/themes/lara-light-indigo/theme.css";  // thème
import "primereact/resources/primereact.min.css";                  // core css
import "primeicons/primeicons.css";                               // icons
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyCodePage from './pages/VerifyCodePage';
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';

function LayoutWithSidebar({ children }) {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#2c3e50', // Couleur de fond
            color: '#ecf0f1', // Couleur du texte
            width: '250px',
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => ({
              color: active ? '#16a085' : '#ecf0f1', // Couleur des éléments actifs
              backgroundColor: active ? '#34495e' : 'transparent', // Fond des éléments actifs
              '&:hover': {
                backgroundColor: '#34495e', // Couleur au survol
                color: '#1abc9c',
              },
            }),
            label: {
              fontWeight: 'bold',
              fontSize: '14px',
            },
          }}
        >
          <SubMenu label="Navigation" icon={<i className="pi pi-chart-bar" style={{ fontSize: '18px' }} />}>
            <MenuItem icon={<i className="pi pi-pie-chart" />}>Pie charts</MenuItem>
            <MenuItem icon={<i className="pi pi-chart-line" />}>Line charts</MenuItem>
          </SubMenu>
          <MenuItem icon={<i className="pi pi-file" />}>Documentation</MenuItem>
          <MenuItem icon={<i className="pi pi-calendar" />}>Calendar</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#ecf0f1' }}>{children}</main>
    </div>
  );
}



function AppContent() {
  const location = useLocation();

  // Pages sans sidebar
  const noSidebarPaths = ['/', '/reset-password', '/verifycode'];

  const shouldShowSidebar = !noSidebarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowSidebar ? (
        <LayoutWithSidebar>
          <Routes>
            <Route path="/bonjour" element={<BonjourPage />} />
            <Route path="/enseignant" element={<EnseignantList />} />
            <Route path="/local" element={<LocalList />} />
            <Route path="/departements" element={<DepartementList />} />
            <Route path="/departements/:departementId/enseignants" element={<DepartementEnseignantList />} />
            <Route path="/session/:id" element={<SessionDetails />} />
          </Routes>
        </LayoutWithSidebar>
      ) : (
        <Routes>
          <Route path="/" element={<LoginComp />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verifycode" element={<VerifyCodePage />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;