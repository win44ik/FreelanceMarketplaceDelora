import { useState } from "react";
import { Flag, ChevronRight } from "lucide-react";
import { REPORTS, Report } from "../data/mock";

const STATUS_INFO: Record<Report["status"], { label: string; bg: string; color: string }> = {
  pending: { label: "На рассмотрении", bg: "#FFF3CD", color: "#856404" },
  resolved: { label: "Удовлетворена", bg: "#CDF27E", color: "#241C40" },
  rejected: { label: "Отклонена", bg: "#F8D7DA", color: "#721C24" },
};

export default function MyReports() {
  const [selected, setSelected] = useState<Report | null>(null);

  if (selected) {
    const info = STATUS_INFO[selected.status];
    return (
      <div className="min-h-screen pb-24 md:pb-12" style={{ backgroundColor: "#F8F6FF" }}>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button onClick={() => setSelected(null)} className="text-sm mb-6 hover:text-purple-700 transition-colors flex items-center gap-1"
            style={{ color: "#6B6B8A" }}>
            ← Все жалобы
          </button>
          <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: "#E8E4FA" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
                Жалоба #{selected.id}
              </h2>
              <span className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ backgroundColor: info.bg, color: info.color }}>
                {info.label}
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "#6B6B8A" }}>Тип</p>
                <p className="text-sm" style={{ color: "#1A1A2E" }}>
                  {selected.targetType === "user" ? "Пользователь" : "Заказ"}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "#6B6B8A" }}>Причина</p>
                <p className="text-sm" style={{ color: "#1A1A2E" }}>{selected.reason}</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "#6B6B8A" }}>Описание</p>
                <p className="text-sm" style={{ color: "#1A1A2E" }}>{selected.details}</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "#6B6B8A" }}>Дата подачи</p>
                <p className="text-sm" style={{ color: "#1A1A2E" }}>
                  {new Date(selected.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 md:pb-12" style={{ backgroundColor: "#F8F6FF" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F0EBFF" }}>
            <Flag className="w-5 h-5" style={{ color: "#6F4BF2" }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
              Мои жалобы
            </h1>
            <p className="text-sm" style={{ color: "#6B6B8A" }}>{REPORTS.length} жалоб отправлено</p>
          </div>
        </div>

        {REPORTS.length === 0 ? (
          <div className="text-center py-20">
            <Flag className="w-16 h-16 mx-auto mb-4" style={{ color: "#E8E4FA" }} />
            <p className="font-semibold" style={{ color: "#241C40" }}>Нет жалоб</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {REPORTS.map(r => {
              const info = STATUS_INFO[r.status];
              return (
                <button key={r.id} onClick={() => setSelected(r)}
                  className="bg-white rounded-2xl p-5 border flex items-center gap-4 text-left shadow-sm hover:shadow-md transition-shadow w-full"
                  style={{ borderColor: "#E8E4FA" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#F0EBFF" }}>
                    <Flag className="w-5 h-5" style={{ color: "#6F4BF2" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm" style={{ color: "#241C40" }}>{r.reason}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: info.bg, color: info.color }}>
                        {info.label}
                      </span>
                    </div>
                    <p className="text-xs truncate" style={{ color: "#6B6B8A" }}>
                      {r.targetType === "user" ? "Пользователь" : "Заказ"} · {new Date(r.createdAt).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0" style={{ color: "#6B6B8A" }} />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
