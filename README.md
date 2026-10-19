# Kachoras Electromechanical Contracting LLC — Official Web Portal

> **Official Enterprise Portal for Kachoras Electromechanical Contracting LLC (كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م)**  
> Dubai Municipality Approved G+1 Building Contractor | Commercial License No. 578964 | Est. 2006 (Dubai, UAE)

---

## 🏛️ Project Overview

This is the bespoke, production-ready corporate website and digital estimating transmittal platform built from scratch for **Kachoras Electromechanical Contracting LLC**.

- **Design Philosophy**: High-end Dubai Luxury Contractor aesthetic (Imperial Mahogany Bronze `#7A2E16`, Champagne Gold `#C59B27`, Warm Ivory `#FBF9F5`, Slate Gray `#1E293B`).
- **Visual Engine**: Dual-mode architectural imagery (high-fidelity local renderings for all completed villas, majlis halls, civic facilities, MEP plants, and facade systems) plus real-time vector CAD blueprint views with 0% external CDN dependency.
- **Enterprise Engineering Roster**: Full 11-member technical leadership directory featuring direct phone & WhatsApp communication lines, designations, and trade oversight.
- **Project Portfolio**: 18 verified Dubai projects across G+1 private luxury residences, Dubai Municipality civic public facilities, and active ongoing developments with genuine Dubai plot numbers and approved engineering consultants.
- **Corporate Transparency**: Verified Government of Dubai Department of Economy and Tourism (DET) Commercial License #578964 registry and Dubai Municipality G+1 Building Contracting certification display.
- **Interactive Estimator**: Dubai Villa & MEP preliminary budget calculator in UAE Dirhams (AED) based on 2024–2025 square-foot market rates and finish tiers.
- **Direct Tender / RFP Transmittal**: Complete request-for-proposal submission workflow with drawing attachments and consultant specifications.

---

## 🚀 Quick Start & Production Commands

### 1. Development Server
```bash
npm run dev
# Running live on http://localhost:3000/
```

### 2. Compile Production Build
```bash
npm run build
# Compiles optimized, minified, and code-split production bundle into /dist
```

### 3. Local Production Preview
```bash
npm run preview
# Serves the compiled /dist folder on http://localhost:4173/
```

---

## 📁 Production Output Structure (`/dist`)

```
dist/
├── index.html                     # Optimized HTML with SEO, Open Graph & Schema.org JSON-LD
└── assets/
    ├── villa.jpg                  # Modern luxury G+1 villa render (Plot 4317233)
    ├── villa_stone.jpg            # Classic stone-clad luxury villa render (Plot 4312137)
    ├── villa_glass.jpg            # Contemporary glass-cornered villa render (Plot 3760253)
    ├── villa_arabic.jpg           # Andalusian / Emirati villa render (Plot 4247036)
    ├── villa_annex.jpg            # Private service villa extension render (Plot 6720582)
    ├── majlis.jpg                 # Royal Arabian Majlis pavilion render (Plot 3670958)
    ├── civic.jpg                  # Dubai Municipality civic veterinary facility render (Plot 8912682)
    ├── mep.jpg                    # Commercial electromechanical HVAC plant room render
    ├── aluminium.jpg              # High-end aluminium & curtain wall facade render
    ├── index-[hash].css           # Minified Tailwind & luxury architectural grid CSS
    ├── vendor-[hash].js           # React & ReactDOM vendor bundle (chunked)
    ├── lucide-[hash].js           # Lucide icon library bundle (chunked)
    └── index-[hash].js            # Application logic & interactive state (chunked)
```

---

## 🌐 Deployment Instructions

### Option A: Static Web Hosting (Vercel, Netlify, Cloudflare Pages)
1. Point your deployment to the project directory.
2. Build command: `npm run build`
3. Output directory: `dist`
4. The site is 100% client-side compatible with relative asset paths.

### Option B: Apache / Nginx / cPanel Hosting
1. Run `npm run build`.
2. Upload all files from inside `dist/` directly into your web root (e.g. `public_html/` or `/var/www/html/`).
3. For Nginx, use standard single-page app routing:
   ```nginx
   server {
       listen 80;
       server_name kachoras.ae www.kachoras.ae;
       root /var/www/html/kachoras;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

---

## 📞 Corporate Contact Information

- **Company**: Kachoras Electromechanical Contracting LLC (كاشوراس للمقاولات الكهروميكانيكية ش.ذ.م.م)
- **Headquarters**: Warehouse No. B-25, Bin Sougat Warehouse Complex, Al Qusais Industrial Area 1, Dubai, UAE
- **P.O. Box**: 123397, Dubai, United Arab Emirates
- **Telephone**: `+971 4 2390946` | **Fax**: `+971 4 2390947`
- **Mobile / WhatsApp**: `+971 55 5585079`
- **General Manager**: Jose K. George
- **Email**: `kachoras@eim.ae`
- **License**: Dubai Commercial License #578964 | Dubai Municipality G+1 Approved
