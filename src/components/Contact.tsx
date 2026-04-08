import ScrollRevealWrapper from "./ScrollRevealWrapper";

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-44 px-6 md:px-12 bg-surface">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollRevealWrapper>
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">
            Contact
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl font-light tracking-wide mb-6">
            お問い合わせ
          </h2>
          <p className="text-fg-muted text-sm font-light leading-8 mb-16">
            撮影依頼・寄稿依頼・展示のご相談など、
            <br className="hidden md:block" />
            お気軽にご連絡ください。
          </p>
        </ScrollRevealWrapper>

        <ScrollRevealWrapper delay={200}>
          <form className="space-y-8 text-left">
            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-fg-muted block mb-3">
                Name
              </label>
              <input
                type="text"
                readOnly
                className="w-full bg-transparent border-b border-border py-3 text-sm font-light focus:outline-none focus:border-accent transition-colors duration-500 placeholder:text-fg-muted/30"
                placeholder="お名前"
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-fg-muted block mb-3">
                Email
              </label>
              <input
                type="email"
                readOnly
                className="w-full bg-transparent border-b border-border py-3 text-sm font-light focus:outline-none focus:border-accent transition-colors duration-500 placeholder:text-fg-muted/30"
                placeholder="メールアドレス"
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-fg-muted block mb-3">
                Message
              </label>
              <textarea
                readOnly
                rows={5}
                className="w-full bg-transparent border-b border-border py-3 text-sm font-light focus:outline-none focus:border-accent transition-colors duration-500 resize-none placeholder:text-fg-muted/30"
                placeholder="ご依頼内容をお書きください"
              />
            </div>
            <div className="pt-4">
              <button
                type="button"
                className="px-12 py-4 border border-fg text-xs tracking-[0.2em] uppercase hover:bg-fg hover:text-bg transition-all duration-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
}
