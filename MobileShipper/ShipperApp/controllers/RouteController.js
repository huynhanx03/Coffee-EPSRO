import axios from 'axios'

const buildCoordinatesString = (startCoords, endCoords) => {
    const start = `${startCoords.longitude},${startCoords.latitude}`
    const ends = endCoords
        .map(coord => `${coord.longitude},${coord.latitude}`)
        .join(';')
    return `${start};${ends}`
}

const getRoutes = async (startCoords, endCoords) => {
    const accessToken = process.env.EXPO_PUBLIC_MAPBOX_TOKEN
    const coordinates = buildCoordinatesString(startCoords, endCoords)
    const url = process.env.EXPO_PUBLIC_MAPBOX_ROUTE_URL + encodeURIComponent(coordinates)
    try {
        const response = await axios.get(url, {
            params: {
                alternatives: true,
                geometries: 'geojson',
                language: 'en',
                overview: 'full',
                steps: true,
                access_token: accessToken,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return response.data
    } catch (error) {
        throw new Error('Lỗi không lấy được tuyến đường')
    }
}

export { getRoutes }
