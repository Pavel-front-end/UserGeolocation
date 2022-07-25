import { UserGeolocation } from '../types'
import { defaultCityList } from './defaultCityList'

export const generateInitialCityList = (initialGeolocation: UserGeolocation | undefined): UserGeolocation[] => {
  if (!initialGeolocation) return defaultCityList

  const isInitialGeolocationWithinDefaultCityList = defaultCityList.some(
    (item) => item.geolocationId === initialGeolocation.geolocationId,
  )

  return isInitialGeolocationWithinDefaultCityList ? defaultCityList : [initialGeolocation, ...defaultCityList]
}
