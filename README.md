<div align="center">

# Lumora

**Lumora projelerinin vitrin sitesi: oyunlar, sosyal ağlar, gerçek zamanlı araçlar ve daha fazlası tek yerde. Türkçe ve İngilizce, koyu ve açık tema, hızlı ve statik.**

**[Siteyi aç → lumorahub.pages.dev](https://lumorahub.pages.dev)**

Türkçe · [English](README.en.md)

<p>
  <img src="https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white" alt="Astro 5">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Pages">
  <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=white" alt="GitHub Actions">
</p>

</div>

Lumora, geliştirdiğimiz projelerin bir arada durduğu ana sitedir. Her projenin kendi sayfasında tanıtım metni, ekran görüntüleri, özellikler, kullanılan teknolojiler ve "Siteye git / İndir / Kaynak kod" bağlantıları bulunur. Yıldız sayısı, son güncelleme ve son sürüm bilgisi GitHub'dan otomatik çekilir ve her gün tazelenir. Site tamamen statiktir: çökecek bir sunucu yoktur, Cloudflare'in dünya çapındaki ağından servis edilir.

## Ekran görüntüleri

<p align="center">
  <img src="docs/screenshots/anasayfa.jpg" alt="Ana sayfa: tanıtım ve öne çıkan projeler" width="100%">
</p>

<p align="center">
  <img src="docs/screenshots/projeler.jpg" alt="Projeler: kategori ve duruma göre süzülebilen liste" width="49%">
  <img src="docs/screenshots/proje-detay.jpg" alt="Proje sayfası: açıklama, özellikler ve teknolojiler" width="49%">
</p>

<p align="center">
  <img src="docs/screenshots/acik-tema.jpg" alt="Açık tema" width="49%">
  <img src="docs/screenshots/ingilizce.jpg" alt="İngilizce sürüm" width="49%">
</p>

<p align="center">
  <img src="docs/screenshots/mobil.jpg" alt="Telefonda ana sayfa" width="30%">
</p>

<p align="center"><sub>Ana sayfa · Projeler · Proje sayfası · Açık tema · İngilizce sürüm · Mobil görünüm</sub></p>

## Neler var

- **Projeler:** LumoraRPG, LumoraSocial, LumoraBoard, LumoraLink, LumoraTools ve LumoraFiles yayında; Lumora Forge ve Lumora Academy geliştiriliyor.
- **İki dil:** Türkçe `/`, İngilizce `/en/`. Sağ üstteki TR | EN düğmesi aynı sayfanın diğer dilini açar, seçim hatırlanır ve ilk ziyarette tarayıcı diline göre yönlendirilir.
- **Koyu ve açık tema:** sağ üstteki düğmeyle değişir, seçim tarayıcıda saklanır.
- **Blog:** duyurular ve sürüm notları için, yazılar Markdown dosyasıdır.
- **GitHub bilgileri:** yıldız, son güncelleme ve son sürüm derleme sırasında çekilir; günlük otomatik yeniden derleme ile güncel kalır.
- **SEO ve paylaşım:** sitemap, hreflang, Open Graph görseli ve güvenlik başlıkları hazırdır.
- **Hızlı ve hafif:** sayfalar önceden HTML olarak üretilir, çerez ve takip betiği yoktur.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # çıktı: dist/
```

Node 22 gerekir (`.nvmrc`).

## Yeni proje eklemek

`src/content/projects/` klasörüne yeni bir `.json` dosyası ekle (mevcutlardan birini kopyalayıp düzenlemek en kolayı). Dosya adı adres olur: `lumora-yeni.json` → `/projeler/lumora-yeni/` ve `/en/projects/lumora-yeni/`.

| Alan | Açıklama |
| --- | --- |
| `status` | `live` (Yayında), `beta` veya `development` (Geliştiriliyor) |
| `order` | Sıralama |
| `repo` | `kullanici/depo`; yıldız sayısı, son güncelleme ve son sürüm buradan otomatik çekilir |
| `links` | "Siteye git", "İndir" gibi butonlar; ilki ana buton olur |
| `screenshots` | `public/projects/` altındaki görseller; ilki kart kapağı olur. Yoksa kartta ikon ve renk gösterilir. Telefon görüntüleri için `"portrait": true` |
| `accent`, `icon` | Projenin vurgu rengi ve emojisi |

Metin alanlarının hepsi `{ "tr": "...", "en": "..." }` şeklindedir. Arayüz metinleri `src/lib/i18n.ts` içindedir.

## Blog yazısı eklemek

`src/content/posts/<adres>/` klasörü açıp içine `tr.md` ve/veya `en.md` koy (iki dil de zorunlu değil; yalnızca bir dil varsa diğer dilin blog sayfasına yönlenir). Dosya başı:

```md
---
title: Başlık
description: Listede görünen kısa açıklama
date: 2026-10-10
---

Yazı metni (Markdown).
```

Yazılar `/blog/<adres>/` ve `/en/blog/<adres>/` altında yayınlanır, ana sayfada son iki yazı görünür.

## Tema

Açık tema `src/styles/global.css` içinde `html[data-theme='light']` bloğundadır; renkler değişken olarak tanımlıdır, mevcut Tailwind sınıfları temayla birlikte kendiliğinden tersine döner.

## Yayına alma (Cloudflare Pages, ücretsiz)

1. [dash.cloudflare.com](https://dash.cloudflare.com) üzerinden ücretsiz hesap aç.
2. **Workers & Pages → Create → Pages → Connect to Git** ile bu depoyu seç.
3. Ayarlar: Framework preset **Astro**, build komutu `npm run build`, çıktı klasörü `dist`.
4. Proje adını `lumorahub` yap; site `https://lumorahub.pages.dev` adresinde açılır. Adres değişirse `astro.config.mjs` içindeki `site` ve `public/robots.txt` adresini güncelle.
5. (İsteğe bağlı) **Settings → Environment variables** altına `GITHUB_TOKEN` ekle; GitHub istek sınırına takılmayı önler.

`main` dalına her birleştirme siteyi otomatik günceller; her PR için ayrı bir önizleme linki oluşur.

### Günlük yenileme

Proje kartlarındaki GitHub bilgilerinin her gün tazelenmesi için Cloudflare'de **Settings → Builds → Deploy hooks** ile bir hook oluştur, URL'yi bu deponun **Settings → Secrets and variables → Actions** bölümüne `CLOUDFLARE_DEPLOY_HOOK` adıyla ekle. `.github/workflows/daily-rebuild.yml` her gün 04:00 UTC'de siteyi yeniden derletir.

### Ziyaretçi istatistiği

Cloudflare'de projeyi aç, **Metrics → Web Analytics → Enable** de. Kod değişikliği gerekmez; çerez kullanmaz.

### 7/24 izleme

[UptimeRobot](https://uptimerobot.com) (ücretsiz) üzerinde site ve projelerin canlı adresleri için HTTP monitörü kur; kesinti olduğunda e-posta veya Telegram bildirimi gelir ve ücretsiz bir durum sayfası açılabilir.

## Yönetici girişi ve öne çıkarma

Site sahibi GitHub hesabıyla girip projeleri yıldızlayarak ana sayfanın en üstündeki "Öne çıkan projeler" bölümünü belirleyebilir; altında her zaman "Tüm projeler" bölümü durur. Alt bilgideki **Yönetici girişi** bağlantısı GitHub OAuth ile giriş yaptırır; yalnızca `ADMIN_LOGIN` hesabı (varsayılan `highlvmami`) yetkilidir. Giriş yapınca kartların köşesinde ☆/★ düğmesi çıkar; seçim Cloudflare KV'ye yazılır ve herkese açık ana sayfa bu listeyi okur. Hiç favori seçilmemişse üstteki bölüm görünmez.

Kod `functions/` altındaki Cloudflare Pages Functions'tır (`/api/auth/*`, `/api/favorites`). Çalışması için Cloudflare'de bir kerelik kurulum gerekir:

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**: Homepage `https://lumorahub.pages.dev`, Authorization callback URL `https://lumorahub.pages.dev/api/auth/callback`. Oluşan **Client ID**'yi not al, **Generate a new client secret** ile bir secret üret.
2. Cloudflare → **Workers & Pages → KV → Create namespace** (ör. `lumora-favorites`).
3. Cloudflare → `lumorahub` projesi → **Settings → Bindings → Add → KV namespace**: değişken adı `FAVORITES`, az önceki namespace.
4. Aynı projede **Settings → Variables and Secrets** altına ekle (Production): `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (Secret olarak), `SESSION_SECRET` (rastgele uzun bir metin, Secret olarak). İsteğe bağlı: `ADMIN_LOGIN`.
5. Siteyi yeniden dağıt (Deployments → son dağıtım → Retry) ya da `main`'e yeni bir birleştirme yap.

Yerelde denemek için `npm run build` sonrası `npx wrangler pages dev dist --kv FAVORITES --binding SESSION_SECRET=x GITHUB_CLIENT_ID=x GITHUB_CLIENT_SECRET=x`.

### Yönetici blog editörü

Giriş yapınca blog sayfasında **+ Yeni yazı** düğmesi çıkar. Editörde başlık, kısa açıklama, dil, adres ve Markdown metni yazılır, yanında canlı önizleme görünür. Yazılar aynı Cloudflare KV'ye (`FAVORITES` bağlaması) `post:<adres>` anahtarıyla kaydedilir, blog listesinde tarihe göre statik yazıların arasına girer, yazı sayfasında yöneticiye **Düzenle** ve **Sil** düğmeleri görünür. Ek bir kurulum gerekmez. Yazı sayfası `/blog/yazi/?s=<adres>` adresinde istemci tarafında çizilir ve arama motorlarına kapalıdır; kalıcı ve aranabilir yazılar için `src/content/posts/` altına Markdown dosyası eklemeye devam edebilirsin. Güvenlik başlıkları (CSP) yüzünden yazılarda yalnızca siteden sunulan görseller (`/projects/...` gibi) görünür.

## Proje yapısı

| Klasör | İçerik |
| --- | --- |
| `src/content/` | Projeler (JSON) ve blog yazıları (Markdown) |
| `src/pages/` | Türkçe sayfalar; `src/pages/en/` altında İngilizce karşılıkları |
| `src/views/` | İki dilin paylaştığı sayfa gövdeleri |
| `src/components/`, `src/layouts/` | Başlık, alt bilgi, kartlar, ortak sayfa iskeleti |
| `src/lib/` | Arayüz metinleri, GitHub verisi, proje ve yazı yardımcıları |
| `functions/` | Giriş ve öne çıkarma API'si (Cloudflare Pages Functions) |
| `public/` | Logo, görseller, `robots.txt`, güvenlik başlıkları |
| `.github/workflows/` | Derleme kontrolü ve günlük yeniden derleme |
