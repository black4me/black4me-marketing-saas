# BLACK4ME SaaS — دليل النشر على Vercel

البناء جاهز للنشر. اختر طريقة من الطرق التالية حسب راحتك:

---

## الطريقة 1: رفع مباشر على Vercel (الأسهل — 30 ثانية)

### الخطوات:
1. افتح https://vercel.com/new
2. سجّل دخول بحسابك (أو أنشئ حساب مجاني)
3. اختر **"Browse Projects"** ثم ارفع مجلد `dist/` كاملاً (الملف المضغوط `black4me-saas-dist.tar.gz`)
4. اضغط **Deploy**

### أو من سطر الأوامر:
```bash
tar -xzf black4me-saas-dist.tar.gz
cd dist
vercel --prod
```

ستحصل على رابط فوري مثل: `https://black4me-saas-xxx.vercel.app`

---

## الطريقة 2: GitHub + Vercel Import (موصى بها للتطوير المستمر)

### الخطوات:
1. ارفع الكود على GitHub:
   ```bash
   tar -xzf black4me-saas-source.tar.gz
   cd marketing-saas
   git init
   git add .
   git commit -m "BLACK4ME SaaS v1"
   git remote add origin https://github.com/YOUR_USERNAME/black4me-saas.git
   git push -u origin main
   ```

2. في Vercel: https://vercel.com/new → **Import Git Repository** → اختر الـ repo

3. الإعدادات التلقائية ستكتشف:
   - Framework: **Vite**
   - Build Command: `bun run build`
   - Output Directory: `dist`

4. اضغط **Deploy**

كل push جديد على GitHub = deploy تلقائي.

---

## الطريقة 3: Vercel CLI من جهازك المحلي

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
tar -xzf black4me-saas-dist.tar.gz
cd dist
vercel --prod
```

---

## بعد النشر — اختبار سريع

افتح الرابط اللي يعطيك إياه Vercel وتحقق من:

1. ✅ الصفحة الرئيسية تظهر بهوية BLACK4ME (أسود + ذهبي)
2. ✅ RTL عربي يعمل
3. ✅ مربع الإدخال يستقبل نص
4. ✅ اضغط "ولّد خطتي الآن" بعد إدخال وصف
5. ✅ تظهر الوحدات الثلاث مع كل التفاصيليست
6. ✅ أزرار النسخ تنسخ النصوص للحافظة

---

## إضافة دومين مخصص (اختياري)

في Vercel Dashboard → Project → Settings → Domains:
- أضف `tool.black4me.me` أو أي دومين تملكه
- Vercel يعطيك DNS records لإضافتها عند مزود الدومين

---

## ملاحظات تقنية

- **Framework:** Vite (تم اكتشافه تلقائياً من vercel.json)
- **Build Command:** `bun run build`
- **Output Directory:** `dist`
- **إعدادات SPA:** موجودة في `vercel.json` (rewrites للـ index.html)
- **حجم الباندل:** ~253KB JS + 24KB CSS (gzipped: 72KB + 5KB)
- **لا backend:** SPA ثابت، يمكن استضافته على أي CDN

---

## ما يمكن إضافته لاحقاً (تحسينات اختيارية)

1. **LLM حقيقي:** استبدال قوالب الـ engine بدعوات Claude/GPT للإخراج المخصص
2. **حفظ الخطط:** localStorage أو backend لتاريخ الخطط
3. **تصدير PDF:** زر لتصدير الخطة كاملة كـ PDF
4. **مشاركة:** رابط فريد لكل خطة
5. **مدفوعات:** Stripe للنسخة المدفوعة بميزات إضافية
6. **تحليلات:** تتبع عدد الخطط المُولّدة والقطاعات الأكثر شيوعاً

البنية الحالية جاهزة لكل هذه الإضافات بدون إعادة هيكلة.