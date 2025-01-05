import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import db from '../firebase'
import { getDatabase, onValue, orderByChild, query, ref } from 'firebase/database'
import MessageItemDetail from './messageItemDetail'
import ModalLoading from './modalLoading'

const MessagesListDetail = (props) => {
    const { userId, shipperId, chatbot } = props
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null)

    const db = getDatabase()
    const getMessage = async () => {
        const id = chatbot ? 'chatbot' + '-' + userId : shipperId + '-' + userId
        setLoading(true)
        const messageRef = ref(db, `TinNhan/${id}/NoiDung`)
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
        setLoading(false)
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
        <ScrollView className='my-2' ref={scrollRef} onContentSizeChange={() => scrollRef?.current?.scrollToEnd({ animated: false })}>
            {
                messages.map((chat, index) => (
                    <MessageItemDetail key={index} chat={chat} />
                ))
            }
            <ModalLoading isLoading={loading} />
        </ScrollView>
    )
}

export default MessagesListDetail
