import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector } from './store';
import Navbar from './components/Navbar/Navbar';
import ToastContainer from './components/Toast/Toast';
import PageTransition from './components/PageTransition/PageTransition';
import PageLoader from './components/PageLoader/PageLoader';
import './styles/main.scss';

// Each page is a separate async chunk — only fetched when first navigated to
const Home      = lazy(() => import('./pages/Home/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const FormDemo  = lazy(() => import('./pages/FormDemo/FormDemo'));
const Docs      = lazy(() => import('./pages/Docs/Docs'));
const Changelog = lazy(() => import('./pages/Changelog/Changelog'));

function ThemeSync() {
  const theme   = useAppSelector((s) => s.ui.theme);
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
        {/*
          Suspense wraps only the route area so the Navbar and Toast stay
          visible instantly. PageTransition sits inside Suspense so
          AnimatePresence only runs after the chunk has loaded.
        */}
        <Suspense fallback={<PageLoader />}>
          <PageTransition>
            <Routes>
              <Route path="/"          element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/form-demo" element={<FormDemo />} />
              <Route path="/docs"       element={<Docs />} />
              <Route path="/changelog" element={<Changelog />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </div>
      <ToastContainer />
    </>
  );
}

// basename must match vite.config base (minus trailing slash) so React Router
// strips the prefix before matching routes — fixes GitHub Pages subdirectory deploys.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <AppShell />
      </BrowserRouter>
    </Provider>
  );
}
