import React from 'react'
import DashboardCard from '../../../components/shared/DashboardCard';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { IconChevronRight } from '@tabler/icons';

const TestRecent = () => {
    return (
        <DashboardCard title={"Bài test đã làm gần đây"}>
            <Stack gap={2} mb={2}>
                <Typography variant='h6'>2024 Practice Set TOEIC Test 7</Typography>
                <Typography>Ngày làm bài: 17/06/2024</Typography>
                <Typography>Thời gian hoàn thành: 0:06:14</Typography>
                <Typography>Kết quả: 5/6</Typography>
                <Typography variant='a' component={'a'} href='/test'>[Xem chi tiết]</Typography>
                <Divider />
            </Stack>
            <Stack gap={2} mb={2}>
                <Typography variant='h6'>2024 Practice Set TOEIC Test 7</Typography>
                <Typography>Ngày làm bài: 17/06/2024</Typography>
                <Typography>Thời gian hoàn thành: 0:06:14</Typography>
                <Typography>Kết quả: 5/6</Typography>
                <Typography variant='a' component={'a'} href='/test'>[Xem chi tiết]</Typography>
                <Divider />
            </Stack>
            <Stack alignItems={'end'}>
                <Button endIcon={<IconChevronRight size={'16px'} />} href='/courses'>Thống kê tất cả</Button>
            </Stack>
        </DashboardCard>
    )
}

export default TestRecent