import { useState } from "react";
import {
  LayoutDashboard, Users, Briefcase, MessageSquare, Flag, Star, Settings,
  TrendingUp, CheckCircle, AlertTriangle, UserX, ChevronDown, Search
} from "lucide-react";
import { USERS, ORDERS, REPORTS } from "../data/mock";

type AdminSection = "dashboard" | "users" | "orders" | "responses" | "reports" | "chats" | "reviews" | "settings";

const NAV_ITEMS: { id: AdminSection; icon: typeof LayoutDashboard; label: string }[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Дашборд" },
  { id: "users", icon: Users, label: "Пользователи" },
  { id: "orders", icon: Briefcase, label: "Заказы" },
  { id: "responses", icon: MessageSquare, label: "Отклики" },
  { id: "reports", icon: Flag, label: "Жалобы" },
  { id: "chats", icon: MessageSquare, label: "Чаты" },
  { id: "reviews", icon: Star, label: "Отзывы" },
  { id: "settings", icon: Settings, label: "Настройки" },
];

const MOCK_CHART = [42, 68, 55, 80, 91, 78, 95, 88, 102, 115, 98, 130];
const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

export default function Admin() {
  const [section, setSection] = useState<AdminSection>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);

  const maxVal = Math.max(...MOCK_CHART);

  const stats = [
    { label: "Пользователей", val: "15 840", icon: Users, color: "#6F4BF2", bg: "#F0EBFF", trend: "+12%" },
    { label: "Активных заказов", val: "2 840", icon: Briefcase, color: "#241C40", bg: "#EBE7FA", trend: "+8%" },
    { label: "Откликов", val: "18 200", icon: MessageSquare, color: "#2ECC71", bg: "#E8FAF0", trend: "+23%" },
    { label: "Жалоб", val: REPORTS.length.toString(), icon: Flag, color: "#E74C3C", bg: "#FAE8E8", trend: "-5%" },
  ];

  const renderSection = () => {
    switch (section) {
      case "dashboard":
        return (
          <div className="flex flex-col gap-6">
            {/* Stats */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {stats.map(s => (
                <div key={s.label} className="bg-white rounded-2xl p-5 border shadow-sm" style={{ borderColor: "#E8E4FA" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                      <s.icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: s.trend.startsWith("+") ? "#E8FAF0" : "#FAE8E8",
                        color: s.trend.startsWith("+") ? "#2ECC71" : "#E74C3C" }}>
                      {s.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
                    {s.val}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#6B6B8A" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: "#E8E4FA" }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
                  Активность платформы
                </h3>
                <select className="text-sm px-3 py-1.5 rounded-lg border outline-none"
                  style={{ borderColor: "#E8E4FA", color: "#6B6B8A" }}>
                  <option>2025 год</option>
                </select>
              </div>
              <div className="flex items-end gap-2 h-40">
                {MOCK_CHART.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg transition-all hover:opacity-80"
                      style={{
                        height: `${(v / maxVal) * 100}%`,
                        backgroundColor: i === MOCK_CHART.length - 1 ? "#6F4BF2" : "#E8E4FA",
                        minHeight: "4px",
                      }} />
                    <span className="text-xs" style={{ color: "#6B6B8A" }}>{MONTHS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: "#E8E4FA" }}>
            <div className="p-5 border-b flex items-center justify-between gap-3" style={{ borderColor: "#E8E4FA" }}>
              <h3 className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
                Пользователи
              </h3>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm"
                style={{ borderColor: "#E8E4FA" }}>
                <Search className="w-4 h-4" style={{ color: "#6B6B8A" }} />
                <input placeholder="Поиск..." className="outline-none text-sm bg-transparent" style={{ color: "#1A1A2E" }} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8F6FF" }}>
                    {["Пользователь", "Email", "Роль", "Город", "Статус", "Действия"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "#6B6B8A" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {USERS.map(u => (
                    <tr key={u.id} className="border-t hover:bg-purple-50 transition-colors" style={{ borderColor: "#E8E4FA" }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                          <span className="font-medium" style={{ color: "#1A1A2E" }}>{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3" style={{ color: "#6B6B8A" }}>{u.email}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: u.role === "client" ? "#F0EBFF" : "#E8FAF0",
                            color: u.role === "client" ? "#6F4BF2" : "#2ECC71" }}>
                          {u.role === "client" ? "Заказчик" : "Исполнитель"}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ color: "#6B6B8A" }}>{u.city}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: blockedUsers.includes(u.id) ? "#FAE8E8" : "#CDF27E",
                            color: blockedUsers.includes(u.id) ? "#E74C3C" : "#241C40" }}>
                          {blockedUsers.includes(u.id) ? "Заблокирован" : "Активен"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setBlockedUsers(prev =>
                            prev.includes(u.id) ? prev.filter(id => id !== u.id) : [...prev, u.id])}
                          className="text-xs px-3 py-1.5 rounded-lg border transition-colors"
                          style={{
                            borderColor: blockedUsers.includes(u.id) ? "#2ECC71" : "#E74C3C",
                            color: blockedUsers.includes(u.id) ? "#2ECC71" : "#E74C3C",
                          }}>
                          {blockedUsers.includes(u.id) ? "Разблокировать" : "Заблокировать"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: "#E8E4FA" }}>
            <div className="p-5 border-b" style={{ borderColor: "#E8E4FA" }}>
              <h3 className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
                Все заказы
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#F8F6FF" }}>
                    {["Заказ", "Категория", "Бюджет", "Статус", "Дата", "Действия"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-xs" style={{ color: "#6B6B8A" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ORDERS.map(o => (
                    <tr key={o.id} className="border-t hover:bg-purple-50 transition-colors" style={{ borderColor: "#E8E4FA" }}>
                      <td className="px-4 py-3 max-w-xs">
                        <p className="font-medium truncate" style={{ color: "#1A1A2E" }}>{o.title}</p>
                      </td>
                      <td className="px-4 py-3" style={{ color: "#6B6B8A" }}>{o.category}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: "#241C40" }}>
                        {o.budget.toLocaleString("ru-RU")} ₽
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: o.status === "open" ? "#CDF27E" : o.status === "in_progress" ? "#F0EBFF" : "#E8FAF0",
                            color: o.status === "open" ? "#241C40" : o.status === "in_progress" ? "#6F4BF2" : "#2ECC71",
                          }}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3" style={{ color: "#6B6B8A" }}>
                        {new Date(o.createdAt).toLocaleDateString("ru-RU")}
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-red-50"
                          style={{ borderColor: "#E74C3C", color: "#E74C3C" }}>
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "reports":
        return (
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden" style={{ borderColor: "#E8E4FA" }}>
            <div className="p-5 border-b" style={{ borderColor: "#E8E4FA" }}>
              <h3 className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>Жалобы</h3>
            </div>
            <div className="flex flex-col divide-y" style={{ borderColor: "#E8E4FA" }}>
              {REPORTS.map(r => (
                <div key={r.id} className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#FAE8E8" }}>
                    <Flag className="w-5 h-5" style={{ color: "#E74C3C" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "#241C40" }}>{r.reason}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#6B6B8A" }}>{r.details}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#6B6B8A" }}>
                      {r.targetType === "user" ? "Пользователь" : "Заказ"} · {new Date(r.createdAt).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="text-xs px-3 py-1.5 rounded-lg font-medium transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "#CDF27E", color: "#241C40" }}>Удовлетворить</button>
                    <button className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
                      style={{ borderColor: "#E8E4FA", color: "#6B6B8A" }}>Отклонить</button>
                    <button className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-red-50"
                      style={{ borderColor: "#E74C3C", color: "#E74C3C" }}>Блокировать</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🚧</p>
            <p style={{ color: "#6B6B8A" }}>Раздел в разработке</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F8F6FF" }}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-60" : "w-16"} shrink-0 transition-all duration-200 flex flex-col`}
        style={{ backgroundColor: "#241C40" }}>
        <div className="flex items-center gap-3 px-4 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: "#6F4BF2" }}>
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>D</span>
          </div>
          {sidebarOpen && (
            <span className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              Admin
            </span>
          )}
        </div>
        <nav className="flex-1 py-3">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setSection(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all"
              style={{
                color: section === item.id ? "#CDF27E" : "rgba(255,255,255,0.6)",
                backgroundColor: section === item.id ? "rgba(111,75,242,0.3)" : "transparent",
              }}>
              <item.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 text-center border-t transition-colors hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.4)", borderColor: "rgba(255,255,255,0.1)" }}>
          <ChevronDown className={`w-4 h-4 mx-auto transition-transform ${sidebarOpen ? "rotate-90" : "-rotate-90"}`} />
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0 p-6 overflow-auto">
        <div className="max-w-5xl">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
            {NAV_ITEMS.find(n => n.id === section)?.label}
          </h2>
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
