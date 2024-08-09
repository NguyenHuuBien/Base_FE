import { Stack, Typography } from '@mui/material';
import React from 'react'

import nothing from 'src/assets/images/products/nothing.jpg';

const Nothing = ({ title }) => {
    return (
        <Stack alignItems={'center'} justifyContent={'center'} my={6}>
            <img
                src={nothing}
                alt="img"
                width="25%"
                style={{ objectFit: 'cover' }}
            />
            <Typography>{title}</Typography>
        </Stack>
    )
}

export default Nothing