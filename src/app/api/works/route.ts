import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const showAll = req.nextUrl.searchParams.get("all") === "true";
  const sql = showAll
    ? "SELECT * FROM works ORDER BY sort_order ASC"
    : "SELECT * FROM works WHERE published = 1 ORDER BY sort_order ASC";
  const result = await db.execute(sql);
  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const { title, subtitle, year, image_url } = await req.json();

  const maxResult = await db.execute("SELECT MAX(sort_order) as max FROM works");
  const sortOrder = (Number(maxResult.rows[0]?.max) || 0) + 1;

  const result = await db.execute({
    sql: "INSERT INTO works (title, subtitle, year, image_url, sort_order) VALUES (?, ?, ?, ?, ?)",
    args: [title, subtitle || "", year || "", image_url || "", sortOrder],
  });

  const work = await db.execute({ sql: "SELECT * FROM works WHERE id = ?", args: [Number(result.lastInsertRowid)] });
  return NextResponse.json(work.rows[0], { status: 201 });
}

export async function PUT(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const { id, title, subtitle, year, image_url, published, sort_order } = await req.json();

  await db.execute({
    sql: "UPDATE works SET title = ?, subtitle = ?, year = ?, image_url = ?, published = ?, sort_order = ?, updated_at = datetime('now') WHERE id = ?",
    args: [title, subtitle || "", year || "", image_url || "", published ?? 1, sort_order ?? 0, id],
  });

  const work = await db.execute({ sql: "SELECT * FROM works WHERE id = ?", args: [id] });
  return NextResponse.json(work.rows[0]);
}

export async function DELETE(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = await getDb();
  const { id } = await req.json();
  await db.execute({ sql: "DELETE FROM works WHERE id = ?", args: [id] });
  return NextResponse.json({ ok: true });
}
