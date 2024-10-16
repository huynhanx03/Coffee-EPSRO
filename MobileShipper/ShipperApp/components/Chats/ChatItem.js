import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../../theme/Theme'
import { useNavigation } from '@react-navigation/native'

const ChatItem = (props) => {
    const navigation = useNavigation()
    const { item } = props

    const who = item.NoiDung.MaKhachHang ? item.NoiDung.MaKhachHang : item.NoiDung.MaNhanVien
    const seen = item.DaXem ? true : false
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ChatDetail', {userId: item.MaKhachHang, HinhAnh: item.HinhAnh, HoTen: item.HoTen, who: who})} className='mx-4'>
            <View className='flex-row space-x-3'>
                <View>
                    <Image source={{uri: item.HinhAnh}} contentFit='contain' style={{width: wp(15), height: wp(15), marginTop: hp(1.4)}} className='rounded-full'/>
                </View>

                <View className='space-y-1 flex-1' style={{marginTop: wp(4)}}>
                    <View>
                        <Text className={`text-base ${!seen ? 'font-bold' : 'font-semibold'}`} style={{color: colors.text}}>{item.HoTen}</Text>
                    </View>
                    
                    <View className='flex-row items-center'>
                        {
                            item.NoiDung.MaKhachHang ? (
                                null
                            ) : (
                                <Text style={{color: colors.text}} className={`text-base ${!seen ? 'font-bold' : 'font-semibold'}`}>Bạn: </Text>
                            )
                        }
                        <Text numberOfLines={1} style={{flex: 2, marginRight: wp(3)}} className={`text-base italic ${!seen ? 'font-bold' : ''}`}>{item.NoiDung.ChiTiet}</Text>
                        <Text style={{flex: 1}} className={`text-base ${!seen ? 'font-bold' : ''}`}>29/09/2024</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem
