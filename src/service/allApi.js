import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//login

export const loginAPI = async(user)=>{
    return await commonApi('POST',`${serverUrl}/login`,user,"")
}


//get users details

export const getAllEmployeesAndManagersAPI = async()=>{
    return await commonApi('GET',`${serverUrl}/getAllUsers`,"","")
}

export const addTaskAPI = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/AssignTask`,reqBody,reqHeader)
}
