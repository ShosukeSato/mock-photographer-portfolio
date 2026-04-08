import Image from "next/image";
import { getDb } from "@/lib/db";
import type { Work } from "@/lib/db";
import ScrollRevealWrapper from "./ScrollRevealWrapper";

export default async function Works() {
  const db = await getDb();
  const result = await db.execute("SELECT * FROM works WHERE published = 1 ORDER BY sort_order ASC");
  const works = result.rows as unknown as Work[];

  const aspects = ["aspect-[3/4]", "aspect-[4/5]"];

  return (
    <section id="works" className="py-32 md:py-44 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <ScrollRevealWrapper>
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
            Selected Works
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light tracking-wide mb-20">
            作品
          </h2>
        </ScrollRevealWrapper>

        <div className="columns-1 md:columns-2 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {works.map((work, i) => (
            <ScrollRevealWrapper key={work.id} delay={i * 100}>
              <div className="break-inside-avoid group cursor-pointer">
                <div className={`relative ${aspects[i % 2]} w-full overflow-hidden`}>
                  {work.image_url && (
                    <Image
                      src={work.image_url}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700" />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-sm font-light tracking-wide">{work.title}</h3>
                    <p className="text-fg-muted text-xs mt-1 tracking-wider">{work.subtitle}</p>
                  </div>
                  <span className="text-fg-muted/50 text-xs tracking-wider">{work.year}</span>
                </div>
              </div>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
