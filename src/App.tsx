import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import CreateOrder from "./pages/CreateOrder";
import OrderDetail from "./pages/OrderDetail";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notifications";
import Wishlist from "./pages/Wishlist";
import MyReports from "./pages/MyReports";
import Admin from "./pages/Admin";

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideNav = location.pathname === "/auth" || location.pathname === "/admin";

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && <Navbar />}
      <div className="flex-1">{children}</div>
      {!hideNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
