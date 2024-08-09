import React, { useState } from 'react';
import {
    Stack,
    Typography,
    Button,
    Grid,
    TextField,
    InputAdornment,
} from '@mui/material';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DashboardCard from 'src/components/shared/DashboardCard';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { IconClock, IconHeart } from '@tabler/icons';
import { createTest, updateTest } from 'src/service/test';

const TestForm = ({ closeCreateTest, type, setLoading, fetchData }) => {
    const { state: testInfo } = useLocation()
    console.log("useLocation", testInfo)
    const navigate = useNavigate()
    const [testChange, setTestChange] = useState(testInfo || {
        _id: "",
        name: '',
        description: '',
        total_marks: '',
        duration: '',
        status: 1,
    })

    const handleChangeTest = (e) => {
        const { name, value } = e.target
        setTestChange(testChange => ({ ...testChange, [name]: value }))
    }

    const resetChangeTest = () => {
        setTestChange({
            _id: "",
            name: '',
            description: '',
            total_marks: '',
            duration: '',
            status: 1,
        })
    }

    const handleCreateTest = async () => {
        setLoading(true)
        const res = await createTest({
            name: testChange?.name,
            description: testChange?.description,
            total_marks: testChange?.total_marks,
            duration: testChange?.duration,
        })
        if (res?.code === 200) {
            toast.success('Tạo bài thi thành công.')
            resetChangeTest()
            setLoading(false)
            fetchData()
        } else {
            toast.error(res?.message)
            setLoading(false)
        }
    }

    const handleUpdateTest = async () => {
        const res = await updateTest(
            testChange?._id,
            {
                name: testChange?.name,
                description: testChange?.description,
                total_marks: testChange?.total_marks,
                duration: testChange?.duration,
            }
        )
        if (res?.code === 200) {
            toast.success('Cập nhật bài thi thành công.')
        } else {
            toast.error(res?.message)
        }
    }
    const handleDeleteTest = async () => {
        const res = await updateTest(
            testChange?._id,
            {
                status: 0
            }
        )
        if (res?.code === 200) {
            toast.success('Xoá bài thi thành công.')
            navigate('/created-test')
        } else {
            toast.error(res?.message)
        }
    }


    return (
        <DashboardCard title={
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant='h4'>{type === 'create' ? 'Thêm bài thi mới' : 'Chỉnh sửa bài thi'}</Typography>
                <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} gap={1}>
                    {type === 'create' ?
                        <Button variant='contained' onClick={handleCreateTest}>Tạo</Button>
                        :
                        <Button variant='contained' onClick={handleUpdateTest}>Cập nhật</Button>
                    }
                    {type === 'create' ?
                        <Button variant='outlined' color='error' onClick={closeCreateTest}>Huỷ</Button>
                        :
                        <Button variant='outlined' color='error' onClick={handleDeleteTest}>Xoá</Button>
                    }
                </Stack>
            </Stack>
        }>
            {/* FORM */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="outlined-basic1"
                        label="Tên bài thi"
                        variant="outlined"
                        name='name'
                        value={testChange.name}
                        onChange={handleChangeTest}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DriveFileRenameOutlineOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="outlined-basic2"
                        label="Thời gian"
                        variant="outlined"
                        name='duration'
                        value={testChange.duration}
                        onChange={handleChangeTest}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconClock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <Typography>phút</Typography>
                            ),
                        }}
                        prefix='phút'
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="outlined-basic3"
                        label="Tổng điểm"
                        variant="outlined"
                        name='total_marks'
                        value={testChange.total_marks}
                        onChange={handleChangeTest}
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
                    <TextField
                        fullWidth
                        id="outlined-basic4"
                        multiline
                        rows={3}
                        label="Mô tả"
                        variant="outlined"
                        name='description'
                        value={testChange.description}
                        onChange={handleChangeTest}
                    />
                </Grid>
            </Grid>

        </DashboardCard>
    );
};

export default TestForm;
