import { json, readSession, type Env } from '../../_lib/auth';

export const onRequestGet = async ({ request, env }: { request: Request; env: Env }) => {
  const login = await readSession(env, request);
  return json(login ? { admin: true, login } : { admin: false });
};
