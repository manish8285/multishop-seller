import { privateAxios } from "./helper"

export const GetAllorders=()=>{
    let url = "admin/orders"
    return privateAxios.get(url).then(response=>response.data)
}

export const GetAllProductorders=(pageNumber,pageSize)=>{
    let url = `admin/all_orders?pageNumber=${pageNumber}&pageSize=${pageSize}`
    return privateAxios.get(url).then(response=>response.data)
}

export const GetOrderById=(orderId)=>{
    let url = `admin/orders/order/${orderId}`
    return privateAxios.get(url).then(response=>response.data)
}

export const SendPickupRequest=(orderId)=>{
    let url = `admin/orders/pickup/order/${orderId}`
    return privateAxios.post(url).then(response=>response.data)
}
export const SendCancelPickupRequest=(orderId)=>{
    let url = `admin/orders/cancel_pickup/order/${orderId}`
    return privateAxios.post(url).then(response=>response.data)
}
export const SendCancelOrderStatus=(orderId)=>{
    let url = `admin/orders/cancel/order/${orderId}`
    return privateAxios.put(url).then(response=>response.data)
}
export const SendOutForDeliveryOrderStatus=(orderId)=>{
    let url = `admin/orders/out_for_delivery/order/${orderId}`
    return privateAxios.put(url).then(response=>response.data)
}
export const SendDeliveredOrderStatus=(orderId)=>{
    let url = `admin/orders/delivered/order/${orderId}`
    return privateAxios.put(url).then(response=>response.data)
}