import React, { useEffect, useState } from 'react';
import {
  Stack,
  Pagination,
  Typography,
  Button,
  Collapse,
  Box,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import CourseItem from 'src/components/shared/CourseItem';
import { fetchCourseList } from 'src/service/courses';
import Nothing from 'src/components/shared/Nothing';
import CourseForm from 'src/components/forms/course-form';
import Loading from 'src/components/shared/Loading';
import NameSearchBar from 'src/components/shared/NameSearchBar';


const CreatedCoursesPage = () => {

  const [isOpen, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [listCourse, setListCourse] = useState([])
  const [nameSearch, setNameSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    getListCourse()
  }, [page])

  const getListCourse = async (params = '') => {
    setLoading(true)
    const res = await fetchCourseList(`teacher=${JSON.parse(window.localStorage.getItem('user'))?._id}&page=${page}&name=${params}`)
    if (res?.code === 200) {
      setListCourse(res?.data)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const openCreateCourse = () => {
    setOpen(true)
  }

  const closeCreateCourse = () => {
    setOpen(false)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <PageContainer title="Create Course" description="this is Create Course page">

      <Collapse in={isOpen} sx={{ mb: 4 }}>
        <CourseForm
          setLoading={setLoading}
          fetchData={getListCourse}
          type='create'
          closeCreateCourse={closeCreateCourse}
        />
      </Collapse>

      <DashboardCard title={
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
          <Typography variant='h4'>Khoá học đã tạo</Typography>
          <Button variant='contained' disabled={isOpen} onClick={openCreateCourse}>Thêm mới</Button>
        </Stack>
      }>
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
        {/* LIST COURSES */}
        {
          isLoading ? <Loading /> :
            listCourse?.data?.length > 0 ?
              <>
                <CourseItem data={listCourse?.data} />
                <Stack justifyContent={'center'} alignItems={'center'} mt={4}>
                  <Pagination
                    count={listCourse?.totalPages || 0}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handleChangePage}
                  />
                </Stack>
              </>
              :
              <Nothing title="Chưa có khoá học nào được tạo." />
        }
      </DashboardCard>
    </PageContainer>
  );
};

export default CreatedCoursesPage;
