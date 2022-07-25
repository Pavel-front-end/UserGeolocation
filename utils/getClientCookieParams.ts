import { CookieAttributes } from 'js-cookie'

export const getClientCookieParams = (): CookieAttributes => {
  const expires = process.env.NEXT_PUBLIC_CLIENT_COOKIE_EXPIRES

  if (!expires) {
    throw new Error('NEXT_PUBLIC_CLIENT_COOKIE_EXPIRES not provided')
  }

  return {
    expires: Number(expires),
    SameSite: 'Lax',
  }
}
