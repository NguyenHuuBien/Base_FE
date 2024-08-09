import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from 'src/components/shared/DashboardCard';
import ChildPageHeader from 'src/components/header/ChildPageHeader';
import { useParams } from 'react-router';
import { fetchUserById } from 'src/service/users';

const DetailUserPage = () => {
    const { id } = useParams()
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = async () => {
        const res = await fetchUserById(id)
        if (res.code === 200) {
            setUserInfo(res?.data)
        }
    }

    return (
        <PageContainer title="Detail User Page" description="this is detail user page">
            <DashboardCard title={<ChildPageHeader title={'Tài khoản'} />}>
                <Typography>{userInfo?.name}</Typography>
            </DashboardCard>
        </PageContainer>
    )
}

export default DetailUserPage