import { Link, useLocation } from "react-router-dom";
import { Home, Search, Plus, MessageCircle, User } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const items = [
    { to: "/home", icon: Home, label: "Главная" },
    { to: "/home", icon: Search, label: "Поиск" },
    { to: "/create-order", icon: Plus, label: "Создать" },
    { to: "/chat", icon: MessageCircle, label: "Чаты" },
    { to: "/profile/me", icon: User, label: "Профиль" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t"
      style={{ backgroundColor: "#241C40", borderColor: "rgba(255,255,255,0.1)" }}>
      <div className="flex">
        {items.map((item, i) => {
          const active = path === item.to;
          return (
            <Link key={i} to={item.to}
              className="flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors"
              style={{ color: active ? "#CDF27E" : "#9CA3AF" }}>
              {item.label === "Создать" ? (
                <div className="w-10 h-10 rounded-full flex items-center justify-center -mt-4"
                  style={{ backgroundColor: "#6F4BF2" }}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
              ) : (
                <item.icon className="w-5 h-5" />
              )}
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
