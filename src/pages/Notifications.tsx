import { useState } from "react";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { NOTIFICATIONS, Notification } from "../data/mock";

const TYPE_ICONS: Record<Notification["type"], string> = {
  response: "📩",
  status: "📋",
  message: "💬",
  new_order: "🆕",
};

export default function Notifications() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const readAll = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const deleteAll = () => setNotifs([]);
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const paginated = notifs.slice(0, page * PER_PAGE);
  const hasMore = notifs.length > page * PER_PAGE;

  return (
    <div className="min-h-screen pb-24 md:pb-12" style={{ backgroundColor: "#F8F6FF" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F0EBFF" }}>
              <Bell className="w-5 h-5" style={{ color: "#6F4BF2" }} />
            </div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
              Уведомления
            </h1>
          </div>
          <div className="flex gap-2">
            <button onClick={readAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border hover:bg-purple-50 transition-colors"
              style={{ borderColor: "#6F4BF2", color: "#6F4BF2" }}>
              <CheckCheck className="w-3.5 h-3.5" /> Прочитать все
            </button>
            <button onClick={deleteAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border hover:bg-red-50 transition-colors"
              style={{ borderColor: "#E74C3C", color: "#E74C3C" }}>
              <Trash2 className="w-3.5 h-3.5" /> Удалить все
            </button>
          </div>
        </div>

        {notifs.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="w-16 h-16 mx-auto mb-4" style={{ color: "#E8E4FA" }} />
            <p className="font-semibold" style={{ color: "#241C40" }}>Нет уведомлений</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {paginated.map(n => (
              <button key={n.id} onClick={() => markRead(n.id)}
                className="text-left p-4 rounded-2xl border flex items-start gap-4 transition-all hover:shadow-sm"
                style={{
                  backgroundColor: n.read ? "#fff" : "#F0EBFF",
                  borderColor: n.read ? "#E8E4FA" : "#A38DF2",
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: n.read ? "#F8F6FF" : "#E8E0FF" }}>
                  {TYPE_ICONS[n.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm" style={{ color: "#241C40" }}>{n.title}</p>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ backgroundColor: "#6F4BF2" }} />
                    )}
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: "#4a4a6a" }}>{n.text}</p>
                  <p className="text-xs mt-1.5" style={{ color: "#6B6B8A" }}>
                    {new Date(n.createdAt).toLocaleString("ru-RU", {
                      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-6">
            <button onClick={() => setPage(p => p + 1)}
              className="px-6 py-2.5 rounded-xl border text-sm font-medium transition-colors hover:bg-purple-50"
              style={{ borderColor: "#6F4BF2", color: "#6F4BF2" }}>
              Загрузить ещё
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
