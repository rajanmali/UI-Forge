import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector } from './store';
import Navbar from './components/Navbar/Navbar';
import ToastContainer from './components/Toast/Toast';
import PageTransition from './components/PageTransition/PageTransition';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Docs from './pages/Docs/Docs';
import './styles/main.scss';

function ThemeSync() {
  const theme = useAppSelector((s) => s.ui.theme);
  const palette = useAppSelector((s) => s.ui.palette);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-palette', palette);
  }, [theme, palette]);
  return null;
}

function AppShell() {
  return (
    <>
      <ThemeSync />
      <div className="layout">
        <Navbar />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </PageTransition>
      </div>
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </Provider>
  );
}
