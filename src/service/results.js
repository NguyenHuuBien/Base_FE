import axiosClient from "src/api"
import { RESULT } from "src/api/endpoind"

export const fetchResultList = async (params = '') => {
    try {
        const response = await axiosClient.get(`${RESULT.GET_LIST}?${params}`)

        return response.data
    } catch (error) {
        console.log('fetchResultList ===> error', error)
        return error
    }
}

export const fetchResultById = async (id) => {
    try {
        const response = await axiosClient.get(`${RESULT.GET_BY_ID}/${id}`)

        return response.data
    } catch (error) {
        console.log('fetchResultById ===> error', error)
        return error
    }
}

export const createResult = async (payload) => {
    try {
            const response = await axiosClient.post(`${RESULT.CREATE}`, payload)

            return response.data
    } catch (error) {
        console.log('createResult ===> error', error)
        return error
    }
}

export const deleteResult = async (id, payload) => {
    try {
        const response = await axiosClient.put(`${RESULT.UPDATE}/${id}`, payload)

        return response.data
    } catch (error) {
        console.log('deleteResult ===> error', error)
        return error
    }
}