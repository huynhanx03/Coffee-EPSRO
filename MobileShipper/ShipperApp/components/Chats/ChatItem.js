import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import { Image } from 'expo-image'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../../theme/Theme'
import { useNavigation } from '@react-navigation/native'
import { useUserData } from '../../context/UserDataContext/UserDataContext'
import useGetUserCus from '../../hooks/useGetUserCus'

const ChatItem = (props) => {
    const navigation = useNavigation()
    const { item } = props
    const { userData } = useUserData()

    const who = useMemo(() => item.NoiDung.MaKhachHang ? item.NoiDung.MaKhachHang : userData.MaNguoiDung, [cusData, userData])
    const seen = useMemo(() => who.includes('KH') ? item.NoiDung.DaXem : true, [who, item])
    
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
