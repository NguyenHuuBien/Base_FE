import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab, Box, Button } from '@mui/material';
import { Stack } from '@mui/system';
import { IconBasket } from '@tabler/icons';
import BlankCard from './BlankCard';
import courseCover from 'src/assets/images/products/course-cover.jpg';

const CourseItem = (props) => {

    const { data, sm = 12, md = 4, lg = 3, rating } = props

    return (
        <Grid container spacing={3}>
            {data?.map((product, index) => (
                <Grid item sm={sm} md={md} lg={lg} key={index}>
                    <BlankCard>
                        <Typography component={Link} to={`/course/${product?._id}`}>
                            <img
                                src={product.img ?? courseCover}
                                alt="img"
                                width="100%"
                                height="150px"
                                style={{ objectFit: 'cover' }}
                            />
                        </Typography>
                        {/* <Tooltip title="Add To Cart">
                            <Fab
                                size="small"
                                color="primary"
                                sx={{ bottom: '75px', right: '15px', position: 'absolute' }}
                            >
                                <IconBasket size="16" />
                            </Fab>
                        </Tooltip> */}
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Box sx={{ overflow: "hidden", textOverflow: "ellipsis", width: '100%', whiteSpace: 'nowrap', fontSize: '1rem', fontWeight: '600' }}>
                                {product.name}
                            </Box>
                            <Stack direction="row" alignItems="center" gap={2}>
                                <Typography py={1} color='error'>{product.type === "1" ? 'TOEIC' : 'IELTS'}</Typography>
                                <Rating name="read-only" size="small" value={rating?.find(rate => rate?.course?._id === product?._id)?.rate || 0} readOnly />
                            </Stack>
                            <Stack direction="row" alignItems="center">
                                <Typography variant="h6">${product.cost}</Typography>
                                <Typography color="textSecondary" ml={1} sx={{ textDecoration: 'line-through' }}>
                                    ${product.discount + product.cost}
                                </Typography>
                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default CourseItem;
