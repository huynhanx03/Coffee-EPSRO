import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const MessageScreen = () => {
    return (
        <View className='flex-1'>
            <SafeAreaView
                style={{
                    backgroundColor: '#f2f2f2',
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.19,
                    shadowRadius: 5.62,
                    elevation: 6,
                }}>
                <View className="flex justify-between items-center">
                    <Text className="text-xl font-semibold">Tin nhắn</Text>
                </View>
            </SafeAreaView>
    
            <ScrollView>

            </ScrollView>
        </View>
    )
}

export default MessageScreen
