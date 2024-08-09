import React, { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import nothing from 'src/assets/images/products/nothing.jpg';

import { Stack, Typography, Pagination, Box } from '@mui/material';
import { fetchCourseList, fetchEvaluateList } from 'src/service/courses';
import CourseItem from 'src/components/shared/CourseItem';
import Nothing from 'src/components/shared/Nothing';
import NameSearchBar from 'src/components/shared/NameSearchBar';
import Loading from 'src/components/shared/Loading';

const MyCoursesPage = () => {

  const [listCourse, setListCourse] = useState([])
  const [listEvalute, setListEvalute] = useState([])
  const [nameSearch, setNameSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    getListCourse()
    getListEvalute()
  }, [])

  const getListCourse = async (params = '') => {
    setLoading(true)
    const res = await fetchCourseList(`isRegister=1&page=${page}&name=${params}`)
    if (res?.code === 200) {
      setListCourse(res?.data)
      setLoading(false)
    } else {
      setLoading(false)
    }
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
    <PageContainer title="Khóa học của tôi" description="Khóa học của tôi">
      <DashboardCard title="Khóa học của tôi" sx={{ height: '78vh' }}>

        <NameSearchBar
          placeholder='Tìm kiếm khoá học'
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          onSearch={() => getListCourse(nameSearch)}
          onReset={() => {
            setNameSearch('')
            getListCourse('')
          }}
        />

        <Box sx={{ mt: 3 }} />

        {
          isLoading ? <Loading /> :
            listCourse?.data?.length > 0 ?
              <>
                <CourseItem data={listCourse?.data} rating={listEvalute} />
                <Stack justifyContent={'center'} alignItems={'center'} mt={4}>
                  <Pagination
                    count={listCourse?.totalPages}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChangePage}
                  />
                </Stack>
              </>
              :
              <Nothing title={'Không tìm thấy khoá học.'} />
        }
      </DashboardCard>
    </PageContainer>
  );
};

export default MyCoursesPage;