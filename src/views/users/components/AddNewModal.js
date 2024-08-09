import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Card, CardContent, Grid, Stack, TextField, MenuItem, InputAdornment } from '@mui/material';
import { role } from 'src/constants/role'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FlakyOutlinedIcon from '@mui/icons-material/FlakyOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { createUser } from 'src/service/users';
import toast from 'react-hot-toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 360,
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const AddNewModal = ({ open, setOpen }) => {
    const [userInfo, setUserInfo] = useState({})
    const handleClose = () => setOpen(false);
    const handleCreateUser = async () => {
        const res = await createUser(userInfo)
        if (res?.code === 200) {
            handleClose()
            toast.success('Thêm người dùng thành công.')
        } else {
            toast.error(res?.message ?? 'Có lỗi khi thêm người dùng.')
        }
    }
    const handleChangeUser = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
        console.log(userInfo, 'userInfo')
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <CardContent>
                        <Typography align='center' variant='h6' mb={4}>Thêm người dùng mới</Typography>
                        <form onSubmit={handleCreateUser}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant='h7'>Thông tin tài khoản</Typography>
                                </Grid>
                                <Grid item xs={12} md={6} mb={1}>
                                    <TextField
                                        onChange={handleChangeUser}
                                        fullWidth
                                        placeholder='nguoidung1'
                                        label='Username'
                                        name='username'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} mb={1}>
                                    <TextField
                                        onChange={handleChangeUser}
                                        fullWidth
                                        placeholder='abc123@/.'
                                        label='Mật khẩu'
                                        name='password'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockOpenOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} mb={1}>
                                    <TextField
                                        onChange={handleChangeUser}
                                        fullWidth
                                        placeholder='Chọn quyền truy cập'
                                        label='Quyền truy cập'
                                        select
                                        name='role'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <BusinessCenterOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    >
                                        {
                                            role.map(option => (
                                                <MenuItem key={option.id} value={option.role}>
                                                    {option.role}
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='h7'>Thông tin người dùng</Typography>
                                </Grid>
                                <Grid item xs={12} md={6} mb={1}>
                                    <TextField
                                        onChange={handleChangeUser}
                                        fullWidth
                                        placeholder='Nguyễn Văn A'
                                        label='Họ tên'
                                        name='name'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} mb={1}>
                                    <TextField
                                        onChange={handleChangeUser}
                                        fullWidth
                                        placeholder='male/female'
                                        label='Giới tính'
                                        name='sex'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <FlakyOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} mb={1}>
                                    <TextField
                                        onChange={handleChangeUser}
                                        fullWidth placeholder='DD/MM/YYYY'
                                        label='Ngày sinh'
                                        name='birthday'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <CalendarMonthOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} mb={1}>
                                    <TextField
                                        onChange={handleChangeUser}
                                        fullWidth
                                        placeholder='0987654321'
                                        label='Số điện thoại'
                                        name='phone'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} mb={1}>
                                    <TextField
                                        onChange={handleChangeUser}
                                        fullWidth
                                        placeholder='example@gmail.com'
                                        label='Email'
                                        name='email'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Stack direction={'row'} justifyContent={'end'} gap={2}>
                                <Button variant='contained' color='primary' type='submit'>Lưu</Button>
                                <Button variant='outlined' color='error' onClick={handleClose}>Trở lại</Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    )
}

export default AddNewModal