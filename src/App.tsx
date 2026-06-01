import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector } from './store';
import Navbar from './components/Navbar/Navbar';
import ToastContainer from './components/Toast/Toast';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Docs from './pages/Docs/Docs';
import './styles/main.scss';

function ThemeSync() {
  const theme = useAppSelector((s) => s.ui.theme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return null;
}

function AppShell() {
  return (
    <>
      <ThemeSync />
      <div className="layout">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
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
