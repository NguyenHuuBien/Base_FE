import axiosClient from "src/api"
import { DOCUMENT } from "src/api/endpoind"

export const fetchDocumentList = async (params='') => {
    try {
        const response = await axiosClient.get(`${DOCUMENT.GET_LIST}?${params}`)

        return response.data
    } catch (error) {
        console.log('fetchDocumentList ===> error', error)
        return error
    }
}

export const fetchDocumentById = async (id) => {
    try {
        const response = await axiosClient.get(`${DOCUMENT.GET_BY_ID}/${id}`)

        return response.data
    } catch (error) {
        console.log('fetchDocumentById ===> error', error)
        return error
    }
}

export const createDocument = async (payload) => {
    try {
        const response = await axiosClient.post(`${DOCUMENT.CREATE}`, payload)

        return response.data
    } catch (error) {
        console.log('createDocument ===> error', error)
        return error
    }
}


export const updateDocument = async (id, payload) => {
    try {
        const response = await axiosClient.put(`${DOCUMENT.UPDATE}/${id}`, payload)

        return response.data
    } catch (error) {
        console.log('updateDocument ===> error', error)
        return error
    }
}

export const deleteDocument = async (id, payload) => {
    try {
        const response = await axiosClient.put(`${DOCUMENT.UPDATE}/${id}`, payload)

        return response.data
    } catch (error) {
        console.log('deleteDocument ===> error', error)
        return error
    }
}