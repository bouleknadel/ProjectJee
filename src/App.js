import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginComp from '../src/loginui/loginComponet';
import BonjourPage from '../src/homeui/BonjourPage';
import EnseignantList from '../src/components/EnseignantList';
import LocalList from '../src/components/LocalList';
import DepartementList from './components/DepartementList';
import DepartementEnseignantList from './components/DepartementEnseignantList';
import SessionDetails from '../src/pages/SessionDetails';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyCodePage from './pages/VerifyCodePage';
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function LayoutWithSidebar({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Ne plus setter collapsed automatiquement avec la taille de l'écran
      // pour permettre le contrôle manuel
      if (window.innerWidth < 768) {
        setCollapsed(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const navigationItems = [
    {
      path: '/session/:id',
      label: 'Tableau de bord',
      icon: 'pi pi-home'
    },
    {
      path: '/local',
      label: 'Gestion des Locaux',
      icon: 'pi pi-building'
    },
    {
      path: '/departements',
      label: 'Gestion des Départements',
      icon: 'pi pi-sitemap'
    },
    {
      path: '/enseignant',
      label: 'Gestion des Enseignants',
      icon: 'pi pi-users'
    },
    {
      path: '/bonjour',
      label: 'Sessions',
      icon: 'pi pi-calendar'
    }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
      {isMobile ? (
        // Bouton hamburger pour mobile
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          style={{
            position: 'fixed',
            top: '10px',
            left: showSidebar ? '260px' : '10px',
            zIndex: 1000,
            padding: '8px',
            backgroundColor: '#27337e',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
            transition: 'left 0.3s ease'
          }}
        >
          <i className={`pi ${showSidebar ? 'pi-times' : 'pi-bars'}`} />
        </button>
      ) : (
        // Bouton de toggle pour desktop
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: 'fixed',
            top: '10px',
            left: collapsed ? '90px' : '260px',
            zIndex: 1000,
            padding: '8px',
            backgroundColor: '#27337e',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
            transition: 'left 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px'
          }}
        >
          <i className={`pi ${collapsed ? 'pi-angle-right' : 'pi-angle-left'}`} />
        </button>
      )}

      <Sidebar
        collapsed={collapsed && !isMobile}
        toggled={showSidebar}
        onBackdropClick={() => setShowSidebar(false)}
        breakPoint="md"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: '#27337e',
            color: '#ffffff',
            width: collapsed && !isMobile ? '80px' : '250px',
            position: isMobile ? 'fixed' : 'relative',
            height: '100%',
            transition: 'all 0.3s ease',
            zIndex: 999,
          },
        }}
      >
        <div style={{ 
          padding: collapsed && !isMobile ? '20px 10px' : '20px', 
          marginBottom: '20px',
          textAlign: collapsed && !isMobile ? 'center' : 'left',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
        }}>
          <h1 style={{ 
            color: '#ffffff', 
            fontSize: collapsed && !isMobile ? '16px' : '24px',
            marginBottom: '0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {collapsed && !isMobile ? 'GL' : 'Gestion Locaux'}
          </h1>
        </div>

        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: '#ffffff',
              padding: collapsed && !isMobile ? '12px 8px' : '12px 24px',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }),
            label: {
              fontWeight: 'normal',
              fontSize: collapsed && !isMobile ? '14px' : '16px',
              display: collapsed && !isMobile ? 'none' : 'block',
            },
            icon: {
              marginRight: collapsed && !isMobile ? '0' : '8px',
              fontSize: '18px'
            }
          }}
        >
          {navigationItems.map((item) => (
            <MenuItem 
              key={item.path}
              active={location.pathname === item.path}
              icon={<i className={item.icon} />}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setShowSidebar(false);
              }}
              style={{ 
                backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                borderRadius: '8px',
                margin: '4px 8px',
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>

        <div style={{ 
          position: 'absolute', 
          bottom: '20px', 
          width: '100%', 
          padding: '0 16px' 
        }}>
          <button
            onClick={() => {
              localStorage.removeItem('access_token');
               localStorage.clear();
              
              navigate('/');
            }}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: collapsed && !isMobile ? '0' : '8px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <i className="pi pi-sign-out" />
            {!collapsed && !isMobile && 'Déconnexion'}
          </button>
        </div>
      </Sidebar>

      <main style={{ 
        flex: 1, 
        padding: '20px', 
        backgroundColor: '#f5f6f8',
        overflow: 'auto',
        marginLeft: isMobile ? 0 : 'auto',
      }}>
        {children}
      </main>
    </div>
  );
}

// Le reste du code reste inchangé...

function AppContent() {
  const location = useLocation();
  const noSidebarPaths = ['/','/bonjour', '/reset-password', '/verifycode'];
  const shouldShowSidebar = !noSidebarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowSidebar ? (
        <LayoutWithSidebar>
          <Routes>
          <Route path="/session/:id" element={<SessionDetails />} />
            <Route path="/enseignant" element={<EnseignantList />} />
            <Route path="/local" element={<LocalList />} />
            <Route path="/departements" element={<DepartementList />} />
            <Route path="/departements/:departementId/enseignants" element={<DepartementEnseignantList />} />
          </Routes>
        </LayoutWithSidebar>
      ) : (
        <Routes>
                      <Route path="/bonjour" element={<BonjourPage />} />

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