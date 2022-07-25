import { ShowcaseApiResponse, showcaseApi } from '../../services/showcaseApi'
import { UserGeolocation } from '../types'

type ResData = {
  latitude: string
  longitude: string
  location_id: number
  city: string
}

type ReqParams = {
  lat: number
  lon: number
}

export const getCityByLocation = async (params: ReqParams): Promise<UserGeolocation> => {
  const url = '/api/data/get-city-by-location' // use your url
  const {
    data: { data },
  } = await showcaseApi.get<ShowcaseApiResponse<ResData>>(url, { params })

  const { location_id: geolocationId, city: geolocationName } = data
  return { geolocationId, geolocationName }
}
