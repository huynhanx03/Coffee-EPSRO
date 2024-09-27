import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Map from '../../components/Map/Map'
import { colors } from '../../theme/Theme/index'
import Ionicons from '@expo/vector-icons/Ionicons';

const HomeScreen = () => {
    const [isHidden, setIsHidden] = useState(false);
    const handleOnOff = () => {
        setIsHidden(!isHidden);
    }
    return (
        <View className='flex-1'>
            <Map />
            <View className={`z-10 ${isHidden ? 'hidden' : ''}`}>
                <View className='bg-white rounded-xl shadow-xl' style={{height: hp(20)}}>
                    <View className='flex items-center justify-center my-5'>
                        <Text className='text-lg font-semibold'>Bạn đang offline!</Text>
                    </View>

                    <View style={{height: 1, borderWidth: 0.5, borderColor: "rgba(59, 29, 12, 0.4)", width: wp(100)}}></View>

                    <View className='flex items-center justify-between my-5 flex-row mx-4'>
                        <TouchableOpacity className='p-2 rounded-lg' style={{backgroundColor: colors.active}}>
                            <Ionicons name="list" size={24} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleOnOff} className='p-5 rounded-full' style={{backgroundColor: colors.active, shadowColor: '#000', shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.25, shadowRadius: 4}}>
                            <Text className='text-white text-base font-semibold tracking-wide'>Online ngay 🛵</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className='p-2 rounded-lg' style={{backgroundColor: colors.active}}>
                            <Ionicons name="settings" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen
