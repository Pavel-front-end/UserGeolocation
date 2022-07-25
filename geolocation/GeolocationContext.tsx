import { createContext, FC, useCallback, useContext, useState } from 'react'
import { setCookie } from '../utils/setCookie'
import { CookieKeys } from '../utils/constants'
import { UserGeolocation } from './types'

type GeolocationContextType = {
  userGeolocation: UserGeolocation
  onSetUserGeolocation: (geolocationData: UserGeolocation) => void
  didWeAskUser: boolean
  onSetDidWeAskUser: () => void
}

const GeolocationContext = createContext<GeolocationContextType | undefined>(undefined)

type Props = {
  initialGeo: UserGeolocation
}

const GeolocationProvider: FC<Props> = ({ children, initialGeo }) => {
  const [userGeolocation, setUserGeolocation] = useState<UserGeolocation>(initialGeo)
  const [didWeAskUser, setDidWeAskUser] = useState(!initialGeo.isDefault)

  const onSetUserGeolocation = useCallback((geolocationData: UserGeolocation) => {
    setCookie({ name: CookieKeys.userGeolocation, value: geolocationData })
    setUserGeolocation(geolocationData)
  }, [])

  const onSetDidWeAskUser = useCallback(() => {
    setDidWeAskUser(true)
  }, [])

  return (
    <GeolocationContext.Provider value={{ userGeolocation, onSetUserGeolocation, didWeAskUser, onSetDidWeAskUser }}>
      {children}
    </GeolocationContext.Provider>
  )
}

const useGeolocation = (): GeolocationContextType => {
  const context = useContext(GeolocationContext)
  if (context === undefined) {
    throw new Error('useGeolocation must be used within a GeolocationProvider')
  }
  return context
}

export { GeolocationProvider, useGeolocation }
