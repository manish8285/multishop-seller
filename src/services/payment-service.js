import { BASE_URL, privateAxios } from "./helper"

export const verifyOnlinePayment=(selfPayment)=>{
    return privateAxios.put("payments/verify_payment",selfPayment).then(response=>response.data)
}

export const getOnlinePayment=(payId)=>{
    return privateAxios.get(`payments/self_payment?paymentId=${payId}`).then(response=>response.data)
}