// CV bilgileri. Burası boş bırakılan bölümler sayfada hiç görünmez.
// Doldurmak için ilgili listeye kayıt ekle; Türkçe ve İngilizce metni ayrı yaz.
type Text = { tr: string; en: string };

export const cv = {
  name: 'highlvmami',
  role: { tr: 'Yazılım geliştirici', en: 'Software developer' } as Text,
  github: 'https://github.com/highlvmami',
  summary: null as Text | null,
  experience: [] as { title: Text; place: string; period: string; text?: Text }[],
  education: [] as { title: Text; place: string; period: string }[],
};
