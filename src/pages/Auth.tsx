import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Check } from "lucide-react";

export default function Auth() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"client" | "freelancer">("client");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const advantages = [
    { icon: "🚀", text: "Тысячи заказов ежедневно" },
    { icon: "🛡️", text: "Безопасные сделки и защита оплаты" },
    { icon: "⭐", text: "Рейтинговая система исполнителей" },
    { icon: "💬", text: "Встроенный чат и видеозвонки" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left column */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 p-12 text-white"
        style={{ background: "linear-gradient(160deg, #241C40 0%, #6F4BF2 100%)" }}>
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
              <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>D</span>
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Delora</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Дело в радость
          </h1>
          <p className="text-lg opacity-80 mb-12">
            Фриланс-биржа, где талант встречает возможности
          </p>
          <div className="flex flex-col gap-6">
            {advantages.map((a, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                  {a.icon}
                </div>
                <span className="opacity-90">{a.text}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setTab("register")}
          className="py-3 px-6 rounded-xl font-semibold text-center transition-all hover:scale-105"
          style={{ backgroundColor: "#CDF27E", color: "#241C40" }}>
          Начать работу →
        </button>
      </div>

      {/* Right column */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12" style={{ backgroundColor: "#F8F6FF" }}>
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#6F4BF2" }}>
              <span className="text-white font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>D</span>
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>Delora</span>
          </div>

          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
            {tab === "login" ? "Добро пожаловать" : "Создать аккаунт"}
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B6B8A" }}>
            {tab === "login" ? "Войдите в свой аккаунт Delora" : "Зарегистрируйтесь — это займёт минуту"}
          </p>

          {/* Tabs */}
          <div className="flex rounded-xl p-1 mb-6" style={{ backgroundColor: "#EBE7FA" }}>
            {(["login", "register"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: tab === t ? "#6F4BF2" : "transparent",
                  color: tab === t ? "#fff" : "#6B6B8A",
                }}>
                {t === "login" ? "Войти" : "Регистрация"}
              </button>
            ))}
          </div>

          <form onSubmit={e => { e.preventDefault(); navigate("/home"); }} className="flex flex-col gap-4">
            {tab === "register" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#1A1A2E" }}>Имя</label>
                  <input className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                    style={{ borderColor: "#E8E4FA", backgroundColor: "#fff", color: "#1A1A2E" }}
                    placeholder="Елена" />
                </div>
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#1A1A2E" }}>Фамилия</label>
                  <input className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 transition-all"
                    style={{ borderColor: "#E8E4FA", backgroundColor: "#fff", color: "#1A1A2E" }}
                    placeholder="Смирнова" />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "#1A1A2E" }}>Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                style={{ borderColor: "#E8E4FA", backgroundColor: "#fff", color: "#1A1A2E" }}
                placeholder="email@example.com" />
            </div>

            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "#1A1A2E" }}>Пароль</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none pr-12 transition-all"
                  style={{ borderColor: "#E8E4FA", backgroundColor: "#fff", color: "#1A1A2E" }}
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#6B6B8A" }}>
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {tab === "register" && (
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: "#1A1A2E" }}>Я хочу</label>
                <div className="grid grid-cols-2 gap-3">
                  {([
                    { value: "client", label: "Заказывать", sub: "Размещать заказы" },
                    { value: "freelancer", label: "Выполнять", sub: "Брать заказы" },
                  ] as const).map(opt => (
                    <button key={opt.value} type="button" onClick={() => setRole(opt.value)}
                      className="p-4 rounded-xl border-2 text-left transition-all"
                      style={{
                        borderColor: role === opt.value ? "#6F4BF2" : "#E8E4FA",
                        backgroundColor: role === opt.value ? "#F0EBFF" : "#fff",
                      }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{opt.label}</span>
                        {role === opt.value && <Check className="w-4 h-4" style={{ color: "#6F4BF2" }} />}
                      </div>
                      <span className="text-xs" style={{ color: "#6B6B8A" }}>{opt.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-white mt-2 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#6F4BF2" }}>
              {tab === "login" ? "Войти" : "Создать аккаунт"}
            </button>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px" style={{ backgroundColor: "#E8E4FA" }} />
              <span className="text-xs" style={{ color: "#6B6B8A" }}>или</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "#E8E4FA" }} />
            </div>

            <button type="button"
              className="w-full py-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
              style={{ borderColor: "#E8E4FA", color: "#1A1A2E", backgroundColor: "#fff" }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Войти через Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
