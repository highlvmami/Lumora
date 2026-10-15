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
  <img src="docs/screenshots/anasayfa.jpg" alt="Ana sayfa: terminal temalı tanıtım, proje listesi ve istatistikler" width="100%">
</p>

<p align="center">
  <img src="docs/screenshots/projeler.jpg" alt="Projeler: kategori ve duruma göre süzülebilen liste" width="49%">
  <img src="docs/screenshots/proje-detay.jpg" alt="Proje sayfası: açıklama, özellikler ve teknolojiler" width="49%">
</p>

<p align="center">
  <img src="docs/screenshots/cv.jpg" alt="CV sayfası: teknolojiler ve projeler otomatik gelir" width="49%">
  <img src="docs/screenshots/giris.jpg" alt="Yönetici giriş sayfası" width="49%">
</p>

<p align="center">
  <img src="docs/screenshots/acik-tema.jpg" alt="Açık tema" width="49%">
  <img src="docs/screenshots/ingilizce.jpg" alt="İngilizce sürüm" width="49%">
</p>

<p align="center">
  <img src="docs/screenshots/mobil.jpg" alt="Telefonda ana sayfa" width="30%">
</p>

<p align="center"><sub>Ana sayfa · Projeler · Proje sayfası · CV · Yönetici girişi · Açık tema · İngilizce sürüm · Mobil görünüm</sub></p>

## Neler var

- **Projeler:** LumoraRPG, LumoraSocial, LumoraBoard, LumoraLink, LumoraTools, LumoraFiles ve LumoraGo yayında; Lumora Forge ve Lumora Academy geliştiriliyor.
- **İki dil:** Türkçe `/`, İngilizce `/en/`. Sağ üstteki TR | EN düğmesi aynı sayfanın diğer dilini açar, seçim hatırlanır ve ilk ziyarette tarayıcı diline göre yönlendirilir.
- **Yazılımcı sitesi görünümü:** terminal temalı ana sayfa, kod yorumu tarzı başlıklar, durum çubuğu altlık ve hafif animasyonlar (hareketi azalt ayarı açıkken kapanır).
- **CV sayfası:** teknolojiler ve projeler sitedeki projelerden otomatik gelir; "PDF olarak kaydet" düğmesiyle yazdırılabilir.
- **Yönetici girişi:** site sahibi GitHub ile girip blog yazısı ekleyebilir ve öne çıkan projeleri seçebilir.
- **Koyu ve açık tema:** sağ üstteki düğmeyle değişir, seçim tarayıcıda saklanır.
- **Blog:** duyurular, sürüm notları ve grafikli yazılar; Türkçe ve İngilizce.
- **GitHub bilgileri:** yıldız, son güncelleme ve son sürüm derleme sırasında çekilir; günlük otomatik yeniden derleme ile güncel kalır.
- **SEO ve paylaşım:** sitemap, hreflang, Open Graph görseli ve güvenlik başlıkları hazırdır.
- **Hızlı ve hafif:** sayfalar önceden HTML olarak üretilir, çerez ve takip betiği yoktur.

## Sayfalar

| Sayfa | Adres |
| --- | --- |
| Ana sayfa | `/` · `/en/` |
| Projeler ve proje detayları | `/projeler/` · `/en/projects/` |
| Blog | `/blog/` · `/en/blog/` |
| CV | `/cv/` · `/en/cv/` |
| Hakkında | `/hakkinda/` · `/en/about/` |
| İletişim | `/iletisim/` · `/en/contact/` |
| Yönetici girişi | `/giris/` · `/en/login/` |

## Teknolojiler

Astro, Tailwind CSS, TypeScript; Cloudflare Pages ve Pages Functions; yönetici girişi için GitHub OAuth, favoriler ve blog yazıları için Cloudflare KV.
