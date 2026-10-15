// Proje kartlarındaki GitHub bilgileri site derlenirken çekilir.
// GITHUB_TOKEN tanımlıysa kullanılır (istek sınırı daha yüksek); erişilemezse kartlar bu bilgiler olmadan gösterilir.

export interface RepoStats {
  stars: number;
  pushedAt: string;
  release?: string;
}

const cache = new Map<string, Promise<RepoStats | null>>();

async function gh(path: string) {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'lumora-site',
  };
  const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`https://api.github.com${path}`, {
    headers,
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) return null;
  return res.json();
}

async function load(repo: string): Promise<RepoStats | null> {
  try {
    const info = await gh(`/repos/${repo}`);
    if (!info) return null;
    const release = await gh(`/repos/${repo}/releases/latest`).catch(() => null);
    return {
      stars: info.stargazers_count ?? 0,
      pushedAt: info.pushed_at,
      release: release?.tag_name,
    };
  } catch {
    return null;
  }
}

export function getRepoStats(repo: string) {
  if (!cache.has(repo)) cache.set(repo, load(repo));
  return cache.get(repo)!;
}

// Depodaki dillerin byte cinsinden kullanım payları (GitHub'ın dil çubuğuyla aynı veri).
export interface RepoLanguage {
  name: string;
  percent: number;
}

const langCache = new Map<string, Promise<RepoLanguage[] | null>>();

async function loadLanguages(repo: string): Promise<RepoLanguage[] | null> {
  try {
    const data: Record<string, number> | null = await gh(`/repos/${repo}/languages`);
    if (!data) return null;
    const total = Object.values(data).reduce((a, b) => a + b, 0);
    if (!total) return null;
    return Object.entries(data)
      .map(([name, bytes]) => ({ name, percent: (bytes / total) * 100 }))
      .sort((a, b) => b.percent - a.percent);
  } catch {
    return null;
  }
}

export function getRepoLanguages(repo: string) {
  if (!langCache.has(repo)) langCache.set(repo, loadLanguages(repo));
  return langCache.get(repo)!;
}
