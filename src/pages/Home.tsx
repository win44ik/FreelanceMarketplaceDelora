import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase } from "lucide-react";
import OrderCard from "../components/OrderCard";
import { ORDERS, CATEGORIES, FAVORITES } from "../data/mock";

export default function Home() {
  const [favorites, setFavorites] = useState<string[]>(FAVORITES);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleFav = (id: string) =>
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const filtered = activeCategory
    ? ORDERS.filter(o => o.category === activeCategory)
    : ORDERS;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6FF" }}>
      {/* Banner */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#241C40" }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #6F4BF2 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-medium mb-3 tracking-widest uppercase"
              style={{ color: "#CDF27E" }}>Фриланс-биржа Delora</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Найди исполнителя<br />
              <span style={{ color: "#A38DF2" }}>для своего проекта</span>
            </h1>
            <p className="text-gray-400 mb-8 max-w-md mx-auto md:mx-0">
              Тысячи профессионалов готовы помочь с вашим заказом. Разместите заказ бесплатно и получите отклики уже сегодня.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link to="/create-order"
                className="px-8 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#6F4BF2" }}>
                Создать заказ <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/profile/me"
                className="px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 border hover:bg-white/5 transition-colors"
                style={{ color: "#CDF27E", borderColor: "#CDF27E" }}>
                <Briefcase className="w-4 h-4" /> Стать исполнителем
              </Link>
            </div>
          </div>
          <div className="hidden md:block shrink-0">
            <div className="grid grid-cols-2 gap-3 w-72">
              {[
                { label: "Заказов активно", val: "2 840" },
                { label: "Исполнителей", val: "12 400" },
                { label: "Выполнено", val: "98 200" },
                { label: "Средний рейтинг", val: "4.8 ★" },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</p>
                  <p className="text-xs mt-1" style={{ color: "#A38DF2" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
          Категории
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATEGORIES.map(cat => (
            <button key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all hover:shadow-md"
              style={{
                backgroundColor: activeCategory === cat.id ? "#6F4BF2" : "#fff",
                borderColor: activeCategory === cat.id ? "#6F4BF2" : "#E8E4FA",
                color: activeCategory === cat.id ? "#fff" : "#1A1A2E",
              }}>
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium text-center leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Orders */}
      <section className="max-w-7xl mx-auto px-4 pb-24 md:pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
            {activeCategory ? CATEGORIES.find(c => c.id === activeCategory)?.name : "Актуальные заказы"}
          </h2>
          <span className="text-sm" style={{ color: "#6B6B8A" }}>{filtered.length} заказов</span>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📭</p>
            <p style={{ color: "#6B6B8A" }}>В этой категории пока нет заказов</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                favorited={favorites.includes(order.id)}
                onToggleFavorite={toggleFav}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
