import React, { useEffect, useState } from 'react';
import { Typography, Stack, Grid, Box, Button, Card, CardContent, Rating } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useNavigate, useParams } from 'react-router';
import { evaluateCourse, fetchCourseById, fetchEvaluateList, updateCourse } from 'src/service/courses';
import headerImg from 'src/assets/images/backgrounds/top-banner-new.png'
import { fetchLessonList, launchLesson } from 'src/service/lesson';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent,
    timelineOppositeContentClasses
} from '@mui/lab';
import { goldAchieved } from 'src/mock/course';
import { ENVIRONMENT } from 'src/constants/api';
import toast from 'react-hot-toast';
import { fetchDocumentList } from 'src/service/document';
import Loading from 'src/components/shared/Loading';

const DetailCoursePage = () => {
    const { id } = useParams();
    const [detailCourse, setDetailCourse] = useState({})
    const [listLesson, setListLesson] = useState([])
    const [listDocument, setListDocument] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [rating, setRating] = React.useState(5);

    const navigate = useNavigate()

    useEffect(() => {
        getDetailCourse()
        getListLesson()
        getListDocument()
        getEvaluate()
    }, [])

    const getDetailCourse = async () => {
        setLoading(true)
        const res = await fetchCourseById(id)
        if (res?.code === 200) {
            setDetailCourse(res?.data)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const getEvaluate = async () => {
        setLoading(true)
        const res = await fetchEvaluateList(`course=${id}`)
        if (res?.code === 200) {
            setRating(res?.data[0]?.rate || 5)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const handleEvaluateCourse = async () => {
        setLoading(true)
        const res = await evaluateCourse({
            course: id,
            rate: rating,
        })
        if (res?.code === 200) {
            toast.success("Gửi đánh giá thành công.")
            setLoading(false)
        } else {
            toast.error(res?.message)
            setLoading(false)
        }
    }

    const handleDeleteCourse = async () => {
        setLoading(true)
        const res = await updateCourse(id, {
            status: 0
        })
        if (res?.code === 200) {
            toast.success("Xoá khoá học thành công.")
            setLoading(false)
            navigate("/courses-approve")
        } else {
            toast.error(res?.message)
            setLoading(false)
        }
    }

    const handleActiveCourse = async () => {
        setLoading(true)
        const res = await updateCourse(id, {
            status: 1
        })
        if (res?.code === 200) {
            setLoading(false)
            toast.success("Phê duyệt khoá học thành công.")
            navigate("/courses-approve")
        } else {
            setLoading(false)
            toast.error(res?.message)
        }
    }

    const handleApproveCourse = async () => {
        setLoading(true)
        const res = await updateCourse(id, {
            status: 2
        })
        if (res?.code === 200) {
            toast.success("Xin phê duyệt khoá học thành công.")
            getDetailCourse()
            setLoading(false)
        } else {
            setLoading(false)
            toast.error(res?.message)
        }
    }

    const getListLesson = async () => {
        setLoading(true)
        const res = await fetchLessonList(`course=${id}&status=1`)
        if (res?.code === 200) {
            setListLesson(res?.data)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const getListDocument = async () => {
        setLoading(true)
        const res = await fetchDocumentList(`course=${id}&status=1`)
        if (res?.code === 200) {
            setListDocument(res?.data)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const handleRegister = async () => {
        const baseUrl = ENVIRONMENT === 'local' ? "http://localhost:8386/vnpay/create_payment_url" : "https://e-learning-ohlk.onrender.com/vnpay/create_payment_url";
        const url = `${baseUrl}?user_id=${JSON.parse(window.localStorage.getItem("user"))?._id}&course_id=${id}`;
        window.location.href = url;
    }

    const onLearn = async (courseCode) => {
        const res = await launchLesson({ course_code: courseCode })
        if (res?.code === 200) {
            window.location.href = res?.data;
        } else {
            toast.error(res?.message)
        }
    }

    const handleEdit = () => {
        navigate("edit", { state: detailCourse })
    }

    return (
        <PageContainer title="Sample Page" description="this is Sample page">
            <DashboardCard>
                {
                    isLoading ? <Loading /> :
                        <>
                            <Grid container bgcolor='#304674' borderRadius={1} p={3}>
                                <Grid item xs={12} md={8} xl={7}>
                                    <Stack justifyContent={'center'} height={'100%'} gap={2}>
                                        <Typography variant='h2' color='white'>
                                            {detailCourse?.name ?? id}
                                        </Typography>
                                        <Typography component='span' color='white'>
                                            Giáo viên: {detailCourse?.teacher?.name ?? ""}
                                        </Typography>
                                        <Typography component='span' color='white'>
                                            {detailCourse?.description}
                                        </Typography>
                                        <Stack direction="row" gap={2}>
                                            <Typography variant="h6" color='#77dd77'>${detailCourse?.cost}</Typography>
                                            <Typography color="#ff6961" ml={1} sx={{ textDecoration: 'line-through' }}>
                                                ${detailCourse?.discount + detailCourse?.cost}
                                            </Typography>
                                        </Stack>
                                        {
                                            detailCourse?.isRegister !== 1 &&
                                            <Rating name="read-only" size="medium" value={detailCourse?.rate} readOnly />
                                        }
                                        <Typography color='white'>TOEIC &emsp; {detailCourse?.rank === 0 ? "0 - 250+" :
                                            detailCourse?.rank === 1 ? "250 - 500+" :
                                                detailCourse?.rank === 2 ? "500 - 750+" :
                                                    detailCourse?.rank === 3 ? "750 - 900+" : ""}</Typography>
                                        {
                                            window.localStorage.getItem('role') === 'student' ?
                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    {
                                                        detailCourse?.isRegister !== 1 &&
                                                        <Button variant='contained' onClick={handleRegister}>Đăng ký</Button>
                                                    }
                                                </Box>
                                                : window.localStorage.getItem('role') === 'teacher' ?
                                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                                        <Button variant='contained' disabled={detailCourse.status === 2} onClick={handleEdit}>Chỉnh sửa</Button>

                                                        {detailCourse.status === 1 ?
                                                            <Button variant='outlined' color='success'>Đã duyệt</Button> :
                                                            detailCourse.status === 2 ?
                                                                <Button variant='outlined' color='success'>Chờ duyệt</Button> :
                                                                detailCourse.status === 3 ?
                                                                    <Button variant='outlined' color='success' onClick={handleApproveCourse}>Xin duyệt</Button> :
                                                                    <Button variant='outlined' color='error'>Đã xoá</Button>
                                                        }
                                                    </Box> : detailCourse.status === 1 ?
                                                        <Box>
                                                            <Button variant='outlined' color='error' onClick={handleDeleteCourse}>Xoá</Button>
                                                        </Box>
                                                        : <Box sx={{ display: 'flex', gap: 2 }}>
                                                            <Button variant='contained' onClick={handleActiveCourse}>Phê duyệt</Button>
                                                            <Button variant='outlined' color='error' onClick={handleDeleteCourse}>Xoá</Button>
                                                        </Box>
                                        }
                                    </Stack>
                                </Grid>
                                <Grid item xs={0} md={4} xl={5}>
                                    <img alt='img' src={headerImg} width={'100%'} style={{ objectFit: 'cover' }} />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant='h4' pt={5}>Chi tiết khoá học</Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Timeline
                                        sx={{
                                            [`& .${timelineOppositeContentClasses.root}`]: {
                                                flex: 0.2,
                                            },
                                        }}>
                                        {
                                            listLesson?.map((item, index) => (
                                                <TimelineItem key={item?._id}>
                                                    <TimelineOppositeContent color="textSecondary">
                                                        {index + 1}
                                                    </TimelineOppositeContent>
                                                    <TimelineSeparator>
                                                        <TimelineDot />
                                                        <TimelineConnector />
                                                    </TimelineSeparator>
                                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                        <Stack gap={1}>
                                                            <Typography variant="h6" component="span">
                                                                {item?.name}
                                                            </Typography>
                                                            <Typography>{item?.description}</Typography>
                                                            {
                                                                ((window.localStorage.getItem('role') === 'student' && detailCourse?.isRegister === 1) ||
                                                                    window.localStorage.getItem('role') === 'admin') &&
                                                                <Button sx={{ width: 'fit-content' }} variant='contained' onClick={() => onLearn(item?.code)}>Bắt đầu học</Button>
                                                            }
                                                        </Stack>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            ))
                                        }
                                    </Timeline>

                                    {
                                        window.localStorage.getItem('role') === 'student' && detailCourse?.isRegister === 1 && (
                                            <>
                                                <Typography variant='h5' pt={5} pb={3}>Tài liệu</Typography>
                                                <Stack gap={2}>
                                                    {
                                                        listDocument?.map((item, index) => (
                                                            <Stack key={item?._id} direction={'row'} gap={2} px={6}>
                                                                {/* <Typography>{index + 1}</Typography> */}
                                                                <Typography component='a' variant='a' href={item?.document} target="_blank">Tài liệu {index + 1}</Typography>
                                                            </Stack>
                                                        ))
                                                    }
                                                </Stack>

                                                <Stack direction={'row'} gap={2} alignItems={'center'} pt={5} pb={3}>
                                                    <Typography variant='h5'>Đánh giá</Typography>
                                                    <Rating
                                                        name="rating"
                                                        size="middle"
                                                        value={rating}
                                                        onChange={(event, newValue) => {
                                                            setRating(newValue);
                                                        }} />
                                                    <Button onClick={handleEvaluateCourse}>Gửi</Button>
                                                </Stack>
                                            </>
                                        )
                                    }

                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Card sx={{ boxShadow: 'none' }}>
                                        <CardContent>
                                            <Stack gap={2}>
                                                <Typography variant='h5'>Bạn sẽ học được gì?</Typography>
                                                {
                                                    detailCourse?.purpose?.map(item => (
                                                        <Stack direction={'row'} key={item} gap={2}>
                                                            <DoneAllIcon color='error' />
                                                            <Typography>{item}</Typography>
                                                        </Stack>
                                                    ))
                                                }
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </>
                }
            </DashboardCard>
        </PageContainer>
    );
};

export default DetailCoursePage;