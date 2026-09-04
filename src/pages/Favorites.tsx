import { useState } from "react";
import { Heart } from "lucide-react";
import OrderCard from "../components/OrderCard";
import { ORDERS, FAVORITES } from "../data/mock";

export default function Favorites() {
  const [favIds, setFavIds] = useState<string[]>(FAVORITES);
  const favOrders = ORDERS.filter(o => favIds.includes(o.id));

  return (
    <div className="min-h-screen pb-24 md:pb-12" style={{ backgroundColor: "#F8F6FF" }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F0EBFF" }}>
            <Heart className="w-5 h-5" style={{ color: "#6F4BF2" }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
              Избранное
            </h1>
            <p className="text-sm" style={{ color: "#6B6B8A" }}>{favOrders.length} сохранённых заказов</p>
          </div>
        </div>

        {favOrders.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: "#E8E4FA" }} />
            <p className="font-semibold mb-2" style={{ color: "#241C40" }}>Пока ничего нет</p>
            <p className="text-sm" style={{ color: "#6B6B8A" }}>Добавляйте понравившиеся заказы в избранное</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favOrders.map(o => (
              <OrderCard
                key={o.id}
                order={o}
                favorited={true}
                onToggleFavorite={id => setFavIds(prev => prev.filter(f => f !== id))}
                showDeleteBtn={true}
                onDelete={id => setFavIds(prev => prev.filter(f => f !== id))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
