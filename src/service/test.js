import axiosClient from "src/api"
import { TEST } from "src/api/endpoind"

export const fetchTestList = async (params='') => {
    try {
        const response = await axiosClient.get(`${TEST.GET_LIST}?${params}`)

        return response.data
    } catch (error) {
        console.log('fetchTestList ===> error', error)
        return error
    }
}

export const fetchTestById = async (id) => {
    try {
        const response = await axiosClient.get(`${TEST.GET_BY_ID}/${id}`)

        return response.data
    } catch (error) {
        console.log('fetchTestById ===> error', error)
        return error
    }
}

export const createTest = async (payload) => {
    try {
        const response = await axiosClient.post(`${TEST.CREATE}`, payload)

        return response.data
    } catch (error) {
        console.log('createTest ===> error', error)
        return error
    }
}


export const updateTest = async (id, payload) => {
    try {
        const response = await axiosClient.put(`${TEST.UPDATE}/${id}`, payload)

        return response.data
    } catch (error) {
        console.log('updateTest ===> error', error)
        return error
    }
}

export const deleteTest = async (id, payload) => {
    try {
        const response = await axiosClient.put(`${TEST.UPDATE}/${id}`, payload)

        return response.data
    } catch (error) {
        console.log('deleteTest ===> error', error)
        return error
    }
}