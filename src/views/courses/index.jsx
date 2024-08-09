import React, { useEffect, useState } from 'react';
import { Stack, Pagination, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import CourseItem from 'src/components/shared/CourseItem';
import NameSearchBar from 'src/components/shared/NameSearchBar';
import { fetchCourseList, fetchEvaluateList, suggestCourse } from 'src/service/courses';
import { listCourseMock } from 'src/mock/course';
import Loading from 'src/components/shared/Loading';
import Nothing from 'src/components/shared/Nothing';

const CoursesPage = () => {

    const [listCourse, setListCourse] = useState([])
    const [listCourseSuggest, setListCourseSuggest] = useState([])
    const [listEvalute, setListEvalute] = useState([])
    const [nameSearch, setNameSearch] = useState('')
    const [page, setPage] = useState(1)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        getListCourse()
        getListCourseSuggest()
        getListEvalute()
    }, [])

    const getListCourse = async (params = '') => {
        setLoading(true)
        const res = await fetchCourseList(`isRegister=0&page=${page}&name=${params}`)
        if (res?.code === 200) {
            setListCourse(res?.data)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const getListCourseSuggest = async () => {
        const res = await suggestCourse()
        setListCourseSuggest(res?.data)
    }

    const getListEvalute = async () => {
        const res = await fetchEvaluateList()
        if (res?.code === 200) {
            setListEvalute(res?.data)
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <PageContainer title="Khóa học" description="Các khóa học">
            <Stack gap={4}>
                <DashboardCard title="Gợi ý khóa học">
                    <CourseItem data={listCourseSuggest} rating={listEvalute} />
                </DashboardCard>

                <NameSearchBar
                    value={nameSearch}
                    placeholder='Tìm kiếm khoá học'
                    onChange={(e) => setNameSearch(e.target.value)}
                    onSearch={() => getListCourse(nameSearch)}
                    onReset={() => {
                        setNameSearch('')
                        getListCourse('')
                    }}
                />

                {
                    isLoading ? <Loading /> :
                        <DashboardCard title="Danh sách khóa học">
                            {
                                listCourse?.data?.length > 0 ?
                                    <>
                                        <CourseItem data={listCourse?.data} rating={listEvalute} />
                                        <Stack justifyContent={'center'} alignItems={'center'} mt={4}>
                                            <Pagination
                                                count={listCourse?.totalPages}
                                                variant="outlined"
                                                shape="rounded"
                                                onChange={handleChangePage}
                                                page={page}
                                            />
                                        </Stack>
                                    </> :
                                    <Nothing title='Không tìm thấy khoá học.' />
                            }
                        </DashboardCard>
                }
            </Stack>
        </PageContainer>
    );
};

export default CoursesPage;