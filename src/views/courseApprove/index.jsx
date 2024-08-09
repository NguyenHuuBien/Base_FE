import { Box, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CourseItem from 'src/components/shared/CourseItem'
import DashboardCard from 'src/components/shared/DashboardCard'
import NameSearchBar from 'src/components/shared/NameSearchBar'
import Nothing from 'src/components/shared/Nothing'
import { fetchCourseList, fetchEvaluateList } from 'src/service/courses'

const CourseApprove = () => {
  const [listCourseApprove, setListCourseApprove] = useState([])
  const [listCourse, setListCourse] = useState([])
  const [listEvalute, setListEvalute] = useState([])
  const [nameSearch, setNameSearch] = useState('')
  const [nameSearchApprove, setNameSearchApprove] = useState('')
  const [page, setPage] = useState(1)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    getListCourseApprove()
    getListEvalute()
    getListCourse()
  }, [])

  const getListCourseApprove = async (params = '') => {
    setLoading(true)
    const res = await fetchCourseList(`status=2&name=${params}`)
    if (res?.code === 200) {
      setListCourseApprove(res?.data)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const getListCourse = async (params = '') => {
    setLoading(true)
    const res = await fetchCourseList(`status=1&name=${params}`)
    if (res?.code === 200) {
      setListCourse(res?.data)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const getListEvalute = async () => {
    setLoading(true)
    const res = await fetchEvaluateList()
    if (res?.code === 200) {
      setListEvalute(res?.data)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <DashboardCard title={'Duyệt khoá học'}>
        <NameSearchBar
          value={nameSearchApprove}
          placeholder='Tìm kiếm khoá học'
          onChange={(e) => setNameSearchApprove(e.target.value)}
          onSearch={() => getListCourseApprove(nameSearchApprove)}
          onReset={() => {
            setNameSearchApprove('')
            getListCourseApprove('')
          }}
        />
        <Box sx={{ mt: 3 }} />
        {/* LIST COURSES */}
        {
          listCourseApprove?.data?.length > 0 ?
            <>
              <CourseItem data={listCourseApprove?.data} rating={listEvalute} />
              <Stack justifyContent={'center'} alignItems={'center'} mt={4}>
                <Pagination
                  count={listCourseApprove?.totalPages || 0}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </>
            :
            <Nothing title="Không tìm thấy khoá học." />
        }
      </DashboardCard>
      <Box sx={{ mt: 4 }} />
      <DashboardCard title={'Quản lý khoá học'}>
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
        <Box sx={{ mt: 3 }} />
        {/* LIST COURSES */}
        {
          listCourse?.data?.length > 0 ?
            <>
              <CourseItem data={listCourse?.data} rating={listEvalute} />
              <Stack justifyContent={'center'} alignItems={'center'} mt={4}>
                <Pagination
                  count={listCourse?.totalPages || 0}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </>
            :
            <Nothing title="Không tìm thấy khoá học." />
        }
      </DashboardCard>
    </>
  )
}

export default CourseApprove