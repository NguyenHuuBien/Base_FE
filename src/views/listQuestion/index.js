import React, { useEffect, useState } from 'react';
import {
    Stack,
    Typography,
    Button,
    Grid,
    FormControl,
    Box,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import { fetchQuestionList } from 'src/service/question';
import { useLocation, useNavigate } from 'react-router';
import { createResult } from 'src/service/results';
import toast from 'react-hot-toast';
import MyTimer from '../utilities/Timer';

const ListQuestion = () => {
    const navigate = useNavigate()
    const { state: testInfo } = useLocation();
    const [isLoading, setLoading] = useState(false);
    const [listQuestion, setListQuestion] = useState([]);
    const [questionChange, setQuestionChange] = useState([]);
    
    const time = new Date()


    useEffect(() => {
        getListQuestion();

        const timer = setTimeout(() => {
            handleSubmitTest();
        }, testInfo?.duration * 60 * 1000);

        return () => clearTimeout(timer);
    }, []);

    const getListQuestion = async () => {
        const res = await fetchQuestionList(`test=${testInfo?._id}`);
        console.log(res, 'getlistQuestion');
        setListQuestion(res?.data);
    };

    const handleAnswerChange = (questionId, selectedOption) => {
        setQuestionChange(prevState => {
            // Tạo một bản sao của danh sách câu hỏi
            const updatedQuestions = prevState.map(q => {
                if (q.question === questionId) {
                    // Cập nhật câu hỏi đã tồn tại
                    return { ...q, answer: [selectedOption] };
                }
                return q;
            });

            // Kiểm tra xem câu hỏi có được cập nhật không
            const questionExists = updatedQuestions.some(q => q.question === questionId);
            if (questionExists) {
                return updatedQuestions;
            } else {
                // Thêm câu hỏi mới nếu chưa tồn tại
                return [...updatedQuestions, { question: questionId, answer: [selectedOption] }];
            }
        });
    };

    const handleSubmitTest = async () => {
        setLoading(true)
        const res = await createResult({
            test: testInfo?._id,
            start_time: time,
            end_time: new Date(),
            answers: JSON.stringify(questionChange)
        })
        if (res?.code === 200) {
            toast.success("Nộp bài thi thành công")
            setLoading(false)
            navigate(`/test/${testInfo?._id}`)
        } else {
            toast.error(res?.message)
            setLoading(false)
        }
    }

    return (
        <PageContainer title="Question" description="this is Question page">

            <Grid container spacing={4}>
                <Grid item xs={9}>
                    <Box sx={{height:'100vh', overflowY:'auto'}}>
                    {
                        listQuestion?.data?.length > 0 && listQuestion?.data?.map((question, index) => (
                            <Box key={question?._id} id={`question-${index}`}>
                                <DashboardCard>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name={`question-${question._id}`}
                                                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                                                >
                                                    <Typography variant='h6' mb={2}>{index + 1}. {question?.question_text}</Typography>
                                                    {question?.options?.map((item, i) => (
                                                        <FormControlLabel key={i} value={item} control={<Radio />} label={item} />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack alignItems={'end'} justifyContent={'end'}>
                                                {
                                                    question?.audio_file?.length > 0 && <audio controls>
                                                        <source src={question?.audio_file} type="audio/mp3" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                }
                                                {
                                                    question?.image_file?.length > 0 && <img src={question?.image_file} alt='question' height='250px' />
                                                }
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </DashboardCard>
                                <Box sx={{ mt: 2 }} />
                            </Box>
                        ))
                    }
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <MyTimer expiryTimestamp={time.setSeconds(time.getSeconds() + testInfo?.duration * 60)} />

                    <Stack gap={1} direction={'row'} flexWrap={'wrap'} mb={2}>
                        {
                            listQuestion?.data?.length > 0 && listQuestion?.data?.map((question, index) => (
                                <a href={`#question-${index}`} style={{ textDecoration: 'none' }} key={question?._id}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '40px',
                                        width: '35px',
                                        border: "1px #5d87ff solid",
                                        borderRadius: '4px',
                                        color: questionChange?.find(item => item?.question === question?._id) ? '#fff' : '#5d87ff',
                                        backgroundColor: questionChange?.find(item => item?.question === question?._id) ? '#5d87ff' : 'transparent',
                                        cursor: 'pointer'
                                    }}>
                                        <Typography component={'span'} variant='span' >{index + 1}</Typography>
                                    </Box>
                                </a>
                            ))
                        }
                    </Stack>

                    <Button variant='contained' fullWidth onClick={handleSubmitTest}>Nộp bài</Button>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default ListQuestion;
