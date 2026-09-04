import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, ArrowLeft } from "lucide-react";
import { CATEGORIES } from "../data/mock";

export default function CreateOrder() {
  const navigate = useNavigate();
  const [remote, setRemote] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const addFile = () => {
    if (files.length < 5) setFiles(prev => [...prev, `Документ_${prev.length + 1}.pdf`]);
  };

  return (
    <div className="min-h-screen pb-24 md:pb-12" style={{ backgroundColor: "#F8F6FF" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 text-sm transition-colors hover:text-purple-700"
          style={{ color: "#6B6B8A" }}>
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>

        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
          Создать заказ
        </h1>
        <p className="mb-8 text-sm" style={{ color: "#6B6B8A" }}>Опишите свою задачу — и исполнители сами откликнутся</p>

        <form onSubmit={e => { e.preventDefault(); navigate("/home"); }}
          className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-5"
          style={{ borderColor: "#E8E4FA" }}>

          {/* Title */}
          <div>
            <label className="text-sm font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Заголовок заказа *</label>
            <input required placeholder="Например: Разработка лендинга на React"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:border-purple-400"
              style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF" }} />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Категория *</label>
            <select required className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
              style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF", color: "#1A1A2E" }}>
              <option value="">Выберите категорию</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Описание *</label>
            <textarea required rows={5} placeholder="Подробно опишите задачу, требования, пожелания..."
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-all focus:border-purple-400"
              style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF" }} />
            <p className="text-xs mt-1" style={{ color: "#6B6B8A" }}>Чем подробнее, тем точнее отклики</p>
          </div>

          {/* Budget + deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Бюджет (₽) *</label>
              <input required type="number" placeholder="50 000"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF" }} />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Срок выполнения *</label>
              <input required type="date"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF" }} />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Город</label>
            <input disabled={remote} placeholder="Москва"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
              style={{ borderColor: "#E8E4FA", backgroundColor: remote ? "#f0f0f0" : "#F8F6FF" }} />
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input type="checkbox" checked={remote} onChange={e => setRemote(e.target.checked)}
                className="w-4 h-4 accent-purple-600" />
              <span className="text-sm" style={{ color: "#6B6B8A" }}>Работа удалённо</span>
            </label>
          </div>

          {/* Attachments */}
          <div>
            <label className="text-sm font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>
              Вложения <span style={{ color: "#6B6B8A" }}>(до 5 файлов)</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {files.map((f, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm"
                  style={{ borderColor: "#E8E4FA", backgroundColor: "#F0EBFF" }}>
                  <span style={{ color: "#6F4BF2" }}>{f}</span>
                  <button type="button" onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}>
                    <X className="w-3.5 h-3.5" style={{ color: "#6B6B8A" }} />
                  </button>
                </div>
              ))}
            </div>
            {files.length < 5 && (
              <button type="button" onClick={addFile}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed text-sm transition-colors hover:bg-purple-50"
                style={{ borderColor: "#A38DF2", color: "#6F4BF2" }}>
                <Upload className="w-4 h-4" /> Загрузить файл
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)}
              className="flex-1 py-3 rounded-xl border font-medium text-sm transition-colors hover:bg-gray-50"
              style={{ borderColor: "#E8E4FA", color: "#6B6B8A" }}>
              Отмена
            </button>
            <button type="submit"
              className="flex-1 py-3 rounded-xl font-medium text-sm text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#6F4BF2" }}>
              Опубликовать заказ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
