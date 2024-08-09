import React from 'react'
import BlankCard from './BlankCard'
import { Button, CardContent, Typography } from '@mui/material'

const BlogItem = (props) => {
    const { data } = props

    return (
        <BlankCard>
            <CardContent sx={{backgroundColor: 'rgba( 127, 255, 212, .08 )', border: '1px solid rgba( 127, 255, 212, .3 )' }}>
                <Typography sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '15px',
                    fontWeight: '500',
                }}>{data?.title}</Typography>
                <Typography sx={{ mt: 1, mb: 2 }}>Tác giả: {data?.author?.name}</Typography>
                <Button href={`/blog/${data?._id}`} variant='outlined' fullWidth>Xem bài viết</Button>
            </CardContent>
        </BlankCard>
    )
}

export default BlogItem