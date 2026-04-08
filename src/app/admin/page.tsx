"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [worksCount, setWorksCount] = useState(0);
  const [essaysCount, setEssaysCount] = useState(0);

  useEffect(() => {
    fetch("/api/works?all=true")
      .then((r) => r.json())
      .then((data) => setWorksCount(data.length));
    fetch("/api/essays?all=true")
      .then((r) => r.json())
      .then((data) => setEssaysCount(data.length));
  }, []);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-serif)] text-3xl font-light tracking-wide mb-2">
        ダッシュボード
      </h1>
      <p className="text-fg-muted text-sm mb-12">サイトのコンテンツを管理できます</p>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          href="/admin/works"
          className="group border border-border p-8 hover:border-accent transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-fg-muted">
              作品
            </span>
            <span className="text-xs text-fg-muted group-hover:text-accent transition-colors">
              管理する →
            </span>
          </div>
          <p className="font-[family-name:var(--font-serif)] text-5xl font-light">
            {worksCount}
          </p>
          <p className="text-fg-muted text-sm mt-2">登録済みの作品</p>
        </Link>

        <Link
          href="/admin/essays"
          className="group border border-border p-8 hover:border-accent transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs tracking-[0.2em] uppercase text-fg-muted">
              エッセイ
            </span>
            <span className="text-xs text-fg-muted group-hover:text-accent transition-colors">
              管理する →
            </span>
          </div>
          <p className="font-[family-name:var(--font-serif)] text-5xl font-light">
            {essaysCount}
          </p>
          <p className="text-fg-muted text-sm mt-2">公開中のエッセイ</p>
        </Link>
      </div>

      <div className="mt-12 p-6 bg-surface border border-border">
        <p className="text-xs tracking-[0.15em] uppercase text-fg-muted mb-3">クイックガイド</p>
        <ul className="space-y-2 text-sm text-fg-muted font-light">
          <li>• 「作品管理」から写真を追加・編集・削除できます</li>
          <li>• 「エッセイ管理」から文章を追加・編集・削除できます</li>
          <li>• 画像はドラッグ＆ドロップでアップロードできます</li>
          <li>• 変更はサイトに即座に反映されます</li>
        </ul>
      </div>
    </div>
  );
}
