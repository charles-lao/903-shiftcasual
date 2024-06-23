import { cookies } from 'next/headers';
import { Lucia } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';

import { db } from '../db';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import {adapter} from '../db/schema';

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}

export async function createAuthSession(userId:any) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
      sessionCookie.name, 
      sessionCookie.value, 
      sessionCookie.attributes
  );
}

export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie) {
      return {
          user: null,
          session: null
      };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
      return {
          user: null,
          session: null
      };
  }

  const result = await lucia.validateSession(sessionId);

  try {
      if (result.session && result.session.fresh) {
          const sessionCookie = lucia.createSessionCookie(result.session.id);
          cookies().set(
              sessionCookie.name,
              sessionCookie.value,
              sessionCookie.attributes
          );
      }
      if (!result.session) {
          const sessionCookie = lucia.createBlankSessionCookie();
          cookies().set(
              sessionCookie.name,
              sessionCookie.value,
              sessionCookie.attributes
          );
      }
  } catch {}

  return result;
}

export async function destroySession() {
  const {session} = await verifyAuth();

  if(!session) {
      return {
          error: 'Unauthorized!'
      }
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
  );
}

export async function getCurrentUserId() {
    const currSession = await verifyAuth();

    if (currSession.user){
        return currSession.user.id;
    }

}