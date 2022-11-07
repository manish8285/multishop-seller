import { myAxios, privateAxios } from "./helper"

export const getAllCategories=()=>{
   return privateAxios.get("category/").then(response=>response.data)
}

export const addNewCategory=(category)=>{
   return privateAxios.post("category/",category).then(response=>response.data)
}

export const updateCategory=(category)=>{
   return privateAxios.put("category/",category).then(response=>response.data)
}
export const deleteCategory=(categoryId)=>{
   const url =`category/${categoryId}`
   return privateAxios.delete(url).then(response=>response.data)
}