import React, { useState } from 'react';
import {
    Stack,
    Typography,
    Button,
    Grid,
    TextField,
    MenuItem,
    InputAdornment,
} from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import DashboardCard from 'src/components/shared/DashboardCard';
import { createCourse, updateCourse, deleteCourse } from 'src/service/courses';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';

const CourseForm = ({ closeCreateCourse, type, setLoading, fetchData }) => {
    const { state: courseInfo } = useLocation()
    const navigate = useNavigate()
    const [courseChange, setCourseChange] = useState(courseInfo || {
        _id: "",
        name: '',
        cost: '',
        discount: '',
        rank: '',
        purpose: [],
        description: '',
        teacher: JSON.parse(window.localStorage.getItem('user'))?._id,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR_rnG7h9KEcDvI6UCT7DV5XSqcnjYHoeSa0UGPue3jaUj3W-H1erME_x0esojzr9r4mw&usqp=CAU',
    })

    const handleChangeCourse = (e) => {
        const { name, value } = e.target
        setCourseChange(courseChange => ({ ...courseChange, [name]: value }))
    }

    const resetChangeCourse = () => {
        setCourseChange({
            _id: '',
            name: '',
            rank: '',
            purpose: [],
            cost: '',
            discount: '',
            description: '',
            teacher: JSON.parse(window.localStorage.getItem('user'))?._id,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR_rnG7h9KEcDvI6UCT7DV5XSqcnjYHoeSa0UGPue3jaUj3W-H1erME_x0esojzr9r4mw&usqp=CAU',
        })
    }

    const handleCreateCourse = async () => {
        setLoading(true)
        const res = await createCourse({
            name: courseChange?.name,
            cost: courseChange?.cost,
            description: courseChange?.description,
            img: courseChange?.img,
            discount: String(courseChange?.discount),
            rank: String(courseChange?.rank),
            purpose: JSON.stringify(courseChange?.purpose),
            teacher: JSON.parse(window.localStorage.getItem('user'))?._id
        })
        if (res?.code === 200) {
            toast.success('Tạo khoá học thành công.')
            resetChangeCourse()
            setLoading(false)
            fetchData()
        } else {
            setLoading(false)
            toast.error(res?.message)
        }
    }

    const handleUpdateCourse = async () => {
        const res = await updateCourse(
            courseChange?._id,
            {
                name: courseChange?.name,
                // type: courseChange?.type,
                cost: courseChange?.cost,
                description: courseChange?.description,
                img: courseChange?.img,
                discount: String(courseChange?.discount),
                rank: String(courseChange?.rank),
                purpose: JSON.stringify(courseChange?.purpose),
            }
        )
        if (res?.code === 200) {
            toast.success('Cập nhật khoá học thành công.')
        } else {
            toast.error(res?.message)
        }
    }

    const handleDeleteCourse = async () => {
        const res = await deleteCourse(
            courseChange?._id,
            {
                status: 0
            }
        )
        if (res?.code === 200) {
            toast.success('Xoá khoá học thành công.')
            navigate('/created-courses')
        } else {
            toast.error(res?.message)
        }
    }

    return (
        <DashboardCard title={
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant='h4'>{type === 'create' ? 'Thêm khoá học mới' : 'Chỉnh sửa khoá học'}</Typography>
                <Stack direction={'row'} justifyContent={'end'} alignItems={'center'} gap={1}>
                    {type === 'create' ?
                        <Button variant='contained' onClick={handleCreateCourse}>Tạo</Button>
                        :
                        <Button variant='contained' onClick={handleUpdateCourse}>Cập nhật</Button>
                    }
                    {type === 'create' ?
                        <Button variant='outlined' color='error' onClick={closeCreateCourse}>Huỷ</Button>
                        :
                        <Button variant='outlined' color='error' onClick={handleDeleteCourse}>Xoá</Button>
                    }
                </Stack>
            </Stack>
        }>
            {/* FORM */}
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        id="outlined-basic1"
                        label="Tên khoá học"
                        variant="outlined"
                        name='name'
                        value={courseChange.name}
                        onChange={handleChangeCourse}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DriveFileRenameOutlineOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        select
                        id="outlined-basic2"
                        label="Rank"
                        variant="outlined"
                        name='rank'
                        value={courseChange.rank}
                        onChange={handleChangeCourse}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ListOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value={0}>
                            0 - 250+
                        </MenuItem>
                        <MenuItem value={1}>
                            250 - 500+
                        </MenuItem>
                        <MenuItem value={2}>
                            500 - 750+
                        </MenuItem>
                        <MenuItem value={3}>
                            750 - 900+
                        </MenuItem>
                    </TextField>
                </Grid>
                {/* <Grid item xs={4}>
                    <TextField
                        fullWidth
                        select
                        id="outlined-basic2"
                        label="Loại"
                        variant="outlined"
                        name='type'
                        value={courseChange.type}
                        onChange={handleChangeCourse}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ListOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value={0}>
                            IELTS
                        </MenuItem>
                        <MenuItem value={1}>
                            TOEIC
                        </MenuItem>
                    </TextField>
                </Grid> */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        id="outlined-basic5"
                        label="Mô tả"
                        variant="outlined"
                        name='description'
                        value={courseChange.description}
                        onChange={handleChangeCourse}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        multiline
                        rows={3}
                        fullWidth
                        id="outlined-basic1"
                        label="Purpose"
                        variant="outlined"
                        name='purpose'
                        value={courseChange.purpose}
                        onChange={handleChangeCourse}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Giá</Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="outlined-basic6"
                        label="Giá"
                        variant="outlined"
                        name='cost'
                        value={courseChange.cost}
                        onChange={handleChangeCourse}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocalOfferOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="outlined-basic7"
                        label="Discount"
                        variant="outlined"
                        name='discount'
                        value={courseChange.discount}
                        onChange={handleChangeCourse}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PercentOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

        </DashboardCard>
    );
};

export default CourseForm;
