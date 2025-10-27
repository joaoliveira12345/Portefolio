import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
