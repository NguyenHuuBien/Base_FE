import React, { useState, useEffect } from 'react';
import {
    Stack,
    Typography,
    Button,
    Grid,
    TextField,
    InputAdornment,
    Radio,
    FormControlLabel,
    RadioGroup,
    FormControl,
    Box,
} from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { IconCirclePlus, IconHeart, IconLetterA, IconLetterB, IconLetterC, IconLetterD, IconPaperclip } from '@tabler/icons';
import { createQuestion, fetchQuestionList, updateQuestion } from 'src/service/question';
import DashboardCard from 'src/components/shared/DashboardCard';
import Loading from 'src/components/shared/Loading';

const QuestionForm = () => {

    const { state } = useLocation()

    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [questionChange, setQuestionChange] = useState({
        _id: "",
        question_text: '',
        files: [],
        question_type: '',
        options: {
            option_a: '',
            option_b: '',
            option_c: '',
            option_d: ''
        },
        status: 1,
        correct_answer: '',
        marks: '',
        test: state?._id,
    })
    const [listQuestion, setListQuestion] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        getListQuestion()
    }, [isLoading])

    const getListQuestion = async () => {
        const res = await fetchQuestionList(`test=${state?._id}`)
        if (res?.code === 200) {
            setListQuestion(res?.data?.data)
        } else {
            // toast.error(res?.message)
        }
    }

    const handleChangeQuestion = (e) => {
        const { name, value } = e.target

        if (name === 'option_a' || name === 'option_b' || name === 'option_c' || name === 'option_d') {
            setQuestionChange(pre => ({
                ...pre,
                options: {
                    ...pre.options,
                    [name]: value
                }
            }))
        } else setQuestionChange(questionChange => ({ ...questionChange, [name]: value }))
        console.log('questionChange', questionChange)
    }

    const handleChangeFile = (event) => {
        const fileUp = event?.target?.files[0];
        console.log(fileUp, 'file')
        if (fileUp)
            setFile(fileUp);

    };
    const resetChangeQuestion = () => {
        setQuestionChange({
            _id: "",
            question_text: '',
            files: [],
            question_type: '',
            options: {
                option_a: '',
                option_b: '',
                option_c: '',
                option_d: ''
            },
            status: 1,
            correct_answer: '',
            marks: '',
            test: '',
        })
    }

    const handleCreateQuestion = async () => {
        setLoading(true)
        console.log('file ==>>', file)
        const params = new FormData();
        params.append("question_text", questionChange?.question_text);
        params.append("files", file);
        params.append("question_type", questionChange?.question_type);

        params.append("options", JSON.stringify([
            questionChange?.options.option_a,
            questionChange?.options.option_b,
            questionChange?.options.option_c,
            questionChange?.options.option_d,
        ]));

        params.append("correct_answer", JSON.stringify([questionChange?.correct_answer]));

        params.append("marks", questionChange?.marks);
        params.append("test", state?._id);

        const res = await createQuestion(params)
        if (res?.code === 200) {
            toast.success('Tạo câu hỏi thành công.')
            resetChangeQuestion()
            setLoading(false)
        } else {
            toast.error(res?.message)
            setLoading(false)
        }
    }

    const handleUpdateQuestion = async () => {
        setLoading(true)
        const params = new FormData();
        params.append("question_text", questionChange?.question_text);
        file && params.append("files", file);
        params.append("question_type", questionChange?.question_type);

        params.append("options", JSON.stringify([
            questionChange?.options.option_a,
            questionChange?.options.option_b,
            questionChange?.options.option_c,
            questionChange?.options.option_d,
        ]));

        params.append("correct_answer", JSON.stringify([questionChange?.correct_answer]));

        params.append("marks", questionChange?.marks);
        const res = await updateQuestion(questionChange?._id, params)
        if (res?.code === 200) {
            toast.success('Cập nhật câu hỏi thành công.')
            setLoading(false)
            setIsEdit(false)
            resetChangeQuestion()
        } else {
            setLoading(false)
            toast.error(res?.message)
        }
    }
    const handleDeleteQuestion = async (id) => {
        setLoading(true)
        const res = await updateQuestion(
            id,
            {
                status: 0
            }
        )
        if (res?.code === 200) {
            setLoading(false)
            toast.success('Xoá câu hỏi thành công.')
        } else {
            toast.error(res?.message)
            setLoading(false)
        }
    }

    return (
        <>
            <DashboardCard title='Câu hỏi'>
                {/* FORM */}
                <Grid container spacing={2} id="form-question">
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            id="outlined-basic1"
                            label="Title"
                            variant="outlined"
                            name='question_text'
                            value={questionChange.question_text}
                            onChange={handleChangeQuestion}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DriveFileRenameOutlineOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            id="outlined-basic2"
                            label="Điểm"
                            variant="outlined"
                            name='marks'
                            value={questionChange?.marks}
                            onChange={handleChangeQuestion}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconHeart />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction={'row'} gap={5} alignItems={'center'}>
                            <Typography variant='h6'>Type</Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="question_type"
                                    onChange={handleChangeQuestion}
                                    value={questionChange?.question_type}
                                >
                                    <FormControlLabel value="listening" control={<Radio />} label="Listening" />
                                    <FormControlLabel value="writting" control={<Radio />} label="Writting" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <input onChange={handleChangeFile} type='file' />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Đáp án</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-basic3"
                            variant="outlined"
                            name='option_a'
                            value={questionChange.options.option_a}
                            onChange={handleChangeQuestion}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconLetterA size={'16px'} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-basic4"
                            variant="outlined"
                            name='option_c'
                            value={questionChange.options.option_c}
                            onChange={handleChangeQuestion}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconLetterC size={'16px'} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-basic5"
                            variant="outlined"
                            name='option_b'
                            value={questionChange.options.option_b}
                            onChange={handleChangeQuestion}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconLetterB size={'16px'} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-basic6"
                            variant="outlined"
                            name='option_d'
                            value={questionChange.options.option_d}
                            onChange={handleChangeQuestion}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconLetterD size={'16px'} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction={'row'} gap={5} alignItems={'center'}>
                            <Typography variant='h6'>Đáp án đúng</Typography>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="correct_answer"
                                    onChange={handleChangeQuestion}
                                    value={questionChange.correct_answer !== "" ? questionChange.correct_answer : null}
                                >
                                    <FormControlLabel value={questionChange.options.option_a} control={<Radio />} label="A" />
                                    <FormControlLabel value={questionChange.options.option_b} control={<Radio />} label="B" />
                                    <FormControlLabel value={questionChange.options.option_c} control={<Radio />} label="C" />
                                    <FormControlLabel value={questionChange.options.option_d} control={<Radio />} label="D" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        {isEdit ?
                            <Stack justifyContent={'end'} gap={1} direction={'row'}>
                                <Button variant='contained' onClick={handleUpdateQuestion}>Save</Button>
                                <Button variant='outlined' color='error' onClick={() => {
                                    setIsEdit(false)
                                    resetChangeQuestion()
                                }}>Cancel</Button>
                            </Stack>
                            :
                            <Stack justifyContent={'end'} gap={1} direction={'row'}>
                                <Button variant='contained' onClick={handleCreateQuestion}>Thêm vào bài thi</Button>
                            </Stack>
                        }
                    </Grid>
                </Grid>
            </DashboardCard>

            {
                isLoading ? <Loading /> :
                    listQuestion?.length > 0 && listQuestion?.map((question, index) => (
                        <Box key={question?._id}>
                            <Box sx={{ mt: 4 }} />
                            <DashboardCard>
                                <Grid container>
                                    <Grid item xs={6}>

                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="correct_answer"
                                            >
                                                <Typography variant='h6' mb={2}>{index + 1}. {question?.question_text}</Typography>
                                                {question?.options?.map((item, i) => (
                                                    <FormControlLabel key={i} value={item} control={<Radio checked={question?.correct_answer?.includes(item)} />} label={item} />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <Stack alignItems={'end'} justifyContent={'end'}>
                                            <Stack justifyContent={'end'} mt={2} gap={1} direction={'row'}>
                                                <Button variant='contained' href='#form-question' onClick={() => {
                                                    setIsEdit(true)
                                                    setQuestionChange({
                                                        _id: question?._id,
                                                        question_text: question?.question_text,
                                                        question_type: question?.question_type,
                                                        options: {
                                                            option_a: question?.options[0],
                                                            option_b: question?.options[1],
                                                            option_c: question?.options[2],
                                                            option_d: question?.options[3]
                                                        },
                                                        correct_answer: question?.correct_answer[0],
                                                        marks: question?.marks
                                                    })
                                                    console.log(questionChange, 'questionChange')
                                                }}>Sửa</Button>
                                                <Button variant='outlined' color='error' onClick={() => { handleDeleteQuestion(question?._id) }}>Xoá</Button>
                                            </Stack>
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
                        </Box>
                    ))
            }
        </>
    );
};

export default QuestionForm;
