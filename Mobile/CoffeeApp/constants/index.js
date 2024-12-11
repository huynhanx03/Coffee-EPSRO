const GOOGLE_MAPS_API_KEY=process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY

const MESSAGE_TYPE = Object.freeze({
    SUCCESS: 'success',
    ERROR: 'error',
    INFORM: 'inform'
})

const PAYMENT_TYPE = Object.freeze({
    COD: 'cod',
    MOMO: 'momo'
})

const ORDER_STATUS = Object.freeze({
    WAITING: 'Chờ xác nhận',
    ACCEPTED: 'Đã xác nhận',
    RECEIVED: 'Đã nhận hàng',
    DELIVERED: 'Giao hàng thành công',
    CANCELLED: 'Đã hủy'
})

const BASE_URL = 'http://localhost:3001'

export { GOOGLE_MAPS_API_KEY, MESSAGE_TYPE, BASE_URL, PAYMENT_TYPE, ORDER_STATUS } 