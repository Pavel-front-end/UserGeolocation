import ClientCookie from 'js-cookie'
import { CookieKeys } from './constants'
import { getClientCookieParams } from './getClientCookieParams'

const cookieParams = getClientCookieParams()

type Args = {
  name: CookieKeys
  value: string | Record<string, unknown> | unknown[]
}

export function setCookie({ name, value }: Args): void {
  ClientCookie.set(name, value, cookieParams)
}
