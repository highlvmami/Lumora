// Yönetici oturumu: HMAC imzalı, süreli bir çerez. Yalnızca ADMIN_LOGIN (varsayılan highlvmami) hesabı girebilir.

export interface Env {
  FAVORITES?: KVNamespace;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  SESSION_SECRET?: string;
  ADMIN_LOGIN?: string;
}

// Cloudflare Workers tiplerini eklememek için KV'nin kullandığımız küçük kısmı.
export interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { metadata?: unknown }): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: { prefix?: string }): Promise<{ keys: { name: string; metadata?: unknown }[] }>;
}

export const SESSION_COOKIE = 'lumora_session';
export const FLAG_COOKIE = 'lumora_admin';
const SESSION_SECONDS = 60 * 60 * 24 * 7;

const enc = new TextEncoder();

function b64url(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(s: string): Uint8Array {
  const pad = '='.repeat((4 - (s.length % 4)) % 4);
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function hmacKey(secret: string, usage: 'sign' | 'verify') {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [usage]);
}

export function adminLogin(env: Env): string {
  return (env.ADMIN_LOGIN || 'highlvmami').toLowerCase();
}

export async function createSession(env: Env, login: string): Promise<string> {
  if (!env.SESSION_SECRET) throw new Error('SESSION_SECRET tanımlı değil');
  const payload = b64url(enc.encode(JSON.stringify({ login, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS })));
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(env.SESSION_SECRET, 'sign'), enc.encode(payload));
  return `${payload}.${b64url(new Uint8Array(sig))}`;
}

export async function readSession(env: Env, request: Request): Promise<string | null> {
  if (!env.SESSION_SECRET) return null;
  const token = getCookie(request, SESSION_COOKIE);
  if (!token) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  try {
    const ok = await crypto.subtle.verify('HMAC', await hmacKey(env.SESSION_SECRET, 'verify'), fromB64url(sig), enc.encode(payload));
    if (!ok) return null;
    const data = JSON.parse(new TextDecoder().decode(fromB64url(payload)));
    if (typeof data.login !== 'string' || typeof data.exp !== 'number' || data.exp < Date.now() / 1000) return null;
    return data.login.toLowerCase() === adminLogin(env) ? data.login : null;
  } catch {
    return null;
  }
}

export function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get('Cookie') || '';
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

export function cookie(name: string, value: string, opts: { maxAge: number; httpOnly?: boolean; path?: string }): string {
  const parts = [`${name}=${encodeURIComponent(value)}`, `Path=${opts.path ?? '/'}`, `Max-Age=${opts.maxAge}`, 'Secure', 'SameSite=Lax'];
  if (opts.httpOnly !== false) parts.push('HttpOnly');
  return parts.join('; ');
}

export function sessionCookies(token: string): string[] {
  return [
    cookie(SESSION_COOKIE, token, { maxAge: SESSION_SECONDS }),
    // Tarayıcı betiği yalnızca "giriş yapılmış olabilir" ipucu için okur; yetki vermez.
    cookie(FLAG_COOKIE, '1', { maxAge: SESSION_SECONDS, httpOnly: false }),
  ];
}

export function clearSessionCookies(): string[] {
  return [cookie(SESSION_COOKIE, '', { maxAge: 0 }), cookie(FLAG_COOKIE, '', { maxAge: 0, httpOnly: false })];
}

// Yazma isteklerinde ortak kontrol: giriş yapmış yönetici ve aynı site kökeni. Başarısızsa yanıtı döndürür.
export async function requireAdmin(request: Request, env: Env): Promise<Response | null> {
  if (!(await readSession(env, request))) return json({ error: 'yetkisiz' }, 401);
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'yasak' }, 403);
  if (!env.FAVORITES) return json({ error: 'KV ayarlanmamış' }, 503);
  return null;
}

export function safeNext(value: string | null): string {
  return value && /^\/(?!\/)[\w\-./]*$/.test(value) ? value : '/';
}

export function json(data: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra },
  });
}

export function redirect(location: string, cookies: string[] = []): Response {
  const headers = new Headers({ Location: location, 'Cache-Control': 'no-store' });
  for (const c of cookies) headers.append('Set-Cookie', c);
  return new Response(null, { status: 302, headers });
}

export function page(message: string, status: number): Response {
  const html = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lumora</title><body style="font:16px system-ui;background:#0b0b14;color:#e8e8f0;display:grid;place-items:center;min-height:100vh;margin:0"><p style="max-width:28rem;padding:1rem">${message} <a style="color:#a78bfa" href="/">Ana sayfa</a></p>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}
