"use client";

import { useEffect, useState, useCallback } from "react";

interface Essay {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  published: number;
}

export default function EssaysAdmin() {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [editing, setEditing] = useState<Essay | null>(null);
  const [isNew, setIsNew] = useState(false);

  const loadEssays = useCallback(() => {
    fetch("/api/essays?all=true")
      .then((r) => r.json())
      .then(setEssays);
  }, []);

  useEffect(() => {
    loadEssays();
  }, [loadEssays]);

  const handleNew = () => {
    setEditing({
      id: 0,
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      published: 1,
    });
    setIsNew(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    const method = isNew ? "POST" : "PUT";
    await fetch("/api/essays", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    setIsNew(false);
    loadEssays();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("このエッセイを削除しますか？")) return;
    await fetch("/api/essays", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadEssays();
  };

  const formatDate = (dateStr: string) => {
    return dateStr.replace(/-/g, ".");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-[family-name:var(--font-serif)] text-3xl font-light tracking-wide mb-1">
            エッセイ管理
          </h1>
          <p className="text-fg-muted text-sm">{essays.length} 件のエッセイ</p>
        </div>
        <button
          onClick={handleNew}
          className="px-6 py-3 border border-fg text-xs tracking-[0.15em] uppercase hover:bg-fg hover:text-bg transition-all duration-300"
        >
          + 新しいエッセイ
        </button>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-bg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border p-8">
            <h2 className="font-[family-name:var(--font-serif)] text-2xl font-light mb-8">
              {isNew ? "新しいエッセイを追加" : "エッセイを編集"}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="text-[11px] tracking-[0.15em] uppercase text-fg-muted block mb-2">
                  タイトル
                </label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="光を待つということ"
                />
              </div>

              <div>
                <label className="text-[11px] tracking-[0.15em] uppercase text-fg-muted block mb-2">
                  日付
                </label>
                <input
                  type="date"
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] tracking-[0.15em] uppercase text-fg-muted block mb-2">
                  抜粋（サイトに表示されるテキスト）
                </label>
                <textarea
                  value={editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  rows={5}
                  className="w-full bg-transparent border border-border p-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none leading-7"
                  placeholder="サイトのトップページに表示される文章を入力してください..."
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.published === 1}
                    onChange={(e) => setEditing({ ...editing, published: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="text-sm">公開する</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-8">
              <button
                onClick={() => { setEditing(null); setIsNew(false); }}
                className="px-6 py-3 text-xs tracking-wider text-fg-muted hover:text-fg transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSave}
                disabled={!editing.title}
                className="px-8 py-3 bg-fg text-bg text-xs tracking-[0.15em] uppercase hover:bg-accent transition-colors disabled:opacity-30"
              >
                保存する
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Essays list */}
      <div className="space-y-4">
        {essays.map((essay) => (
          <div
            key={essay.id}
            className="p-6 border border-border hover:border-accent/30 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <time className="text-fg-muted text-xs tracking-widest">
                    {formatDate(essay.date)}
                  </time>
                  {!essay.published && (
                    <span className="text-[10px] tracking-wider text-fg-muted border border-border px-2 py-0.5">
                      非公開
                    </span>
                  )}
                </div>
                <h3 className="text-base font-light tracking-wide mb-2">
                  {essay.title}
                </h3>
                <p className="text-fg-muted text-sm font-light leading-7 line-clamp-2">
                  {essay.excerpt}
                </p>
              </div>

              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity ml-6 flex-shrink-0">
                <button
                  onClick={() => { setEditing(essay); setIsNew(false); }}
                  className="text-xs text-fg-muted hover:text-accent transition-colors tracking-wider"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDelete(essay.id)}
                  className="text-xs text-fg-muted hover:text-red-500 transition-colors tracking-wider"
                >
                  削除
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
