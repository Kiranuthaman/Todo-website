import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

//login

export const loginAPI = async(user)=>{
    return await commonApi('POST',`${serverUrl}/login`,user,"")
}