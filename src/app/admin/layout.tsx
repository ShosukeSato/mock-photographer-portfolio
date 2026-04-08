"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => setAuthenticated(r.ok))
      .catch(() => setAuthenticated(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      const data = await res.json();
      setLoginError(data.error || "ログインに失敗しました");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthenticated(false);
    router.push("/admin");
  };

  // Loading
  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-5 h-5 border border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-12">
            <h1 className="font-[family-name:var(--font-serif)] text-3xl tracking-widest mb-2">
              Admin
            </h1>
            <p className="text-fg-muted text-xs tracking-widest">管理画面</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[11px] tracking-[0.15em] uppercase text-fg-muted block mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="admin@demo.com"
                required
              />
            </div>
            <div>
              <label className="text-[11px] tracking-[0.15em] uppercase text-fg-muted block mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-transparent border-b border-border py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-xs">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 border border-fg text-xs tracking-[0.2em] uppercase hover:bg-fg hover:text-bg transition-all duration-300 mt-4"
            >
              ログイン
            </button>
          </form>

          <p className="text-center text-fg-muted/40 text-[10px] mt-10 tracking-wider">
            Powered by VivaPulse
          </p>
        </div>
      </div>
    );
  }

  // Authenticated layout
  const navItems = [
    { href: "/admin", label: "ダッシュボード" },
    { href: "/admin/works", label: "作品管理" },
    { href: "/admin/essays", label: "エッセイ管理" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Top nav */}
      <nav className="border-b border-border bg-bg/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/admin"
              className="font-[family-name:var(--font-serif)] text-lg tracking-widest"
            >
              Admin
            </Link>
            <div className="flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs tracking-wider transition-colors ${
                    pathname === item.href
                      ? "text-accent"
                      : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-fg-muted tracking-wider hover:text-accent transition-colors"
            >
              サイトを見る ↗
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-fg-muted tracking-wider hover:text-red-500 transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
