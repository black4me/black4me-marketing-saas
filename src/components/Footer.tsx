export default function Footer() {
  return (
    <footer className="border-t border-b4m-border/50 bg-b4m-black/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gold-gradient rounded-xl flex items-center justify-center shadow-gold-glow">
                <span className="text-b4m-black font-black text-xl">B4M</span>
              </div>
              <div>
                <div className="text-white font-black text-xl">BLACK4ME</div>
                <div className="text-b4m-muted text-xs">الاستشاري الآلي</div>
              </div>
            </div>
            <p className="text-b4m-muted leading-relaxed max-w-md">
              مدير تسويق استراتيجي آلي مدعوم بمنهجية كتاب "بدون تسويق كارثة تهدد ثروتك المستقبلية" — يحوّل فكرتك إلى خطة تسويقية كاملة في ثوانٍ.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-white font-bold mb-4">روابط سريعة</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#hero" className="text-b4m-muted hover:text-b4m-gold transition">الرئيسية</a></li>
              <li><a href="#features" className="text-b4m-muted hover:text-b4m-gold transition">المميزات</a></li>
              <li><a href="#input" className="text-b4m-muted hover:text-b4m-gold transition">جرّب النظام</a></li>
              <li><a href="mailto:black4mestore@gmail.com" className="text-b4m-muted hover:text-b4m-gold transition">تواصل معنا</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold mb-4">المنهجية</div>
            <ul className="space-y-2 text-sm">
              <li className="text-b4m-muted">معادلة القيمة</li>
              <li className="text-b4m-muted">سيكولوجية التسعير</li>
              <li className="text-b4m-muted">الحشود الجائعة</li>
              <li className="text-b4m-muted">محرك المبيعات الآلي</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-b4m-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-b4m-muted text-sm">
            © {new Date().getFullYear()} BLACK4ME. جميع الحقوق محفوظة.
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:black4mestore@gmail.com" className="text-b4m-muted hover:text-b4m-gold transition text-sm">
              black4mestore@gmail.com
            </a>
            <span className="text-b4m-border">|</span>
            <span className="text-b4m-muted text-sm">جاسم محمد — تأليف</span>
          </div>
        </div>
      </div>
    </footer>
  );
}