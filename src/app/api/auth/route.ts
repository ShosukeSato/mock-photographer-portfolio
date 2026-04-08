import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyPassword, createToken, setAuthCookie, clearAuthCookie, getAuthUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const db = await getDb();

  const result = await db.execute({ sql: "SELECT * FROM admin_users WHERE email = ?", args: [email] });
  const user = result.rows[0];

  if (!user || !verifyPassword(password, user.password_hash as string)) {
    return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません" }, { status: 401 });
  }

  const token = await createToken(Number(user.id), user.email as string);
  await setAuthCookie(token);

  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
}

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user });
}

export async function DELETE() {
  await clearAuthCookie();
  return NextResponse.json({ ok: true });
}
