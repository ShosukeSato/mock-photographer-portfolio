import { getDb } from "./db";
import { hashPassword } from "./auth";

let seeded = false;

export async function seed() {
  if (seeded) return;
  seeded = true;

  const db = await getDb();

  // Seed admin user
  const adminResult = await db.execute("SELECT id FROM admin_users LIMIT 1");
  if (adminResult.rows.length === 0) {
    await db.execute({
      sql: "INSERT INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)",
      args: ["admin@demo.com", hashPassword("demo1234"), "管理者"],
    });
    console.log("✅ Admin user created: admin@demo.com / demo1234");
  }

  // Seed works
  const worksResult = await db.execute("SELECT COUNT(*) as count FROM works");
  const worksCount = Number(worksResult.rows[0].count);
  if (worksCount === 0) {
    const works = [
      { title: "朝霧の湖畔", subtitle: "Lake at Dawn", year: "2025", image_url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80", sort_order: 1 },
      { title: "路地裏の光", subtitle: "Alley Light", year: "2025", image_url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80", sort_order: 2 },
      { title: "冬の港", subtitle: "Winter Harbor", year: "2024", image_url: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80", sort_order: 3 },
      { title: "雨上がり", subtitle: "After Rain", year: "2024", image_url: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800&q=80", sort_order: 4 },
      { title: "夕暮れの電車", subtitle: "Evening Train", year: "2024", image_url: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80", sort_order: 5 },
      { title: "静物", subtitle: "Still Life", year: "2023", image_url: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800&q=80", sort_order: 6 },
    ];
    for (const w of works) {
      await db.execute({
        sql: "INSERT INTO works (title, subtitle, year, image_url, sort_order) VALUES (?, ?, ?, ?, ?)",
        args: [w.title, w.subtitle, w.year, w.image_url, w.sort_order],
      });
    }
    console.log("✅ Seeded 6 works");
  }

  // Seed essays
  const essaysResult = await db.execute("SELECT COUNT(*) as count FROM essays");
  const essaysCount = Number(essaysResult.rows[0].count);
  if (essaysCount === 0) {
    const essays = [
      { title: "光を待つということ", date: "2025-03-12", excerpt: "写真を撮るという行為は、結局のところ「待つ」ことに尽きる。シャッターを切る瞬間よりも、その前の静けさのほうがずっと長い。朝の五時に湖のほとりに立って、霧が晴れるのを待っている時間——あの時間こそが、写真の本体なのかもしれない。" },
      { title: "名前のない場所", date: "2025-01-28", excerpt: "観光地ではない場所に惹かれる。地図に名前がない交差点、誰も写真を撮らない裏道、ただ通り過ぎるだけの橋。そういう場所にこそ、その街の本当の表情がある。" },
      { title: "フィルムの偶然性について", date: "2024-11-05", excerpt: "デジタルは確認できる。フィルムは祈るしかない。現像から返ってきたネガを光に透かす瞬間、そこにあるのは「撮った写真」ではなく「起きていた出来事」だ。" },
    ];
    for (const e of essays) {
      await db.execute({
        sql: "INSERT INTO essays (title, date, excerpt) VALUES (?, ?, ?)",
        args: [e.title, e.date, e.excerpt],
      });
    }
    console.log("✅ Seeded 3 essays");
  }
}
