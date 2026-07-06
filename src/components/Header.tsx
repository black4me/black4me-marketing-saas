export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-b4m-black/80 backdrop-blur-xl border-b border-b4m-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-gold-gradient rounded-xl flex items-center justify-center shadow-gold-glow">
              <span className="text-b4m-black font-black text-lg">B4M</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg leading-tight">BLACK4ME</div>
              <div className="text-b4m-muted text-xs leading-tight">الاستشاري الآلي</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#hero" className="text-b4m-muted hover:text-b4m-gold transition">الرئيسية</a>
            <a href="#features" className="text-b4m-muted hover:text-b4m-gold transition">المميزات</a>
            <a href="#input" className="text-b4m-muted hover:text-b4m-gold transition">ابدأ الآن</a>
            <a href="#dashboard" className="text-b4m-muted hover:text-b4m-gold transition">النتائج</a>
          </nav>

          {/* CTA */}
          <a
            href="#input"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-gradient text-b4m-black font-bold text-sm rounded-lg shadow-lg hover:shadow-gold-glow transition-all"
          >
            <span>جرّب مجاناً</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}