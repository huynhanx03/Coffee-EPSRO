import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import MapView, { Marker, Polyline } from 'react-native-maps'
import PulsingCircle from './PulsingCircle'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { useLocation } from '../../context/LocationContext/LocationContext'
import ModalLoading from '../ModalLoading/ModalLoading'
import { useUserData } from '../../context/UserDataContext/UserDataContext'
import { SHIPPER_STATUS } from '../../constants'

const Map = () => {
    const { currentLocation, isLoading, routesData, statusLocation } = useLocation()
    const { status } = useUserData()

    const lat = useMemo(() => currentLocation?.latitude || 10.8700233, [currentLocation])
    const lng = useMemo(() => currentLocation?.longitude || 106.803089, [currentLocation])

    const [routes, setRoutes] = useState([])
    const [startCoords, setStartCoords] = useState({})
    const [endCoords, setEndCoords] = useState({})
    useEffect(() => {
        if (routesData && statusLocation === 'granted' && status === SHIPPER_STATUS.ONLINE) {
            const coordinates = routesData.routes[0].geometry.coordinates

            const formattedCoordinates = coordinates.map(([lng, lat]) => ({
                latitude: lat,
                longitude: lng,
            }))

            setStartCoords(formattedCoordinates[0])
            setEndCoords(formattedCoordinates[formattedCoordinates.length - 1])
            setRoutes(formattedCoordinates)
        } else {
            setStartCoords(currentLocation)
        }
    }, [routesData])

    return (
        <>
            {isLoading && <ModalLoading isLoading={isLoading} />}
            <MapView
                initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                className="w-full h-full flex-1"
            >
                {routes.length > 0 && status === SHIPPER_STATUS.ONLINE && (
                    <Polyline coordinates={routes} strokeColor="blue" strokeWidth={4} />
                )}
                <PulsingCircle center={startCoords} />

                {routes.length > 0 && status === SHIPPER_STATUS.ONLINE && (
                    <Marker coordinate={endCoords} title="Điểm đến của bạn">
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FontAwesome5 name="map-marker-alt" size={30} color="red" />
                            <Text></Text>
                        </View>
                    </Marker>
                )}
            </MapView>
        </>
    )
}

export default Map
