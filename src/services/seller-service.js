import { privateAxios } from "./helper"

export const getAllSellers=()=>{
    return privateAxios.get("admin/sellers").then(response=>response.data)
}

export const getMySeller=()=>{
    return privateAxios.get("seller/get_seller").then(response=>response.data)
}


export const registerNewSeller=(sellerDto,userId)=>{
    const url=`admin/add_seller/user/${userId}`
    return privateAxios.post(url,sellerDto).then(response=>response.data)
}