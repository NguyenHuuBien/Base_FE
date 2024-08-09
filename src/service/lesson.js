import axiosClient from "src/api"
import { LESSON } from "src/api/endpoind"

export const fetchLessonList = async (params) => {
    try {
        const response = await axiosClient.get(`${LESSON.GET_LIST}?${params}`)

        return response.data
    } catch (error) {
        console.log('fetchLessonList ===> error', error)
    }
}

export const fetchLessonById = async (id) => {
    try {
        const response = await axiosClient.get(`${LESSON.GET_BY_ID}/${id}`)

        return response.data
    } catch (error) {
        console.log('fetchLessonById ===> error', error)
    }
}

export const createLeason = async (params) => {
    try {
        const response = await axiosClient.post(`${LESSON.CREATE}`, params)

        return response.data
    } catch (error) {
        console.log('createLeason ===> error', error)
    }
}

export const launchLesson = async (params) => {
    try {
        const response = await axiosClient.post(`${LESSON.LAUNCH}`, params)

        return response.data
    } catch (error) {
        console.log('launchLeason ===> error', error)
    }
}

export const editLeason = async (id, params) => {
    try {
        const response = await axiosClient.put(`${LESSON.UPDATE}/${id}`, params)

        return response.data
    } catch (error) {
        console.log('editLeason ===> error', error)
    }
}