import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Edit3, MessageCircle, Briefcase, CheckCircle, Users, Award } from "lucide-react";
import { USERS, ORDERS, CATEGORIES } from "../data/mock";
import OrderCard from "../components/OrderCard";

const TABS = ["Мои заказы", "Мои отклики", "Выполненные", "Отзывы"] as const;

const REVIEWS = [
  { id: "rv1", author: "Алексей М.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format", rating: 5, text: "Отличная работа! Всё выполнено в срок, качество на высшем уровне. Обязательно обращусь снова.", date: "2025-01-10" },
  { id: "rv2", author: "Анна К.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format", rating: 4, text: "Хорошая работа, только были небольшие задержки с ответами, но результат понравился.", date: "2024-12-20" },
  { id: "rv3", author: "Дмитрий С.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&auto=format", rating: 5, text: "Профессионал своего дела. Предложила несколько классных идей сверх задания.", date: "2024-11-15" },
];

export default function Profile() {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>("Мои заказы");

  const user = USERS.find(u => u.id === userId) || USERS.find(u => u.id === "me")!;
  const isMe = userId === "me" || userId === "me";

  const myOrders = ORDERS.filter(o => o.clientId === user.id);
  const completedOrders = myOrders.filter(o => o.status === "completed");

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className="w-4 h-4" fill={i < Math.floor(rating) ? "#F59E0B" : "none"}
        style={{ color: "#F59E0B" }} />
    ));

  return (
    <div className="min-h-screen pb-24 md:pb-12" style={{ backgroundColor: "#F8F6FF" }}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: User card */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#E8E4FA" }}>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4"
                    style={{ borderColor: "#A38DF2" }} />
                  <span className="absolute bottom-0 right-0 text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: "#CDF27E", color: "#241C40" }}>
                    {user.role === "client" ? "Заказчик" : "Исполнитель"}
                  </span>
                </div>
                <h1 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
                  {user.name}
                </h1>
                <div className="flex items-center gap-1 mb-1">
                  {renderStars(user.rating)}
                  <span className="text-sm ml-1" style={{ color: "#6B6B8A" }}>{user.rating} ({user.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-sm" style={{ color: "#6B6B8A" }}>
                  <MapPin className="w-3.5 h-3.5" /> {user.city}
                </div>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: "#4a4a6a" }}>{user.bio}</p>
                <p className="text-xs mt-2" style={{ color: "#6B6B8A" }}>
                  На Delora с {new Date(user.joinedAt).toLocaleDateString("ru-RU", { month: "long", year: "numeric" })}
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-5">
                {isMe ? (
                  <Link to="/settings"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-colors hover:bg-purple-50"
                    style={{ borderColor: "#6F4BF2", color: "#6F4BF2" }}>
                    <Edit3 className="w-4 h-4" /> Редактировать профиль
                  </Link>
                ) : (
                  <Link to="/chat"
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-90"
                    style={{ backgroundColor: "#6F4BF2" }}>
                    <MessageCircle className="w-4 h-4" /> Написать
                  </Link>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border" style={{ borderColor: "#E8E4FA" }}>
              <h3 className="font-semibold mb-4 text-sm" style={{ color: "#241C40" }}>Статистика</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Briefcase, label: "Создано заказов", val: user.ordersCreated },
                  { icon: CheckCircle, label: "Выполнено", val: user.ordersCompleted },
                  { icon: Users, label: "Откликов", val: user.responses },
                  { icon: Award, label: "Рейтинг", val: user.rating },
                ].map((s, i) => (
                  <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: "#F0EBFF" }}>
                    <s.icon className="w-5 h-5 mb-1" style={{ color: "#6F4BF2" }} />
                    <p className="text-xl font-bold" style={{ color: "#241C40", fontFamily: "'Playfair Display', serif" }}>
                      {s.val}
                    </p>
                    <p className="text-xs" style={{ color: "#6B6B8A" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Tabs content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl mb-5 overflow-x-auto" style={{ backgroundColor: "#EBE7FA" }}>
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                  style={{
                    backgroundColor: activeTab === tab ? "#6F4BF2" : "transparent",
                    color: activeTab === tab ? "#fff" : "#6B6B8A",
                  }}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Мои заказы" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myOrders.length === 0 ? (
                  <p className="col-span-2 text-center py-12" style={{ color: "#6B6B8A" }}>Нет заказов</p>
                ) : (
                  myOrders.map(o => <OrderCard key={o.id} order={o} />)
                )}
              </div>
            )}

            {activeTab === "Мои отклики" && (
              <div className="flex flex-col gap-3">
                {ORDERS.slice(0, 2).map(o => (
                  <div key={o.id} className="bg-white rounded-xl p-4 border flex items-center gap-4"
                    style={{ borderColor: "#E8E4FA" }}>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: "#241C40" }}>{o.title}</p>
                      <p className="text-xs mt-1" style={{ color: "#6B6B8A" }}>
                        {CATEGORIES.find(c => c.id === o.category)?.name}
                      </p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full shrink-0"
                      style={{ backgroundColor: "#F0EBFF", color: "#6F4BF2" }}>
                      Ожидание
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Выполненные" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {completedOrders.length === 0 ? (
                  <p className="col-span-2 text-center py-12" style={{ color: "#6B6B8A" }}>Нет выполненных заказов</p>
                ) : (
                  completedOrders.map(o => <OrderCard key={o.id} order={o} />)
                )}
              </div>
            )}

            {activeTab === "Отзывы" && (
              <div className="flex flex-col gap-4">
                {REVIEWS.map(r => (
                  <div key={r.id} className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E8E4FA" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <img src={r.avatar} alt={r.author} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-sm" style={{ color: "#241C40" }}>{r.author}</p>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} className="w-3.5 h-3.5" fill={i < r.rating ? "#F59E0B" : "none"}
                              style={{ color: "#F59E0B" }} />
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-xs" style={{ color: "#6B6B8A" }}>
                        {new Date(r.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "#4a4a6a" }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
