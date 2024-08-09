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
import Nothing from 'src/components/shared/Nothing';
import TestForm from 'src/components/forms/test-form';
import { fetchTestList } from 'src/service/test';
import TestItem from 'src/components/shared/TestItem';
import Loading from 'src/components/shared/Loading';
import NameSearchBar from 'src/components/shared/NameSearchBar';

const CreatedTestPage = () => {

  const [isOpen, setOpen] = useState(false)
  const [listTest, setListTest] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [nameSearch, setNameSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    getListTest()
  }, [page])

  const getListTest = async (params = '') => {
    setLoading(true)
    const res = await fetchTestList(`createBy=${JSON.parse(window.localStorage.getItem('user'))?._id}&status=1&page=${page}&name=${params}`)
    if (res?.code === 200) {
      setListTest(res?.data)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const openCreateTest = () => {
    setOpen(true)
  }

  const closeCreateTest = () => {
    setOpen(false)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <PageContainer title="Create Test" description="this is Create Test page">

      <Collapse in={isOpen} sx={{ mb: 4 }}>
        <TestForm
          setLoading={setLoading}
          fetchData={getListTest}
          type='create'
          closeCreateTest={closeCreateTest}
        />
      </Collapse>

      <DashboardCard title={
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
          <Typography variant='h4'>Bài thi đã tạo</Typography>
          <Button variant='contained' disabled={isOpen} onClick={openCreateTest}>Thêm mới</Button>
        </Stack>
      }>
        <NameSearchBar
          placeholder='Tìm kiếm khoá học'
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          onSearch={() => getListTest(nameSearch)}
          onReset={() => {
            setNameSearch('')
            getListTest('')
          }}
        />
        <Box sx={{ mt: 3 }} />
        {/* LIST TESTS */}
        {
          isLoading ? <Loading /> :
            listTest?.data?.length > 0 ?
              <>
                <TestItem data={listTest?.data} />
                <Stack justifyContent={'center'} alignItems={'center'} mt={4}>
                  <Pagination
                    count={listTest?.totalPages || 0}
                    variant="outlined"
                    shape="rounded"
                    page={page}
                    onChange={handleChangePage}
                  />
                </Stack>
              </>
              :
              <Nothing title="Chưa có bài thi nào được tạo." />
        }
      </DashboardCard>
    </PageContainer>
  );
};

export default CreatedTestPage;

