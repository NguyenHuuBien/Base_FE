import React, { useState } from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { fetchLogin } from 'src/service/auth';
import toast from 'react-hot-toast';

const AuthLogin = ({ title, subtitle, subtext }) => {

    // state
    const [user, setUser] = useState({
        username: '',
        password: '',
    })
    const navigate = useNavigate();

    const onChangeUser = (e) => {
        const { value, name } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleLogin = async () => {
        const res = await fetchLogin(user)
        console.log(res, "login res");
        if (res?.code === 200) {
            window.localStorage.setItem("access_token", res?.data?.accessToken)
            window.localStorage.setItem("refresh_token", res?.data?.refreshToken)
            window.localStorage.setItem("role", res?.data?.user?.role)
            window.localStorage.setItem("user", JSON.stringify(res?.data?.user))
            toast.success("Đăng nhập thành công.", { duration: 3000 })
            if (res?.data?.user?.role === 'admin') {
                navigate("/users")
            } else if (res?.data?.user?.role === 'teacher') {
                navigate("/created-courses")
            } else {
                navigate("/")
            }
        } else toast.error(res?.message ?? "Đăng nhập thất bại.", { duration: 3000 })
    }

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Stack>
                <Box>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='username' mb="5px">Username</Typography>
                    <CustomTextField id="username" variant="outlined" fullWidth name="username" onChange={onChangeUser} />
                </Box>
                <Box mt="25px">
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                    <CustomTextField id="password" type="password" variant="outlined" fullWidth name="password" onChange={onChangeUser} />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Remeber this Device"
                        />
                    </FormGroup>
                    <Typography
                        component={Link}
                        to="/"
                        fontWeight="500"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                        }}
                    >
                        Forgot Password ?
                    </Typography>
                </Stack>
            </Stack>
            <Box>
                <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    type="submit"
                    onClick={handleLogin}
                >
                    Sign In
                </Button>
            </Box>
            {subtitle}
        </>
    );
}

export default AuthLogin;
