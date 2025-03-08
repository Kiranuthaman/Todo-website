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

// register request
export const requestApi = async(reqBody,reqHeader)=>{
    return await commonApi ('POST', `${serverUrl}/register`,reqBody,reqHeader)

}
// assign task
export const addTaskAPI = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/AssignTask`,reqBody,reqHeader)
}

export const getAllTaskToAdminAPI = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/getTasks`,"",reqHeader)
}


export const deleteAPI = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/managerAndemployee/remove/${id}`,{},{})
}


export const getManagersEmployeesAPI = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/getEmployees`,"",reqHeader)
}