import React, { useEffect, useState } from 'react'
import DashboardCard from '../../../components/shared/DashboardCard';
import { listCourseMock } from 'src/mock/course';
import CourseItem from 'src/components/shared/CourseItem';
import { Button, Stack } from '@mui/material';
import { IconChevronRight } from '@tabler/icons';
import { fetchEvaluateList, suggestCourse } from 'src/service/courses';

const CourseSuggestion = () => {
    const [listCourse, setListCourse] = useState([])
    const [listEvalute, setListEvalute] = useState([])

    useEffect(() => {
        getListCourseSuggest()
        getListEvalute()
    }, [])


    const getListEvalute = async () => {
        const res = await fetchEvaluateList()
        if (res?.code === 200) {
            setListEvalute(res?.data)
        }
    }

    const getListCourseSuggest = async () => {
        const res = await suggestCourse()
        console.log(res, 'getlistcourseSuggest')
        setListCourse(res?.data?.slice(0, 2))
    }
    return (
        <DashboardCard title={"Có thể bạn quan tâm"}>
            <CourseItem data={listCourse} md={6} lg={6} rating={listCourse} />
            <Stack alignItems={'end'} mt={2}>
                <Button endIcon={<IconChevronRight size={'16px'} />} href='/courses'>Xem thêm</Button>
            </Stack>
        </DashboardCard>
    )
}

export default CourseSuggestion