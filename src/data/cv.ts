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
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/muhammet-oruçoğlu' },
    { name: 'Instagram', url: 'https://www.instagram.com/highlvmami' },
    { name: 'E-posta', url: '' }, // mailto:adres@ornek.com
    { name: 'X', url: '' },
    { name: 'YouTube', url: '' },
    { name: 'Discord', url: '' },
    { name: 'Medium', url: '' },
    { name: 'Telefon', url: '' }, // tel:+90...
  ] as { name: string; url: string }[],
  // "Neler yapacağım" bölümüne geliştirilen projelerin yanında eklenecek hedefler.
  goals: [] as Text[],
  // Projelerde geçmese de bildiğim teknolojiler; Teknolojiler bölümüne eklenir.
  extraSkills: ['C', 'C++'],
  // "Hikayem" bölümü; her eleman bir paragraf.
  story: [
    {
      tr: "Yazılıma lisede başladım. Profilo Barış Mesleki ve Teknik Anadolu Lisesi'nde Veri Tabanı Programcılığı okurken HTML, CSS, PHP ve MySQL ile ilk web sitelerimi yaptım; boş zamanlarımda pixel art çiziyor, oyun bölümleri ve hikâyeleri tasarlıyordum. O zamanlar hedefim ya web geliştirici ya da oyun geliştirici olmaktı. 2021 yazında Grandoria Turizm'deki stajımla ilk iş deneyimimi edindim.",
      en: "I started coding in high school. While studying Database Programming at Profilo Barış Vocational and Technical High School, I built my first websites with HTML, CSS, PHP and MySQL, and in my spare time I drew pixel art and designed game levels and stories. Back then I wanted to become either a web developer or a game developer. In the summer of 2021 I got my first work experience as an intern at Grandoria Turizm.",
    },
    {
      tr: "Bugün Manisa Celal Bayar Üniversitesi'nde Yazılım Mühendisliği okuyorum ve o iki hedefi bir araya getiriyorum. Lumora çatısı altında arkadaşlarla birlikte oynanan bir roguelike oyundan gerçek zamanlı bir beyaz tahtaya, sosyal medyadan Windows araçlarına kadar uçtan uca projeler geliştiriyorum. Bir fikri tasarımından yayına kadar götürmeyi ve insanların gerçekten kullandığı şeyler üretmeyi seviyorum.",
      en: "Today I study Software Engineering at Manisa Celal Bayar University, and I'm bringing those two goals together. Under the Lumora umbrella I build end-to-end projects, from a co-op roguelike you play with friends to a real-time whiteboard, a social network and Windows tools. I love taking an idea from design all the way to release and making things people actually use.",
    },
  ] as Text[],
  // İlgi alanları; Teknolojiler bölümünün altında görünür.
  interests: [
    { tr: 'Oyun geliştirme', en: 'Game development' },
    { tr: 'Pixel art', en: 'Pixel art' },
    { tr: 'Bölüm tasarımı', en: 'Level design' },
    { tr: 'Oyun senaryosu', en: 'Game writing' },
    { tr: 'Gerçek zamanlı uygulamalar', en: 'Real-time apps' },
  ] as Text[],
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
  { name: { tr: 'Diller', en: 'Languages' }, items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'C', 'C++', 'Go', 'GDScript'] },
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
