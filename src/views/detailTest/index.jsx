import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack, Button, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useNavigate, useParams } from 'react-router';
import { fetchTestById } from 'src/service/test';
import toast from 'react-hot-toast';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Nothing from 'src/components/shared/Nothing';
import { fetchResultById, fetchResultList } from 'src/service/results';
import { IconCircleCheck, IconCircleOff, IconCircleX } from '@tabler/icons';


const DetailTest = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [testInfo, setTestInfo] = useState({})
    const [listResult, setListResult] = useState([])

    useEffect(() => {
        getTestInfo()
        getListResult()
    }, [])

    const getTestInfo = async () => {
        const res = await fetchTestById(id)
        console.log('getTestInfo', res)
        if (res?.code === 200) {
            setTestInfo(res?.data)
        }
    }

    const getListResult = async () => {
        const res = await fetchResultList(`test=${id}`)
        console.log('getListResult', res)
        if (res?.code === 200) {
            setListResult(res?.data)
        }
    }

    const handleEdit = () => {
        navigate("edit", { state: testInfo })
    }

    const handleExam = () => {
        navigate("/exam", { state: testInfo })
    }

    return (
        <PageContainer title="Sample Page" description="this is Sample page">

            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <DashboardCard title={testInfo?.name}>
                        <Stack gap={2}>
                            <Typography>{testInfo?.description}</Typography>
                            <Stack direction={'row'} gap={1}>
                                <Typography fontWeight={'500'}>Thời gian làm bài:</Typography>
                                <Typography color={'error'} fontWeight={'600'}>{testInfo?.duration} phút</Typography>
                            </Stack>
                            <Stack direction={'row'} gap={1}>
                                <Typography fontWeight={'500'}>Tổng điểm:</Typography>
                                <Typography color={'#13de29'} fontWeight={'600'}>{testInfo?.total_marks}</Typography>
                            </Stack>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell align='center' sx={{ fontSize: '14px' }}>Số câu hỏi</TableCell>
                                        <TableCell align='center' sx={{ borderLeft: '1px #f2f2f2 solid', fontSize: '14px' }}>Listening</TableCell>
                                        <TableCell align='center' sx={{ borderLeft: '1px #f2f2f2 solid', fontSize: '14px' }}>Writting</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='center' sx={{ fontSize: '16px', fontWeight: '600' }}>{5}</TableCell>
                                        <TableCell align='center' sx={{ borderLeft: '1px #f2f2f2 solid', fontSize: '16px', fontWeight: '600' }}>{2}</TableCell>
                                        <TableCell align='center' sx={{ borderLeft: '1px #f2f2f2 solid', fontSize: '16px', fontWeight: '600' }}>{3}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Stack>

                        <Stack mt={4}>
                            {
                                window.localStorage.getItem('role') === 'teacher' ?
                                    <Button variant='contained' onClick={handleEdit}>Chỉnh sửa</Button> :
                                    <Button variant='contained' onClick={handleExam}>Băt đầu làm bài</Button>
                            }
                        </Stack>
                    </DashboardCard>
                </Grid>
                {
                    window.localStorage.getItem('role') === 'student' &&
                    <Grid item xs={4}>
                        {
                            listResult?.data?.length > 0 ? listResult?.data?.map((result, i) => (
                                <>
                                    <DashboardCard title="Kết quả bài thi">
                                        <Stack gap={1}>
                                            <Typography>Ngày: {new Date(result.start_time).getDate()}/{new Date(result.start_time).getMonth() + 1}/{new Date(result.start_time).getFullYear()}</Typography>
                                            <Typography>Thời gian làm bài: {Math.abs(Math.round((new Date(result.end_time) - new Date(result.start_time)) / 60000))} phút</Typography>
                                            <Typography>Điểm: {result.score}</Typography>
                                            <Table aria-label="simple table" sx={{
                                                '& .MuiTableCell-sizeMedium': {
                                                    padding: '2px 0',
                                                },
                                                mt: 1
                                            }}>
                                                <TableHead>
                                                    <TableRow >
                                                        <TableCell align='center' sx={{ fontSize: '14px' }}><IconCircleCheck color='#13de29' /></TableCell>
                                                        <TableCell align='center' sx={{ borderLeft: '1px #f2f2f2 solid', fontSize: '14px' }}><IconCircleX color='#dc3545' /></TableCell>
                                                        <TableCell align='center' sx={{ borderLeft: '1px #f2f2f2 solid', fontSize: '14px' }}><IconCircleOff color='#6c757d' /></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow
                                                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align='center' sx={{ fontSize: '16px', fontWeight: '600' }}>{result?.total_correct}</TableCell>
                                                        <TableCell align='center' sx={{ borderLeft: '1px #f2f2f2 solid', fontSize: '16px', fontWeight: '600' }}>{result?.total_incorrect}</TableCell>
                                                        <TableCell align='center' sx={{ borderLeft: '1px #f2f2f2 solid', fontSize: '16px', fontWeight: '600' }}>{result?.total_empty}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </Stack>
                                    </DashboardCard>
                                    <Box sx={{ mb: 4 }} />
                                </>
                            )) : <DashboardCard title="Kết quả bài thi">
                                <Nothing title={'Không tìm thấy kết quả nào.'} />
                            </DashboardCard>
                        }
                    </Grid>
                }
            </Grid>

        </PageContainer>
    );
};

export default DetailTest;
