import { adminLogin, cookie, createSession, getCookie, page, redirect, safeNext, sessionCookies, type Env } from '../../_lib/auth';

// GitHub'dan dönen kodu doğrular; yalnızca yönetici hesabına oturum açar.
export const onRequestGet = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.SESSION_SECRET) {
    return page('Giriş henüz ayarlanmamış.', 503);
  }
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const expected = getCookie(request, 'lumora_oauth_state');
  const clear = [
    cookie('lumora_oauth_state', '', { maxAge: 0, path: '/api/auth' }),
    cookie('lumora_oauth_next', '', { maxAge: 0, path: '/api/auth' }),
  ];
  if (!code || !state || !expected || state !== expected) {
    return page('Giriş doğrulanamadı, tekrar dene.', 400);
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'User-Agent': 'lumora-site' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/api/auth/callback`,
    }),
  });
  const token = ((await tokenRes.json().catch(() => ({}))) as { access_token?: string }).access_token;
  if (!token) return page('GitHub girişi tamamlanamadı.', 502);

  const userRes = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'User-Agent': 'lumora-site' },
  });
  const login = ((await userRes.json().catch(() => ({}))) as { login?: string }).login;
  if (!login) return page('GitHub hesabı okunamadı.', 502);

  if (login.toLowerCase() !== adminLogin(env)) {
    return page('Bu hesabın yönetici yetkisi yok.', 403);
  }
  const session = await createSession(env, login);
  return redirect(safeNext(getCookie(request, 'lumora_oauth_next')), [...sessionCookies(session), ...clear]);
};
