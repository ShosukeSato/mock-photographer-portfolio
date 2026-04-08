import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const showAll = req.nextUrl.searchParams.get("all") === "true";
  const sql = showAll
    ? "SELECT * FROM essays ORDER BY date DESC"
    : "SELECT * FROM essays WHERE published = 1 ORDER BY date DESC";
  const result = await db.execute(sql);
  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const { title, excerpt, content, date } = await req.json();

  const result = await db.execute({
    sql: "INSERT INTO essays (title, excerpt, content, date) VALUES (?, ?, ?, ?)",
    args: [title, excerpt || "", content || "", date || new Date().toISOString().split("T")[0]],
  });

  const essay = await db.execute({ sql: "SELECT * FROM essays WHERE id = ?", args: [result.lastInsertRowid] });
  return NextResponse.json(essay.rows[0], { status: 201 });
}

export async function PUT(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const { id, title, excerpt, content, date, published } = await req.json();

  await db.execute({
    sql: "UPDATE essays SET title = ?, excerpt = ?, content = ?, date = ?, published = ?, updated_at = datetime('now') WHERE id = ?",
    args: [title, excerpt || "", content || "", date || "", published ?? 1, id],
  });

  const essay = await db.execute({ sql: "SELECT * FROM essays WHERE id = ?", args: [id] });
  return NextResponse.json(essay.rows[0]);
}

export async function DELETE(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const { id } = await req.json();
  await db.execute({ sql: "DELETE FROM essays WHERE id = ?", args: [id] });
  return NextResponse.json({ ok: true });
}
