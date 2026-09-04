import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Star, MessageCircle, Heart, Flag, Check, X, Paperclip } from "lucide-react";
import { ORDERS, USERS, CATEGORIES } from "../data/mock";

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  open: { label: "Открыт", color: "#241C40", bg: "#CDF27E" },
  in_progress: { label: "В работе", color: "#fff", bg: "#6F4BF2" },
  completed: { label: "Выполнен", color: "#fff", bg: "#2ECC71" },
  cancelled: { label: "Отменён", color: "#fff", bg: "#E74C3C" },
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);
  const [showRespond, setShowRespond] = useState(false);
  const [respondPrice, setRespondPrice] = useState("");
  const [respondMsg, setRespondMsg] = useState("");

  const order = ORDERS.find(o => o.id === id);
  if (!order) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F8F6FF" }}>
      <div className="text-center">
        <p className="text-5xl mb-3">📭</p>
        <p className="font-semibold mb-4" style={{ color: "#241C40" }}>Заказ не найден</p>
        <Link to="/home" className="text-sm underline" style={{ color: "#6F4BF2" }}>На главную</Link>
      </div>
    </div>
  );

  const client = USERS.find(u => u.id === order.clientId);
  const cat = CATEGORIES.find(c => c.id === order.category);
  const statusInfo = STATUS_LABELS[order.status];

  return (
    <div className="min-h-screen pb-24 md:pb-12" style={{ backgroundColor: "#F8F6FF" }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 text-sm hover:text-purple-700 transition-colors"
          style={{ color: "#6B6B8A" }}>
          <ArrowLeft className="w-4 h-4" /> Все заказы
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#E8E4FA" }}>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: "#F0EBFF", color: "#6F4BF2" }}>
                  {cat?.icon} {cat?.name}
                </span>
                <span className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: statusInfo.bg, color: statusInfo.color }}>
                  {statusInfo.label}
                </span>
              </div>

              <h1 className="text-2xl font-bold mb-4 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
                {order.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6 text-sm" style={{ color: "#6B6B8A" }}>
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-xl" style={{ color: "#241C40", fontFamily: "'Playfair Display', serif" }}>
                    {order.budget.toLocaleString("ru-RU")} ₽
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  до {new Date(order.deadline).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {order.remote ? "Удалённо" : order.city}
                </span>
              </div>

              <div className="prose prose-sm max-w-none" style={{ color: "#1A1A2E" }}>
                <h3 className="font-semibold mb-2" style={{ color: "#241C40" }}>Описание</h3>
                <p className="leading-relaxed text-sm" style={{ color: "#4a4a6a" }}>{order.description}</p>
              </div>

              {order.attachments.length > 0 && (
                <div className="mt-5">
                  <h3 className="font-semibold mb-3 text-sm" style={{ color: "#241C40" }}>Вложения</h3>
                  <div className="flex flex-wrap gap-2">
                    {order.attachments.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm"
                        style={{ borderColor: "#E8E4FA", backgroundColor: "#F0EBFF" }}>
                        <Paperclip className="w-3.5 h-3.5" style={{ color: "#6F4BF2" }} />
                        <span style={{ color: "#6F4BF2" }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Responses */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#E8E4FA" }}>
              <h2 className="font-bold text-lg mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
                Отклики ({order.responses.length})
              </h2>
              {order.responses.length === 0 ? (
                <p className="text-sm text-center py-8" style={{ color: "#6B6B8A" }}>Пока нет откликов</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {order.responses.map(resp => {
                    const freelancer = USERS.find(u => u.id === resp.freelancerId);
                    return (
                      <div key={resp.id} className="flex items-start gap-4 p-4 rounded-xl border"
                        style={{ borderColor: "#E8E4FA", backgroundColor: "#FAFAFE" }}>
                        <img src={freelancer?.avatar} alt={freelancer?.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <Link to={`/profile/${freelancer?.id}`}
                              className="font-semibold text-sm hover:text-purple-700 transition-colors"
                              style={{ color: "#241C40" }}>
                              {freelancer?.name}
                            </Link>
                            <span className="font-bold text-sm shrink-0" style={{ color: "#6F4BF2" }}>
                              {resp.price.toLocaleString("ru-RU")} ₽
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-3.5 h-3.5 fill-current" style={{ color: "#F59E0B" }} />
                            <span className="text-xs" style={{ color: "#6B6B8A" }}>{freelancer?.rating}</span>
                          </div>
                          <p className="text-sm" style={{ color: "#4a4a6a" }}>{resp.message}</p>
                          <div className="flex gap-2 mt-3">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-90"
                              style={{ backgroundColor: "#CDF27E", color: "#241C40" }}>
                              <Check className="w-3.5 h-3.5" /> Принять
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-red-50"
                              style={{ borderColor: "#E74C3C", color: "#E74C3C" }}>
                              <X className="w-3.5 h-3.5" /> Отклонить
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {/* Client info */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border" style={{ borderColor: "#E8E4FA" }}>
              <h3 className="font-semibold mb-4 text-sm" style={{ color: "#241C40" }}>Заказчик</h3>
              <Link to={`/profile/${client?.id}`} className="flex items-center gap-3 mb-4">
                <img src={client?.avatar} alt={client?.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm hover:text-purple-700 transition-colors" style={{ color: "#241C40" }}>{client?.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-current" style={{ color: "#F59E0B" }} />
                    <span className="text-xs" style={{ color: "#6B6B8A" }}>{client?.rating} ({client?.reviews} отзывов)</span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#6B6B8A" }}>{client?.city}</p>
                </div>
              </Link>

              <div className="flex flex-col gap-2">
                <Link to="/chat"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-colors hover:bg-purple-50"
                  style={{ borderColor: "#6F4BF2", color: "#6F4BF2" }}>
                  <MessageCircle className="w-4 h-4" /> Написать в чат
                </Link>

                <button onClick={() => setShowRespond(!showRespond)}
                  className="py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#6F4BF2" }}>
                  Откликнуться
                </button>

                <div className="flex gap-2">
                  <button onClick={() => setFavorited(!favorited)}
                    className="flex-1 py-2.5 rounded-xl border text-sm font-medium flex items-center justify-center gap-1.5 transition-colors hover:bg-purple-50"
                    style={{ borderColor: "#E8E4FA", color: favorited ? "#6F4BF2" : "#6B6B8A" }}>
                    <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} /> В избранное
                  </button>
                  <button className="py-2.5 px-3 rounded-xl border text-sm transition-colors hover:bg-red-50"
                    style={{ borderColor: "#E8E4FA", color: "#E74C3C" }}>
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Respond form */}
            {showRespond && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border" style={{ borderColor: "#6F4BF2" }}>
                <h3 className="font-semibold mb-3 text-sm" style={{ color: "#241C40" }}>Ваш отклик</h3>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: "#6B6B8A" }}>Ваша цена (₽)</label>
                    <input type="number" value={respondPrice} onChange={e => setRespondPrice(e.target.value)}
                      placeholder="50 000"
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                      style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF" }} />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block" style={{ color: "#6B6B8A" }}>Сообщение</label>
                    <textarea rows={3} value={respondMsg} onChange={e => setRespondMsg(e.target.value)}
                      placeholder="Расскажите о себе и опыте..."
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none"
                      style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF" }} />
                  </div>
                  <button onClick={() => setShowRespond(false)}
                    className="py-2.5 rounded-lg text-sm font-medium text-white hover:opacity-90"
                    style={{ backgroundColor: "#6F4BF2" }}>
                    Отправить отклик
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
