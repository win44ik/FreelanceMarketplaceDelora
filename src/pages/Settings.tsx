import { useState } from "react";
import { Camera, Shield, Lock } from "lucide-react";
import { USERS } from "../data/mock";

const me = USERS.find(u => u.id === "me")!;
const TABS = ["Профиль", "Безопасность", "Приватность"] as const;

const BLOCKED: { id: string; name: string; avatar: string }[] = [
  { id: "b1", name: "Анонимный пользователь", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&auto=format" },
];

export default function Settings() {
  const [tab, setTab] = useState<typeof TABS[number]>("Профиль");
  const [blocked, setBlocked] = useState(BLOCKED);

  return (
    <div className="min-h-screen pb-24 md:pb-12" style={{ backgroundColor: "#F8F6FF" }}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
          Настройки
        </h1>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-6 inline-flex" style={{ backgroundColor: "#EBE7FA" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: tab === t ? "#6F4BF2" : "transparent",
                color: tab === t ? "#fff" : "#6B6B8A",
              }}>
              {t}
            </button>
          ))}
        </div>

        {tab === "Профиль" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#E8E4FA" }}>
            {/* Avatar */}
            <div className="flex items-center gap-5 mb-8">
              <div className="relative">
                <img src={me.avatar} alt={me.name} className="w-20 h-20 rounded-full object-cover border-4"
                  style={{ borderColor: "#A38DF2" }} />
                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#6F4BF2" }}>
                  <Camera className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <div>
                <p className="font-semibold" style={{ color: "#241C40" }}>{me.name}</p>
                <p className="text-sm" style={{ color: "#6B6B8A" }}>{me.email}</p>
                <button className="text-xs mt-1 hover:underline" style={{ color: "#6F4BF2" }}>Изменить фото</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Имя", placeholder: "Елена", defaultVal: "Елена" },
                { label: "Фамилия", placeholder: "Смирнова", defaultVal: "Смирнова" },
                { label: "Email", placeholder: "email@example.com", defaultVal: me.email },
                { label: "Телефон", placeholder: "+7 (999) 123-45-67", defaultVal: "" },
                { label: "Город", placeholder: "Москва", defaultVal: me.city },
              ].map(field => (
                <div key={field.label} className={field.label === "Email" ? "sm:col-span-2" : ""}>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: "#1A1A2E" }}>{field.label}</label>
                  <input defaultValue={field.defaultVal} placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-purple-400"
                    style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF" }} />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="text-sm font-medium mb-1.5 block" style={{ color: "#1A1A2E" }}>О себе</label>
                <textarea rows={4} defaultValue={me.bio}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-all focus:border-purple-400"
                  style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF" }} />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-6 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#6F4BF2" }}>
                Сохранить изменения
              </button>
            </div>
          </div>
        )}

        {tab === "Безопасность" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#E8E4FA" }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F0EBFF" }}>
                <Shield className="w-5 h-5" style={{ color: "#6F4BF2" }} />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#241C40" }}>Безопасность аккаунта</p>
                <p className="text-xs" style={{ color: "#6B6B8A" }}>Управление паролем и двухфакторной аутентификацией</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { label: "Текущий пароль", placeholder: "••••••••" },
                { label: "Новый пароль", placeholder: "••••••••" },
                { label: "Подтвердите новый пароль", placeholder: "••••••••" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-sm font-medium mb-1.5 block" style={{ color: "#1A1A2E" }}>{f.label}</label>
                  <input type="password" placeholder={f.placeholder}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                    style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF" }} />
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: "#F0EBFF" }}>
              <p className="text-sm font-medium mb-1" style={{ color: "#241C40" }}>Двухфакторная аутентификация</p>
              <p className="text-xs mb-3" style={{ color: "#6B6B8A" }}>Дополнительная защита для вашего аккаунта</p>
              <button className="text-xs font-medium px-4 py-2 rounded-lg text-white" style={{ backgroundColor: "#6F4BF2" }}>
                Подключить 2FA
              </button>
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-6 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#6F4BF2" }}>
                Изменить пароль
              </button>
            </div>
          </div>
        )}

        {tab === "Приватность" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#E8E4FA" }}>
            <h3 className="font-semibold mb-4" style={{ color: "#241C40" }}>Заблокированные пользователи</h3>
            {blocked.length === 0 ? (
              <div className="text-center py-12">
                <Lock className="w-10 h-10 mx-auto mb-3" style={{ color: "#A38DF2" }} />
                <p className="text-sm" style={{ color: "#6B6B8A" }}>Нет заблокированных пользователей</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {blocked.map(b => (
                  <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: "#E8E4FA" }}>
                    <img src={b.avatar} alt={b.name} className="w-10 h-10 rounded-full object-cover" />
                    <p className="flex-1 text-sm font-medium" style={{ color: "#241C40" }}>{b.name}</p>
                    <button onClick={() => setBlocked(prev => prev.filter(x => x.id !== b.id))}
                      className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-purple-50"
                      style={{ borderColor: "#6F4BF2", color: "#6F4BF2" }}>
                      Разблокировать
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
