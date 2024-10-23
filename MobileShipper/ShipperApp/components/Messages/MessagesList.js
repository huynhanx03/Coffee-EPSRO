import { View, Text, ScrollView } from 'react-native'
import MessageItem from './MessageItem'
import React, { useEffect, useRef, useState } from 'react'
import db from '../../firebase'
import { getDatabase, onValue, orderByChild, query, ref, set } from 'firebase/database'

const MessagesList = (props) => {
    const { userId } = props
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef(null)

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

    const updateScrollView = () => {
        setTimeout(() => {
            scrollRef?.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    useEffect(() => {
        getMessage()
        updateScrollView()
    }, [])

    return (
        <ScrollView className='my-2' ref={scrollRef} onContentSizeChange={() => scrollRef?.current?.scrollToEnd({ animated: true })}>
            {
                messages.map((chat, index) => (
                    <MessageItem key={index} chat={chat} />
                ))
            }
        </ScrollView>
    )
}

export default MessagesList
