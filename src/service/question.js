import axiosClient from "src/api"
import { QUESTION } from "src/api/endpoind"

export const fetchQuestionList = async (params = '') => {
    try {
        const response = await axiosClient.get(`${QUESTION.GET_LIST}?${params}`)

        return response.data
    } catch (error) {
        console.log('fetchQuestionList ===> error', error)
        return error
    }
}

export const fetchQuestionById = async (id) => {
    try {
        const response = await axiosClient.get(`${QUESTION.GET_BY_ID}/${id}`)

        return response.data
    } catch (error) {
        console.log('fetchQuestionById ===> error', error)
        return error
    }
}

export const createQuestion = async (payload) => {
    try {
            const response = await axiosClient.post(`${QUESTION.CREATE}`, payload)

            return response.data
    } catch (error) {
        console.log('createQuestion ===> error', error)
        return error
    }
}


export const updateQuestion = async (id, payload) => {
    try {
        const response = await axiosClient.put(`${QUESTION.UPDATE}/${id}`, payload)

        return response.data
    } catch (error) {
        console.log('updateQuestion ===> error', error)
        return error
    }
}

export const deleteQuestion = async (id, payload) => {
    try {
        const response = await axiosClient.put(`${QUESTION.UPDATE}/${id}`, payload)

        return response.data
    } catch (error) {
        console.log('deleteQuestion ===> error', error)
        return error
    }
}