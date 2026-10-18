// CV bilgileri. Burası boş bırakılan bölümler sayfada hiç görünmez.
// Doldurmak için ilgili listeye kayıt ekle; Türkçe ve İngilizce metni ayrı yaz.
type Text = { tr: string; en: string };

export const cv = {
  name: 'Muhammet Oruçoğlu',
  role: { tr: 'Yazılım Mühendisliği öğrencisi · Geliştirici', en: 'Software Engineering student · Developer' } as Text,
  // İletişim ve sosyal medya. Adresi boş olan satır sayfada görünmez; doldurman yeterli.
  contacts: [
    { name: 'Web', url: 'https://lumora.is-a.dev' },
    { name: 'GitHub', url: 'https://github.com/highlvmami' },
    { name: 'LinkedIn', url: '' },
    { name: 'E-posta', url: '' }, // mailto:adres@ornek.com
    { name: 'Instagram', url: '' },
    { name: 'X', url: '' },
    { name: 'YouTube', url: '' },
    { name: 'Discord', url: '' },
    { name: 'Medium', url: '' },
    { name: 'Telefon', url: '' }, // tel:+90...
  ] as { name: string; url: string }[],
  // "Neler yapacağım" bölümüne geliştirilen projelerin yanında eklenecek hedefler.
  goals: [] as Text[],
  // Boşsa sayfa projelerden kısa bir özet üretir.
  summary: null as Text | null,
  experience: [
    { title: { tr: 'Stajyer', en: 'Intern' }, place: 'Grandoria Turizm', period: '07.2021 – 09.2021' },
  ] as { title: Text; place: string; period: string; text?: Text }[],
  education: [
    {
      title: { tr: 'Yazılım Mühendisliği', en: 'Software Engineering' },
      place: 'Manisa Celal Bayar Üniversitesi',
      period: { tr: '3. sınıf, devam ediyor', en: '3rd year, ongoing' },
    },
    {
      title: { tr: 'Veri Tabanı Programcılığı', en: 'Database Programming' },
      place: 'Profilo Barış Mesleki ve Teknik Anadolu Lisesi',
      period: '2018 – 2022',
    },
  ] as { title: Text; place: string; period: string | Text }[],
};

// Teknolojilerin CV'de hangi grupta görüneceği. Listede olmayan "Diğer" grubuna düşer.
export const skillGroups: { name: Text; items: string[] }[] = [
  { name: { tr: 'Diller', en: 'Languages' }, items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'C#', 'GDScript'] },
  { name: { tr: 'Ön yüz', en: 'Frontend' }, items: ['React', 'Next.js', 'SvelteKit', 'Tailwind CSS', 'Canvas', 'Web Push', 'Android TWA'] },
  { name: { tr: 'Arka uç', en: 'Backend' }, items: ['Node.js', 'Express', 'Flask', 'WebSocket', 'Prisma', 'Firebase'] },
  { name: { tr: 'Veritabanı', en: 'Databases' }, items: ['PostgreSQL', 'SQLite', 'SQL Server', 'Turso'] },
  { name: { tr: 'Masaüstü ve oyun', en: 'Desktop & games' }, items: ['.NET', 'WPF', 'Tkinter', 'customtkinter', 'Godot', 'PyInstaller', 'Velopack', 'pynput', 'mss'] },
  { name: { tr: 'Yapay zekâ ve API', en: 'AI & APIs' }, items: ['Claude API', 'Google API'] },
  { name: { tr: 'Araçlar', en: 'Tooling' }, items: ['Docker', 'GitHub Actions', 'Render', 'pytest'] },
];

// "Next.js 16", "SQLite FTS5" gibi sürüm/ek içeren adları tek ada indirir.
const aliases: Record<string, string> = { 'SQLite FTS5': 'SQLite' };
export function skillName(raw: string) {
  return aliases[raw] ?? raw.replace(/\s+v?\d+(\.\d+)*$/, '');
}
