import { clearSessionCookies, redirect, safeNext } from '../../_lib/auth';

export const onRequestGet = async ({ request }: { request: Request }) =>
  redirect(safeNext(new URL(request.url).searchParams.get('next')), clearSessionCookies());
