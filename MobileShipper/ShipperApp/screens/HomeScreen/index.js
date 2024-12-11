import { LocationProvider } from "../../context/LocationContext/LocationContext"
import HomeScreen from "./HomeScreen"

const HomeScreenIndex = () => {
    return (
        <LocationProvider>
            <HomeScreen />
        </LocationProvider>
    )
}

export default HomeScreenIndex