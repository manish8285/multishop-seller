import { privateAxios } from "./helper"

export const GetAllorders=()=>{
    let url = "admin/orders"
    return privateAxios.get(url).then(response=>response.data)
}

export const GetOrderById=(orderId)=>{
    let url = `admin/orders/order/${orderId}`
    return privateAxios.get(url).then(response=>response.data)
}