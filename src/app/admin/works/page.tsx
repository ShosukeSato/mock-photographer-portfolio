"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface Work {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  image_url: string;
  sort_order: number;
  published: number;
}

export default function WorksAdmin() {
  const [works, setWorks] = useState<Work[]>([]);
  const [editing, setEditing] = useState<Work | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const loadWorks = useCallback(() => {
    fetch("/api/works?all=true")
      .then((r) => r.json())
      .then(setWorks);
  }, []);

  useEffect(() => {
    loadWorks();
  }, [loadWorks]);

  const handleNew = () => {
    setEditing({ id: 0, title: "", subtitle: "", year: new Date().getFullYear().toString(), image_url: "", sort_order: 0, published: 1 });
    setIsNew(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    const method = isNew ? "POST" : "PUT";
    await fetch("/api/works", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    setIsNew(false);
    loadWorks();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("この作品を削除しますか？")) return;
    await fetch("/api/works", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadWorks();
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (data.url && editing) {
      setEditing({ ...editing, image_url: data.url });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-[family-name:var(--font-serif)] text-3xl font-light tracking-wide mb-1">
            作品管理
          </h1>
          <p className="text-fg-muted text-sm">{works.length} 件の作品</p>
        </div>
        <button
          onClick={handleNew}
          className="px-6 py-3 border border-fg text-xs tracking-[0.15em] uppercase hover:bg-fg hover:text-bg transition-all duration-300"
        >
          + 新しい作品
        </button>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">
          <div className="bg-bg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border p-8">
            <h2 className="font-[family-name:var(--font-serif)] text-2xl font-light mb-8">
              {isNew ? "新しい作品を追加" : "作品を編集"}
            </h2>

            {/* Image upload area */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed mb-6 transition-colors duration-300 ${
                dragOver ? "border-accent bg-accent/5" : "border-border"
              }`}
            >
              {editing.image_url ? (
                <div className="relative aspect-video">
                  <Image
                    src={editing.image_url}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="600px"
                  />
                  <button
                    onClick={() => setEditing({ ...editing, image_url: "" })}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/60 text-white flex items-center justify-center text-sm hover:bg-black/80 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="py-16 text-center">
                  {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-5 h-5 border border-accent border-t-transparent rounded-full animate-spin" />
                      <p className="text-fg-muted text-sm">アップロード中...</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-fg-muted text-sm mb-2">
                        画像をドラッグ＆ドロップ
                      </p>
                      <p className="text-fg-muted/50 text-xs mb-4">または</p>
                      <label className="px-4 py-2 border border-border text-xs tracking-wider cursor-pointer hover:border-accent transition-colors">
                        ファイルを選択
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(file);
                          }}
                        />
                      </label>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* URL direct input */}
            <div className="mb-6">
              <label className="text-[11px] tracking-[0.15em] uppercase text-fg-muted block mb-2">
                画像URL（直接入力も可）
              </label>
              <input
                type="text"
                value={editing.image_url}
                onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[11px] tracking-[0.15em] uppercase text-fg-muted block mb-2">
                  タイトル
                </label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="朝霧の湖畔"
                />
              </div>
              <div>
                <label className="text-[11px] tracking-[0.15em] uppercase text-fg-muted block mb-2">
                  サブタイトル（英語）
                </label>
                <input
                  type="text"
                  value={editing.subtitle}
                  onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="Lake at Dawn"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="text-[11px] tracking-[0.15em] uppercase text-fg-muted block mb-2">
                  年
                </label>
                <input
                  type="text"
                  value={editing.year}
                  onChange={(e) => setEditing({ ...editing, year: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="2025"
                />
              </div>
              <div className="flex items-end">
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

            <div className="flex gap-4 justify-end">
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

      {/* Works list */}
      <div className="space-y-4">
        {works.map((work) => (
          <div
            key={work.id}
            className="flex items-center gap-6 p-4 border border-border hover:border-accent/30 transition-colors group"
          >
            {/* Thumbnail */}
            <div className="relative w-20 h-20 flex-shrink-0 bg-surface overflow-hidden">
              {work.image_url && (
                <Image
                  src={work.image_url}
                  alt={work.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-medium truncate">{work.title}</h3>
                {!work.published && (
                  <span className="text-[10px] tracking-wider text-fg-muted border border-border px-2 py-0.5">
                    非公開
                  </span>
                )}
              </div>
              <p className="text-fg-muted text-xs mt-1">
                {work.subtitle} · {work.year}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => { setEditing(work); setIsNew(false); }}
                className="text-xs text-fg-muted hover:text-accent transition-colors tracking-wider"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(work.id)}
                className="text-xs text-fg-muted hover:text-red-500 transition-colors tracking-wider"
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
