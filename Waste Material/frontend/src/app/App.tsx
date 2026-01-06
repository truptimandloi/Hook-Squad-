import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import { LandingPage } from './components/LandingPage';
import { BuyerDashboard } from './components/BuyerDashboard';
import { SellerDashboard } from './components/SellerDashboard';

// Auth Context
interface AuthContextType {
  user: { role: 'buyer' | 'seller' | null; name: string } | null;
  login: (role: 'buyer' | 'seller', name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

function App() {
  const [user, setUser] = useState<{ role: 'buyer' | 'seller' | null; name: string } | null>(null);

  const login = (role: 'buyer' | 'seller', name: string) => {
    setUser({ role, name });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/buyer-dashboard"
            element={
              user?.role === 'buyer' ? <BuyerDashboard /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/seller-dashboard"
            element={
              user?.role === 'seller' ? <SellerDashboard /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
