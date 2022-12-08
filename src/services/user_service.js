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

//customer admin user
export const getAllUsers=(pageNumber=0,pageSize=5)=>{
  const url = `users/?pageNumber=${pageNumber}&pageSize=${pageSize}`
  return privateAxios.get(url).then((response)=>response.data);
}

export const deleteUser=(userId)=>{
  const url = `users/${userId}`
  return privateAxios.delete(url).then((response)=>response.data);
}

//get user by email id auth admin
export const getUserByEmail=(email)=>{
  const url = `users/email/${email}`
  return privateAxios.get(url).then((response)=>response.data);
}


