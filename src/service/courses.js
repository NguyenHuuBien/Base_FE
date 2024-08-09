import axiosClient from "src/api"
import { COURSES } from "src/api/endpoind"

export const fetchCourseList = async (params='') => {
    try {
        const response = await axiosClient.get(`${COURSES.GET_LIST}?${params}`)

        return response.data
    } catch (error) {
        console.log('fetchCourseList ===> error', error)
        return error
    }
}

export const fetchCourseById = async (id) => {
    try {
        const response = await axiosClient.get(`${COURSES.GET_BY_ID}/${id}`)

        return response.data
    } catch (error) {
        console.log('fetchCourseById ===> error', error)
        return error
    }
}

export const createCourse = async (payload) => {
    try {
        const response = await axiosClient.post(`${COURSES.CREATE}`, payload)

        return response.data
    } catch (error) {
        console.log('createCourse ===> error', error)
        return error
    }
}


export const updateCourse = async (id, payload) => {
    try {
        const response = await axiosClient.put(`${COURSES.UPDATE}/${id}`, payload)

        return response.data
    } catch (error) {
        console.log('updateCourse ===> error', error)
        return error
    }
}

export const deleteCourse = async (id, payload) => {
    try {
        const response = await axiosClient.put(`${COURSES.UPDATE}/${id}`, payload)

        return response.data
    } catch (error) {
        console.log('deleteCourse ===> error', error)
        return error
    }
}

export const suggestCourse = async () => {
    try {
        const response = await axiosClient.get(`${COURSES.SUGGEST}`)

        return response.data
    } catch (error) {
        return error
    }
}

export const evaluateCourse = async (payload) => {
    try {
        const response = await axiosClient.post(`${COURSES.EVALUATE}`, payload)

        return response.data
    } catch (error) {
        console.log('evaluateCourse ===> error', error)
        return error
    }
}

export const fetchEvaluateList = async (params='') => {
    try {
        const response = await axiosClient.get(`${COURSES.EVALUATE_LIST}?${params}`)

        return response.data
    } catch (error) {
        console.log('fetchEvaluateList ===> error', error)
        return error
    }
}