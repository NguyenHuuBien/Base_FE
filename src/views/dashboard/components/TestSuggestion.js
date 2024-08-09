import React from 'react'
import DashboardCard from '../../../components/shared/DashboardCard';
import { Button, Stack, Typography } from '@mui/material';
import { IconChevronRight } from '@tabler/icons';

const TestSuggestion = () => {
    return (
        <DashboardCard title={"Test thử"}>
            <Stack gap={2}>
                <Typography>Đề luyện thi toeic</Typography>
                <Typography>Số câu hỏi: 10</Typography>
                <Typography>Người tạo: teacher1</Typography>
            </Stack>
            <Stack alignItems={'end'} mt={2}>
                <Button endIcon={<IconChevronRight size={'16px'} />} href='/courses'>Làm ngay</Button>
            </Stack>
        </DashboardCard>
    )
}

export default TestSuggestion