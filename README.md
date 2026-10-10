# Lumora

Lumora projelerinin vitrin sitesi: LumoraRPG, LumoraSocial, LumoraBoard, LumoraLink, Lumora Forge ve Lumora Academy.

Türkçe ve İngilizce, statik (Astro + Tailwind CSS), Cloudflare Pages üzerinde yayınlanır.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # çıktı: dist/
```

## Yeni proje eklemek

`src/content/projects/` klasörüne yeni bir `.json` dosyası ekle (mevcutlardan birini kopyalayıp düzenlemek en kolayı). Dosya adı adres olur: `lumora-yeni.json` → `/projeler/lumora-yeni/` ve `/en/projects/lumora-yeni/`.

| Alan | Açıklama |
| --- | --- |
| `status` | `live` (Yayında), `beta` veya `development` (Geliştiriliyor) |
| `featured` | `true` ise ana sayfada "Öne çıkan projeler" bölümünde büyük kartla görünür |
| `order` | Sıralama |
| `repo` | `kullanici/depo`; yıldız sayısı, son güncelleme ve son sürüm buradan otomatik çekilir |
| `links` | "Siteye git", "İndir" gibi butonlar; ilki ana buton olur |
| `screenshots` | `public/projects/` altındaki görseller; ilki kart kapağı olur. Yoksa kartta ikon ve renk gösterilir |
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

Sağ üstteki düğmeyle koyu/açık tema değiştirilir, seçim tarayıcıda hatırlanır. Açık tema `src/styles/global.css` içinde `html[data-theme='light']` bloğundadır.

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
