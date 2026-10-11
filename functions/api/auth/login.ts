import { cookie, getCookie, page, redirect, safeNext, type Env } from '../../_lib/auth';

// GitHub ile girişi başlatır. state ve dönülecek sayfa kısa ömürlü çerezlerde tutulur.
export const onRequestGet = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !env.SESSION_SECRET) {
    return page('Giriş henüz ayarlanmamış.', 503);
  }
  const url = new URL(request.url);
  const state = crypto.randomUUID();
  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorize.searchParams.set('redirect_uri', `${url.origin}/api/auth/callback`);
  authorize.searchParams.set('state', state);
  authorize.searchParams.set('allow_signup', 'false');
  return redirect(authorize.toString(), [
    cookie('lumora_oauth_state', state, { maxAge: 600, path: '/api/auth' }),
    cookie('lumora_oauth_next', safeNext(url.searchParams.get('next')), { maxAge: 600, path: '/api/auth' }),
  ]);
};
