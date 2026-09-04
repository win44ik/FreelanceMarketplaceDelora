import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Bell, MessageCircle, ChevronDown, Search, Plus, Menu, X,
  User, Settings, Heart, BookOpen, Flag, LogOut, LayoutDashboard
} from "lucide-react";
import { USERS, NOTIFICATIONS } from "../data/mock";

const me = USERS.find(u => u.id === "me")!;
const unreadNotifs = NOTIFICATIONS.filter(n => !n.read).length;
const unreadChats = 3;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    { id: "dev", name: "Разработка" },
    { id: "design", name: "Дизайн" },
    { id: "marketing", name: "Маркетинг" },
    { id: "copy", name: "Копирайтинг" },
    { id: "translate", name: "Переводы" },
    { id: "consult", name: "Консультации" },
  ];

  return (
    <nav style={{ backgroundColor: "#241C40" }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-16 gap-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 shrink-0">
          <div style={{ backgroundColor: "#6F4BF2" }} className="w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>D</span>
          </div>
          <span className="text-white font-bold text-xl hidden sm:block" style={{ fontFamily: "'Playfair Display', serif" }}>
            Delora
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            placeholder="Найти заказ..."
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}
          />
        </div>

        {/* Categories */}
        <div className="hidden md:flex relative">
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="flex items-center gap-1 text-gray-300 hover:text-white text-sm transition-colors py-1 px-2"
          >
            Категории <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {catOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-48 z-50">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setCatOpen(false); navigate("/home"); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-purple-50 transition-colors"
                  style={{ color: "#1A1A2E" }}
                >
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1" />

        {/* Icons */}
        <div className="flex items-center gap-2">
          <Link to="/notifications" className="relative p-2 text-gray-300 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                style={{ backgroundColor: "#CDF27E", color: "#241C40" }}>
                {unreadNotifs}
              </span>
            )}
          </Link>
          <Link to="/chat" className="relative p-2 text-gray-300 hover:text-white transition-colors">
            <MessageCircle className="w-5 h-5" />
            {unreadChats > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                style={{ backgroundColor: "#6F4BF2", color: "#fff" }}>
                {unreadChats}
              </span>
            )}
          </Link>

          {/* Create order */}
          <Link to="/create-order"
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#6F4BF2" }}>
            <Plus className="w-4 h-4" />
            Создать заказ
          </Link>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 rounded-lg p-1 hover:bg-white/10 transition-colors"
            >
              <img src={me.avatar} alt={me.name} className="w-8 h-8 rounded-full object-cover border-2 border-purple-400" />
              <ChevronDown className="w-3.5 h-3.5 text-gray-300 hidden sm:block" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-52 z-50">
                <div className="px-4 py-2 border-b border-gray-100 mb-1">
                  <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{me.name}</p>
                  <p className="text-xs" style={{ color: "#6B6B8A" }}>{me.email}</p>
                </div>
                {[
                  { to: "/profile/me", icon: User, label: "Мой профиль" },
                  { to: "/favorites", icon: Heart, label: "Избранное" },
                  { to: "/wishlist", icon: BookOpen, label: "Подписки" },
                  { to: "/my-reports", icon: Flag, label: "Мои жалобы" },
                  { to: "/admin", icon: LayoutDashboard, label: "Админ-панель" },
                  { to: "/settings", icon: Settings, label: "Настройки" },
                ].map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-purple-50 transition-colors"
                    style={{ color: "#1A1A2E" }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: "#6F4BF2" }} />
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button
                    onClick={() => { setUserMenuOpen(false); navigate("/auth"); }}
                    className="flex items-center gap-3 px-4 py-2 text-sm w-full text-left hover:bg-red-50 transition-colors"
                    style={{ color: "#E74C3C" }}
                  >
                    <LogOut className="w-4 h-4" />
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-300">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ backgroundColor: "#1a1330" }} className="md:hidden px-4 py-4 border-t border-white/10">
          <div className="flex relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input placeholder="Найти заказ..." className="w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }} />
          </div>
          <Link to="/create-order" onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 w-full justify-center py-2 rounded-lg text-white text-sm font-medium mb-2"
            style={{ backgroundColor: "#6F4BF2" }}>
            <Plus className="w-4 h-4" /> Создать заказ
          </Link>
          <div className="grid grid-cols-2 gap-1">
            {categories.map(c => (
              <button key={c.id} onClick={() => setMenuOpen(false)}
                className="text-left px-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/10">
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
