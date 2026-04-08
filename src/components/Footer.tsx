import ScrollRevealWrapper from "./ScrollRevealWrapper";

export default function Footer() {
  return (
    <footer className="py-16 px-6 md:px-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <ScrollRevealWrapper fade>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="font-[family-name:var(--font-serif)] text-lg tracking-widest">
                Ren Takahashi
              </p>
              <p className="text-fg-muted text-xs mt-2 tracking-wider">
                Photographer & Essayist
              </p>
            </div>

            <div className="flex gap-8">
              {["Instagram", "X", "note"].map((name) => (
                <span
                  key={name}
                  className="text-fg-muted text-xs tracking-wider hover:text-accent transition-colors duration-300 cursor-pointer"
                >
                  {name}
                </span>
              ))}
            </div>

            <div className="text-center md:text-right">
              <p className="text-fg-muted/40 text-[11px] tracking-wider">
                &copy; 2026 Ren Takahashi. All rights reserved.
              </p>
              <p className="text-accent/50 text-[10px] tracking-wider mt-1">
                Powered by VivaPulse
              </p>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </footer>
  );
}
