import axiosClient from "src/api"
import { REPORT } from "src/api/endpoind"

export const fetchReportTest = async (params = '') => {
    try {
        const response = await axiosClient.get(`${REPORT.TEST}?${params}`)

        return response.data
    } catch (error) {
        console.log('fetchReportTest ===> error', error)
        return error
    }
}

export const fetchReportCourse = async (params = '') => {
    try {
        const response = await axiosClient.get(`${REPORT.COURSE}?${params}`)

        return response.data
    } catch (error) {
        console.log('fetchReportCourse ===> error', error)
        return error
    }
}