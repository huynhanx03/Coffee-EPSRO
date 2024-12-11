const MESSAGE_TYPE = Object.freeze({
    SUCCESS: 'success',
    ERROR: 'error',
    INFORM: 'inform'
})

const ORDER_STATUS = Object.freeze({
    WAITING: 'Chờ xác nhận',
    ACCEPTED: 'Đã xác nhận',
    RECEIVED: 'Đã nhận hàng',
    DELIVERED: 'Giao hàng thành công',
    CANCELLED: 'Đã hủy'
})

const SHIPPER_STATUS = Object.freeze({
    ONLINE: 'online',
    OFFLINE: 'offline'
})

export {
    MESSAGE_TYPE, ORDER_STATUS, SHIPPER_STATUS
}