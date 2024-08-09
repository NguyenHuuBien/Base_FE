import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Box, Button } from '@mui/material';
import { Stack } from '@mui/system';
import BlankCard from './BlankCard';
import courseCover from 'src/assets/images/products/course-cover.jpg';

const TestItem = (props) => {

    const { data, sm = 12, md = 4, lg = 3 } = props

    return (
        <Grid container spacing={3}>
            {data?.map((product, index) => (
                <Grid item sm={sm} md={md} lg={lg} key={index}>
                    <BlankCard>
                        <CardContent sx={{ p: 3, pt: 2, backgroundColor: 'rgba(56, 167, 255, .05)', border: '1px solid rgba(56, 167, 255, .3)' }}>
                            <Box sx={{ overflow: "hidden", textOverflow: "ellipsis", width: '100%', whiteSpace: 'nowrap', fontSize: '1rem', fontWeight: '600' }}>
                                {product.name}
                            </Box>
                            <Typography py={1} sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>{product.description ?? ""}</Typography>
                            <Typography py={1} color='error'>{product.duration ?? ""} phút</Typography>
                            {/* <Stack direction="row" alignItems="center">
                                    <Typography variant="h6">${product.cost}</Typography>
                                    <Typography color="textSecondary" ml={1} sx={{ textDecoration: 'line-through' }}>
                                        ${product.discount + product.cost}
                                    </Typography>
                                </Stack> */}
                            <Button variant='outlined' href={`/test/${product?._id}`} fullWidth>Xem chi tiết</Button>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default TestItem;
