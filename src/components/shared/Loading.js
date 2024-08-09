import { Skeleton, Box, Stack } from '@mui/material'
import React from 'react'
import DashboardCard from './DashboardCard'

const Loading = () => {
    return (
        <>
            <DashboardCard>
                <Stack gap={1}>
                    <Skeleton variant="rounded" width={'80%'} height={10} />
                    <Skeleton variant="rounded" width={'60%'} height={10} />
                    <Skeleton variant="rounded" width={'70%'} height={10} />
                    <Skeleton variant="rounded" width={'100%'} height={120} />
                </Stack>
            </DashboardCard>
            <Box sx={{ mb: 4 }} />
        </>
    )
}

export default Loading