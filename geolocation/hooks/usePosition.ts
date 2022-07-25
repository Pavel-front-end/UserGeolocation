import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { getCityByLocation } from '../api/getCityByLocation'
import { UserGeolocation } from '../types'

type Props = {
  initialGeo: UserGeolocation | undefined
  onSetUserGeolocation: (geolocationData: UserGeolocation) => void
  didWeAskUser: boolean
  onSetDidWeAskUser: () => void
  onGeolocationModalOpen: () => void
  isLaptop: boolean
}

type HookReturns = {
  isLoading: boolean
}

export const usePosition = ({
  initialGeo,
  onSetUserGeolocation,
  didWeAskUser,
  onSetDidWeAskUser,
  onGeolocationModalOpen,
  isLaptop,
}: Props): HookReturns => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (didWeAskUser) return

    setIsLoading(true)
    onSetDidWeAskUser()

    const successCallback = async (position: GeolocationPosition) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      try {
        const geolocationData = await getCityByLocation({ lat, lon })
        setIsLoading(false)
        onSetUserGeolocation(geolocationData)

        if (!isLaptop) return
        onGeolocationModalOpen()
      } catch (error) {
        setIsLoading(false)
        alert((error as AxiosError).message)
      }
    }

    const errorCallback = () => {
      setIsLoading(false)
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }, [didWeAskUser, initialGeo, isLaptop, onGeolocationModalOpen, onSetDidWeAskUser, onSetUserGeolocation])

  return { isLoading }
}
