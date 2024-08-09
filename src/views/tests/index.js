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
import NameSearchBar from 'src/components/shared/NameSearchBar';
import Loading from 'src/components/shared/Loading';

const Tests = () => {

  const [listTest, setListTest] = useState([])
  const [nameSearch, setNameSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    getListTest()
  }, [page])

  const getListTest = async (param = '') => {
    setLoading(true)
    const res = await fetchTestList(`status=1&page=${page}&name=${param}`)
    if (res?.code === 200) {
      setLoading(false)
      setListTest(res?.data)
    } else {
      setLoading(false)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <PageContainer title="Create Test" description="this is Create Test page">

      <DashboardCard title={'Danh sách bài thi'}>

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
                    variant="outlined" shape="rounded"
                    onChange={handleChangePage}
                    page={page}
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

export default Tests;

