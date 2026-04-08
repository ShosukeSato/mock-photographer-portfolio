import Image from "next/image";
import ScrollRevealWrapper from "./ScrollRevealWrapper";

export default function About() {
  return (
    <section id="about" className="py-32 md:py-44 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        <ScrollRevealWrapper>
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Ren Takahashi portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </ScrollRevealWrapper>

        <ScrollRevealWrapper delay={200}>
          <div className="md:pt-12">
            <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
              About
            </p>
            <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light tracking-wide mb-10">
              高橋 蓮
            </h2>
            <div className="space-y-6 text-fg-muted text-sm leading-8 font-light">
              <p>
                1992年、長野県生まれ。東京を拠点に活動する写真家・エッセイスト。
              </p>
              <p>
                日常の風景と、そこに差し込む光の変化を記録している。
                観光名所ではなく、名前のない交差点や、ただ通り過ぎるだけの橋——
                そういう場所にカメラを向けることが多い。
              </p>
              <p>
                写真だけでは伝えきれないことを、言葉で補うようにエッセイも書く。
                「見ること」と「書くこと」は、自分にとって同じ行為の表裏だと思っている。
              </p>
              <p>
                使用機材：Leica M11 / Hasselblad 500C/M
              </p>
            </div>

            <div className="mt-14 pt-10 border-t border-border">
              <h3 className="text-xs tracking-[0.2em] uppercase text-fg-muted mb-6">
                Awards & Publications
              </h3>
              <ul className="space-y-3 text-sm font-light">
                <li className="flex justify-between">
                  <span>IMA next 入選</span>
                  <span className="text-fg-muted/50">2025</span>
                </li>
                <li className="flex justify-between">
                  <span>「名前のない場所」写真展 / TOTEM POLE PHOTO GALLERY</span>
                  <span className="text-fg-muted/50">2024</span>
                </li>
                <li className="flex justify-between">
                  <span>CAPA 月例フォトコンテスト 金賞</span>
                  <span className="text-fg-muted/50">2024</span>
                </li>
                <li className="flex justify-between">
                  <span>エッセイ連載「光の手帖」 / 文學界</span>
                  <span className="text-fg-muted/50">2023–</span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
}
