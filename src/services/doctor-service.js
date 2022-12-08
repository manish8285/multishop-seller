import { myAxios, privateAxios } from "./helper"

export const getAllSpecialization=()=>{
    return privateAxios.get("users/specializations").then(response=>response.data)
}
export const getAllAppointments=(pageNumber,pageSize)=>{
    return privateAxios.get(`doctor/all_appointments?pageNumber=${pageNumber}&pageSize=${pageSize}`).then(response=>response.data)
}

export const getAppointById=(appId)=>{
    return privateAxios.get(`doctor/appointment/${appId}`).then(response=>response.data)
}

export const updateAppointByAadmin=(apt)=>{
    return privateAxios.put(`doctor/appointment_update`,apt).then(response=>response.data)
}

export const addSpecialization=(specialization)=>{
    return privateAxios.post("admin/add_specialization",specialization).then(response=>response.data)
}