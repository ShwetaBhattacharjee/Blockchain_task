import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Navbar } from "./components/Layout/Navbar";
import { HomePage } from "./pages/HomePage";
import { ListingsPage } from "./pages/ListingsPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { DashboardPage } from "./pages/DashboardPage";
import WalletModal from "./components/WalletModal";
import Alert from "./components/Alert";
import { isWalletConnected } from "./Blockchain.services";

const AppContent: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>(["1", "4"]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if wallet is already connected on app load
    isWalletConnected();
  }, []);

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/listings"
          element={
            <ListingsPage
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route
          path="/property/:id"
          element={
            <PropertyDetailPage onToggleFavorite={handleToggleFavorite} />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onPropertyClick={handlePropertyClick}
            />
          }
        />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>

      {/* Modal and Alert components - Always rendered */}
      <WalletModal />
      <Alert />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
