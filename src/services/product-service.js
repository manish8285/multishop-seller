import {BASE_URL, myAxios, privateAxios} from './helper'

export const GetAllProducts=(pageNumber=0,pageSize=5)=>{
    const url = BASE_URL+`products/?pageNumber=${pageNumber}&pageSize=${pageSize}`
    return myAxios.get(url).then(response=>response.data)    
}

export const searchProduct=(key)=>{
    const url = BASE_URL+`products/search?keyword=${key}`
    return myAxios.get(url).then(response=>response.data)
}

export const GetProductById=(productId)=>{
    const url= BASE_URL+`products/product/${productId}`
    return myAxios.get(url).then(response=>response.data)
}

export const SaveProductImage=(productId,image)=>{
    const url= BASE_URL+`products/product/${productId}/Drive_image`
    return privateAxios.post(url,null,{params:{imageName:image.name}}).then(response=>response.data)
}
export const SaveNewProduct=(produc)=>{
    const url=`products/`
    return privateAxios.post(url,produc).then(response=>response.data)
}
export const updateSavedProduct=(produc)=>{
    const url=`products/`
    return privateAxios.put(url,produc).then(response=>response.data)
}
export const increaseProductQuantity=(productId)=>{
    const url=`products/increase/${productId}`
    return privateAxios.put(url).then(response=>response.data)
}
export const decreaseProductQuantity=(productId)=>{
    const url=`products/decrease/${productId}`
    return privateAxios.put(url).then(response=>response.data)
}
export const deleteProduct=(productId)=>{
    const url= `products/${productId}`
    return privateAxios.delete(url).then(response=>response.data)
}

export const DeleteProductImage=(productId,imageId)=>{
    const url= BASE_URL+`products/product/${productId}/image/${imageId}`
    return privateAxios.delete(url).then(response=>response.data)
}