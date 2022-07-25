import { Button, ButtonProps } from '@chakra-ui/react'
import { useGeolocation } from '../GeolocationContext'
import { usePosition } from '../hooks/usePosition'

type Props = ButtonProps & {
  onLocationOpen: () => void
  isLaptop: boolean
}

const LocationButton: React.FC<Props> = ({ onLocationOpen, isLaptop, ...props }) => {
  const { userGeolocation, onSetUserGeolocation, didWeAskUser, onSetDidWeAskUser } = useGeolocation()

  const { isLoading: isPositionLoading } = usePosition({
    onSetUserGeolocation,
    initialGeo: userGeolocation,
    didWeAskUser,
    onSetDidWeAskUser,
    onGeolocationModalOpen: onLocationOpen,
    isLaptop,
  })

  const city = userGeolocation?.geolocationName ?? 'Г. Екатеринбург'

  return (
    <Button
      isLoading={isPositionLoading}
      variant="ghost"
      color="brand.black.600"
      h={['auto', null, null, '100%']}
      px={[0, null, null, 3]}
      py={2.5}
      ml={['unset', null, null, -3]}
      iconSpacing={2.5}
      cursor="pointer"
      _hover={{ bg: 'brand.violet2.50' }}
      _active={{ bg: 'brand.violet2.50' }}
      transition="background 0.2s ease-out"
      onClick={onLocationOpen}
      {...props}
    >
      <p>{city}</p>
    </Button>
  )
}

export default LocationButton
