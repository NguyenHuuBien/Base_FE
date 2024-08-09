import { IconButton, Stack, Typography } from '@mui/material'
import { IconArrowNarrowLeft } from '@tabler/icons'
import React from 'react'
import {  useNavigate } from 'react-router-dom';

const ChildPageHeader = ({ title }) => {
    const navigate = useNavigate();

    return (
        <Stack direction={'row'} gap={2} alignItems={'center'}>
            <IconButton onClick={()=>{
                navigate(-1)
            }}>
                <IconArrowNarrowLeft />
            </IconButton>
            <Typography variant='h4'>
                {title}
            </Typography>
        </Stack>
    )
}

export default ChildPageHeader