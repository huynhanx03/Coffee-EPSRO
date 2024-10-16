import { View, Text } from 'react-native'
import MessageItem from './MessageItem'
import React, { useEffect, useState } from 'react'
import db from '../../firebase'
import { getDatabase, onValue, orderByChild, query, ref } from 'firebase/database'

const MessagesList = (props) => {
    const { userId } = props
    const [messages, setMessages] = useState([]);

    const db = getDatabase()
    const getMessage = async () => {
        const messageRef = ref(db, `TinNhan/${'NV0004'+'-'+userId}/NoiDung`)
        const q = query(messageRef, orderByChild("ThoiGian"))

        onValue(q, (snapshot) => {
            const data = snapshot.val()
            let allMessages = []
            if (data) {
                for (const key in data) {
                    const messageData = {
                        ChiTiet: data[key].ChiTiet,
                        MaNhanVien: data[key]?.MaNhanVien ?? null,
                        MaKhachHang: data[key]?.MaKhachHang ?? null,
                        ThoiGian: data[key].ThoiGian,
                    }
                    allMessages.push(messageData)
                }
            }
            setMessages([...allMessages])
        })
    }

    useEffect(() => {
        getMessage()
    }, [])

    return (
        <View className='my-2'>
            {
                messages.map((chat, index) => (
                    <MessageItem key={index} chat={chat} />
                ))
            }
        </View>
    )
}

export default MessagesList
