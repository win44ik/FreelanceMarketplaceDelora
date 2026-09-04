import { Link } from "react-router-dom";
import { Heart, MapPin, Clock, Users } from "lucide-react";
import { Order, USERS, CATEGORIES } from "../data/mock";

interface Props {
  order: Order;
  favorited?: boolean;
  onToggleFavorite?: (id: string) => void;
  showDeleteBtn?: boolean;
  onDelete?: (id: string) => void;
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  open: { label: "Открыт", color: "#241C40", bg: "#CDF27E" },
  in_progress: { label: "В работе", color: "#fff", bg: "#6F4BF2" },
  completed: { label: "Выполнен", color: "#fff", bg: "#2ECC71" },
  cancelled: { label: "Отменён", color: "#fff", bg: "#E74C3C" },
};

export default function OrderCard({ order, favorited, onToggleFavorite, showDeleteBtn, onDelete }: Props) {
  const client = USERS.find(u => u.id === order.clientId);
  const cat = CATEGORIES.find(c => c.id === order.category);
  const statusInfo = STATUS_LABELS[order.status];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition-shadow flex flex-col gap-3"
      style={{ borderColor: "#E8E4FA" }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ backgroundColor: "#F0EBFF", color: "#6F4BF2" }}>
            {cat?.icon} {cat?.name}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ backgroundColor: statusInfo.bg, color: statusInfo.color }}>
            {statusInfo.label}
          </span>
        </div>
        <button
          onClick={() => onToggleFavorite?.(order.id)}
          className="shrink-0 p-1.5 rounded-lg transition-colors hover:bg-purple-50"
        >
          <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`}
            style={{ color: favorited ? "#6F4BF2" : "#6B6B8A" }} />
        </button>
      </div>

      <Link to={`/order/${order.id}`}>
        <h3 className="font-semibold text-base leading-snug hover:text-purple-700 transition-colors line-clamp-2"
          style={{ color: "#1A1A2E", fontFamily: "'Playfair Display', serif" }}>
          {order.title}
        </h3>
      </Link>

      <p className="text-sm line-clamp-2" style={{ color: "#6B6B8A" }}>{order.description}</p>

      <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: "#6B6B8A" }}>
        <span className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {order.remote ? "Удалённо" : order.city}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          до {new Date(order.deadline).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          {order.responses.length} откликов
        </span>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <img src={client?.avatar} alt={client?.name} className="w-6 h-6 rounded-full object-cover" />
          <span className="text-xs" style={{ color: "#6B6B8A" }}>{client?.name}</span>
        </div>
        <span className="font-bold text-base" style={{ color: "#241C40" }}>
          {order.budget.toLocaleString("ru-RU")} ₽
        </span>
      </div>

      <div className="flex gap-2 mt-1">
        <Link to={`/order/${order.id}`}
          className="flex-1 py-2 rounded-xl text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#6F4BF2" }}>
          Откликнуться
        </Link>
        {showDeleteBtn && (
          <button onClick={() => onDelete?.(order.id)}
            className="px-3 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-red-50 border"
            style={{ color: "#E74C3C", borderColor: "#E74C3C" }}>
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}
