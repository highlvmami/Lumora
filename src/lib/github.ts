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
