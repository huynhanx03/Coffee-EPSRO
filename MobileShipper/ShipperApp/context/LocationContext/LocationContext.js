import React, { createContext, useEffect, useMemo, useState } from 'react'
import useGetOrders from '../../hooks/useGetOrders'
import * as Location from 'expo-location'
import { useUserData } from '../UserDataContext/UserDataContext'
import { ORDER_STATUS } from '../../constants'
import useGetRoute from '../../hooks/useGetRoute'

const LocationContext = createContext()

const LocationProvider = ({ children }) => {
    const [currentLocation, setCurrentLocation] = useState(null)
    const [subscription, setSubscription] = useState(null)
    const [statusLocation, setStatusLocation] = useState(null)
    const latitude = process.env.EXPO_PUBLIC_DEFAULT_ADDRESS_LATITUDE
    const longitude = process.env.EXPO_PUBLIC_DEFAULT_ADDRESS_LONGITUDE
    const { orders } = useGetOrders()
    const { userData } = useUserData()

    const listCoordsAcceptedOrders = useMemo(() => {
        return orders
            .filter(
                (order) =>
                    order.MaNhanVien === userData.MaNguoiDung &&
                    order.TrangThai !== ORDER_STATUS.DELIVERED &&
                    order.TrangThai !== ORDER_STATUS.RECEIVED
            )
            .map((order) => ({
                latitude: order.DiaChiGiaoHang.latitude,
                longitude: order.DiaChiGiaoHang.longtitude,
            }))
    }, [orders, userData])

    useEffect(() => {
        async function startWatchingLocation() {
            const { status } = await Location.requestForegroundPermissionsAsync()
            setStatusLocation(status)
            if (status !== 'granted') {
                console.log('Permission to access location was denied')
                return
            }

            const sub = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 1,
                },
                (location) => {
                    setCurrentLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    })
                }
            )

            setSubscription(sub)
        }

        startWatchingLocation()

        return () => {
            if (subscription) {
                subscription.remove()
            }
        }
    }, [])

    const { routesData, isLoading } = useGetRoute(currentLocation, listCoordsAcceptedOrders)

    const contextValue = useMemo(() => ({
        currentLocation,
        listCoordsAcceptedOrders,
        isLoading,
        routesData,
        statusLocation
    }), [currentLocation, listCoordsAcceptedOrders, isLoading, routesData, statusLocation])

    return (
        <LocationContext.Provider value={{ ...contextValue }}>
            {children}
        </LocationContext.Provider>
    )
}

export { LocationContext, LocationProvider }
export const useLocation = () => {
    return React.useContext(LocationContext)
}
