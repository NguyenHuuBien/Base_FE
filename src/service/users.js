import axiosClient from "src/api"
import { USERS } from "src/api/endpoind"

export const fetchUserList = async (params = '') => {
    try {
        const response = await axiosClient.get(`${USERS.GET_LIST}?${params}`)

        return response.data
    } catch (error) {
        console.log('fetchUserList ===> error', error)
    }
}

export const fetchUserById = async (id) => {
    try {
        const response = await axiosClient.get(`${USERS.GET_BY_ID}/${id}`)

        return response.data
    } catch (error) {
        console.log('fetchUserById ===> error', error)
    }
}

export const createUser = async (payload) => {
    try {
        const response = await axiosClient.post(USERS.CREATE, { ...payload })

        return response.data
    } catch (error) {
        console.log('createUser ===> error', error)
    }
}