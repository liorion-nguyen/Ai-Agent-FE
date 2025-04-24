'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  ACCESS_TOKEN,
  ADMIN_ROUTES,
  AUTH_ACTIONS,
  ROUTES,
} from '@/shared/constants';

export async function checkAdminAuth(type: AUTH_ACTIONS) {
  const token = cookies().get(ACCESS_TOKEN);

  if (type === AUTH_ACTIONS.SIGN_IN) {
    if (token?.value) {
      redirect(ADMIN_ROUTES.DASHBOARD);
    }
  }

  if (type === AUTH_ACTIONS.DASH_BOARD) {
    if (!token?.value) {
      redirect(ADMIN_ROUTES.SIGNIN);
    }
  }
}

export async function checkUserAuth(type: AUTH_ACTIONS) {
  const token = cookies().get(ACCESS_TOKEN);
  if (type === AUTH_ACTIONS.SIGN_IN) {
    if (token?.value) {
      redirect(ROUTES.HOME);
    }
  }

  if (type === AUTH_ACTIONS.HOME) {
    if (!token?.value) {
      redirect(ADMIN_ROUTES.SIGNIN);
    }
  }
}
