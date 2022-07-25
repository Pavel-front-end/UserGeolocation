export const extractBaseUrl = (): string => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

  if (baseURL === undefined) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL not provided')
  }

  return baseURL
}
