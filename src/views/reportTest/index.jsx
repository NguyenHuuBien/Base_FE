import React, { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import nothing from 'src/assets/images/products/nothing.jpg';

import { Stack, Typography, TextField, Button } from '@mui/material';
import { fetchCourseList, fetchEvaluateList } from 'src/service/courses';
import CourseItem from 'src/components/shared/CourseItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fetchReportTest } from 'src/service/report';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router';
import Nothing from 'src/components/shared/Nothing';
import Loading from 'src/components/shared/Loading';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#5d87ff',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ReportTest = () => {

    const navigate = useNavigate()
    const [listReportTest, setListReportTest] = useState([])
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getReportTest()
    }, [value])

    const getReportTest = async () => {
        setLoading(true)
        const res = await fetchReportTest(`student=${JSON.parse(window.localStorage.getItem('user'))?._id}&month=${(value?.$M + 1) || new Date().getMonth() + 1}&year=${value?.$y || new Date().getFullYear()}`)
        if (res?.code === 200) {
            setListReportTest(res?.data)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    return (
        <PageContainer title="Khóa học của tôi" description="Khóa học của tôi">
            <DashboardCard title="Tổng hợp bài thi" sx={{ height: '78vh' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue)
                            console.log(value?.$y, 'hh')
                        }}
                        views={['month', 'year']}
                        openTo="month"
                        renderInput={(inputProps) =>
                            <TextField
                                {...inputProps}
                                sx={{ width: '320px' }}
                                variant="outlined"
                                label={'MM/YYYY'}
                            />}
                    />
                </LocalizationProvider>
                {
                    loading ? <Loading /> :
                        listReportTest?.length > 0 ?
                            <>
                                <TableContainer sx={{ maxHeight: 380, borderRadius: 2, mt: 2, boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead sx={{
                                            "& th": {
                                                color: "#fff",
                                                backgroundColor: "#5d87ff"
                                            }
                                        }}>
                                            <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                <StyledTableCell>Bài thi</StyledTableCell>
                                                <StyledTableCell align='right'>Số lần làm</StyledTableCell>
                                                <StyledTableCell align='right'>Điểm trung bình</StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listReportTest.map((row) => {
                                                return (
                                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row?._id}>
                                                        <StyledTableCell>{row?.test?.name}</StyledTableCell>
                                                        <StyledTableCell align='right'>{row?.total_tests}</StyledTableCell>
                                                        <StyledTableCell align='right'>{row?.average_marks}</StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Button onClick={() => navigate(`/test/${row?.test?._id}`)}>Xem chi tiết</Button>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                            </> :
                            <Nothing title={'Không tìm thấy thông tin.'} />
                }

            </DashboardCard>
        </PageContainer>
    );
};

export default ReportTest;