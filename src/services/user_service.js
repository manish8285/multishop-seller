import { getCurrentUserDetail } from "../auth";
import { BASE_URL, myAxios, privateAxios } from "./helper"

export const signUp=(user)=>{
  return  myAxios.post("auth/signup",user).then((response)=>response.data);
}

export const login=(loginDetail)=>{
  return myAxios.post("auth/login",loginDetail).then((response)=>response.data);
}

export const getCutomer=()=>{
  const userId=getCurrentUserDetail()?.id
  const url = `customer/${userId}`
  return privateAxios.get(url).then((response)=>response.data);
}