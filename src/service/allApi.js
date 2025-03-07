import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//login

export const loginAPI = async(user)=>{
    return await commonApi('POST',`${serverUrl}/login`,user,"")
}


//get users details

export const getAllUsersAPI = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/getAllUsers`,"",reqHeader)
}
