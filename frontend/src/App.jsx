import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import LandingPage from "./pages/public/LandingPage";

import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import Wishlist from "./pages/buyer/Wishlist";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/buyer"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer/wishlist"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
