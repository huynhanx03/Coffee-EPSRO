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
    const seen = who.includes('KH') ? item.NoiDung.DaXem : true
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ChatDetail', {KhachHang: item.KhachHang, NhanVien: item.NhanVien, who: who})} className='mx-4'>
            <View className='flex-row space-x-3'>
                <View>
                    <Image source={{uri: item.KhachHang.HinhAnh}} contentFit='contain' style={{width: wp(13), height: wp(13), marginTop: hp(1.4)}} className='rounded-full'/>
                </View>

                <View className='space-y-1 flex-1' style={{marginTop: wp(4)}}>
                    <View>
                        <Text className={`text-base ${!seen ? 'font-bold' : 'font-semibold'}`} style={{color: colors.text}}>{item.KhachHang.HoTen}</Text>
                    </View>
                    
                    <View className='flex-row items-center'>
                        {
                            item.NoiDung.MaKhachHang ? (
                                null
                            ) : (
                                <Text style={{color: colors.text}} className={`text-base ${!seen ? 'font-bold' : null}`}>Bạn: </Text>
                            )
                        }
                        <View className='flex-row justify-between items-center flex-1'>
                            <Text numberOfLines={1} style={{flex: 2, marginRight: wp(3)}} className={`text-base ${!seen ? 'font-bold italic' : ''}`}>{item.NoiDung.ChiTiet}</Text>
                            <Text style={{flex: 1, color: colors.text_gray}} className={`text-right`}>{item.NoiDung.ThoiGian.split(' ')[1]}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatItem
