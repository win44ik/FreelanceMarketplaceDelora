import { useState } from "react";
import { BookOpen, Plus, X } from "lucide-react";
import { CATEGORIES, WISHLIST_CATEGORIES } from "../data/mock";

export default function Wishlist() {
  const [subs, setSubs] = useState<string[]>(WISHLIST_CATEGORIES);
  const [showAdd, setShowAdd] = useState(false);

  const available = CATEGORIES.filter(c => !subs.includes(c.id));
  const subscribed = CATEGORIES.filter(c => subs.includes(c.id));

  return (
    <div className="min-h-screen pb-24 md:pb-12" style={{ backgroundColor: "#F8F6FF" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F0EBFF" }}>
              <BookOpen className="w-5 h-5" style={{ color: "#6F4BF2" }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
                Подписки
              </h1>
              <p className="text-sm" style={{ color: "#6B6B8A" }}>Получайте уведомления о новых заказах</p>
            </div>
          </div>
          <button onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#6F4BF2" }}>
            <Plus className="w-4 h-4" /> Добавить
          </button>
        </div>

        {/* Add modal */}
        {showAdd && available.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border mb-5" style={{ borderColor: "#6F4BF2" }}>
            <p className="font-semibold text-sm mb-3" style={{ color: "#241C40" }}>Добавить категорию</p>
            <div className="flex flex-wrap gap-2">
              {available.map(c => (
                <button key={c.id}
                  onClick={() => { setSubs(prev => [...prev, c.id]); setShowAdd(false); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-colors hover:bg-purple-50"
                  style={{ borderColor: "#E8E4FA", color: "#1A1A2E" }}>
                  <span>{c.icon}</span> {c.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {subscribed.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: "#E8E4FA" }} />
            <p className="font-semibold mb-2" style={{ color: "#241C40" }}>Нет подписок</p>
            <p className="text-sm" style={{ color: "#6B6B8A" }}>Подпишитесь на категории, чтобы получать уведомления о новых заказах</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {subscribed.map(cat => (
              <div key={cat.id} className="bg-white rounded-2xl p-5 border flex items-center gap-4 shadow-sm"
                style={{ borderColor: "#E8E4FA" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: "#F0EBFF" }}>
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold" style={{ color: "#241C40" }}>{cat.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6B6B8A" }}>Уведомления включены</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ backgroundColor: "#CDF27E", color: "#241C40" }}>
                    Активна
                  </span>
                  <button onClick={() => setSubs(prev => prev.filter(s => s !== cat.id))}
                    className="p-1.5 rounded-lg transition-colors hover:bg-red-50" style={{ color: "#E74C3C" }}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
