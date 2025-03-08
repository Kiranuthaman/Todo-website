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

// to get manager for to assign to employe

export const getManagerApi = async(searchKey, reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/managers?search=${searchKey}`,"",reqHeader)
}
