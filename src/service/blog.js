import axiosClient from "src/api"
import { BLOG } from "src/api/endpoind"

export const fetchBlogList = async (params = '') => {
    try {
        const response = await axiosClient.get(`${BLOG.GET_LIST}?${params}`)

        return response.data
    } catch (error) {
        console.log('fetchBlogList ===> error', error)
        return error
    }
}

export const fetchBlogById = async (id) => {
    try {
        const response = await axiosClient.get(`${BLOG.GET_BY_ID}/${id}`)

        return response.data
    } catch (error) {
        console.log('fetchBlogById ===> error', error)
        return error
    }
}

export const createBlog = async (payload) => {
    try {
        const response = await axiosClient.post(`${BLOG.CREATE}`, payload)

        return response.data
    } catch (error) {
        console.log('createBlog ===> error', error)
        return error
    }
}


export const updateBlog = async (id, payload) => {
    try {
        const response = await axiosClient.put(`${BLOG.UPDATE}/${id}`, payload)

        return response.data
    } catch (error) {
        console.log('updateBlog ===> error', error)
        return error
    }
}

export const deleteBlog = async (id, payload) => {
    try {
        const response = await axiosClient.put(`${BLOG.UPDATE}/${id}`, payload)

        return response.data
    } catch (error) {
        console.log('deleteBlog ===> error', error)
        return error
    }
}

export const uploadFile = async (payload) => {
    try {
        const response = await axiosClient.post(`${BLOG.UPLOAD}`, payload)

        return response.data
    } catch (error) {
        console.log('uploadFile ===> error', error)
        return error
    }
}
