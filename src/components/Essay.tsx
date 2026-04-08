import { getDb } from "@/lib/db";
import type { Essay } from "@/lib/db";
import ScrollRevealWrapper from "./ScrollRevealWrapper";

export default async function EssaySection() {
  const db = await getDb();
  const result = await db.execute("SELECT * FROM essays WHERE published = 1 ORDER BY date DESC");
  const essays = result.rows as unknown as Essay[];

  return (
    <section id="essay" className="py-32 md:py-44 px-6 md:px-12 bg-surface">
      <div className="max-w-3xl mx-auto">
        <ScrollRevealWrapper>
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
            Essay
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light tracking-wide mb-20">
            随筆
          </h2>
        </ScrollRevealWrapper>

        <div className="space-y-16">
          {essays.map((essay, i) => (
            <ScrollRevealWrapper key={essay.id} delay={i * 150}>
              <article className="group cursor-pointer">
                <time className="text-fg-muted text-xs tracking-widest">
                  {(essay.date as string).replace(/-/g, ".")}
                </time>
                <h3 className="text-xl md:text-2xl font-light mt-3 mb-4 tracking-wide group-hover:text-accent transition-colors duration-500">
                  {essay.title}
                </h3>
                <p className="text-fg-muted text-sm leading-8 font-light">
                  {essay.excerpt}
                </p>
                <div className="mt-6 h-px bg-border group-hover:bg-accent-light transition-colors duration-700" />
              </article>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
