import React, { useEffect, useState } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import CourseItem from 'src/components/shared/CourseItem';
import { fetchCourseList, fetchEvaluateList } from 'src/service/courses';
import { Button, Stack } from '@mui/material';
import { IconChevronRight } from '@tabler/icons';

const CourseRecent = () => {

    const [listCourse, setListCourse] = useState([])
    const [listEvalute, setListEvalute] = useState([])

    useEffect(() => {
        getListCourse()
        getListEvalute()
    }, [])

    const getListCourse = async () => {
        const res = await fetchCourseList()
        console.log(res, 'getlistcourse')
        setListCourse(res?.data?.data?.slice(0, 2))
    }

    const getListEvalute = async () => {
        const res = await fetchEvaluateList()
        if (res?.code === 200) {
            setListEvalute(res?.data)
        }
    }

    return (
        <DashboardCard title={"Khoá học mới nhất"}>
            <CourseItem data={listCourse} md={6} lg={6} rating={listEvalute} />
            <Stack alignItems={'end'} mt={2}>
                <Button endIcon={<IconChevronRight size='16px' />} href='/courses'>Xem thêm</Button>
            </Stack>
        </DashboardCard>
    )
}

export default CourseRecent