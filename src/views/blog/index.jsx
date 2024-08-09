import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { Box, Button, CardContent, Grid, InputAdornment, Skeleton, Stack, styled, TextField, Typography, Autocomplete, Link } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import JoditEditor from 'jodit-react';
import { IconSearch, IconUpload } from '@tabler/icons';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import { createBlog, fetchBlogList, uploadFile } from 'src/service/blog';
import toast from 'react-hot-toast';
import Loading from 'src/components/shared/Loading';
import Nothing from 'src/components/shared/Nothing';
import BlankCard from 'src/components/shared/BlankCard';
import BlogItem from 'src/components/shared/BlogItem';
import { slice } from 'lodash';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Blog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [listBlog, setListBlog] = useState([]);
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');
    const [file, setFile] = useState(null);
    const [imageBlog, setImageBlog] = useState('');
    const [paragh, setParagh] = useState('');

    useEffect(() => {
        getListBlog()
    }, [isLoading])

    const getListBlog = async () => {
        const params = window.localStorage.getItem('role') === 'student' ? '' : `teacher=${JSON.parse(window.localStorage.getItem('user'))?._id}`
        const res = await fetchBlogList(params)
        if (res?.code === 200) {
            setListBlog(res?.data?.data)
            const parser = new DOMParser();
            const doc = parser.parseFromString(res?.data?.data[0]?.content, 'text/html');

            // Lấy thẻ img từ tài liệu phân tích
            const imgElement = doc.querySelector('img');
            const paraghElement = doc.querySelector('span');

            // Hiển thị thuộc tính src của thẻ img
            setImageBlog(imgElement?.src);
            setParagh(paraghElement?.innerHTML);
            console.log(paraghElement?.innerHTML)
        }
    }

    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    const handleChangeFile = async (event) => {
        const fileUp = event?.target?.files[0];
        if (fileUp) {
            const param = new FormData()
            param.append('file', fileUp)
            setLoading(true)
            const res = await uploadFile(param)
            if (res?.code === 200) {
                setFile(res?.data)
                toast.success('Tải ảnh lên thành công')
                setLoading(false)
            } else {
                toast.error(res?.message)
                setLoading(false)
            }
        }
    };

    const handleUpBlog = async () => {
        setLoading(true)
        const res = await createBlog({
            title,
            content,
            tags: JSON.stringify(['Học Toeic', 'Tip Toeic', 'Toeic'])
        })
        if (res?.code === 200) {
            toast.success('Đăng bài thành công')
            setLoading(false)
        } else {
            toast.error(res?.message)
            setLoading(false)
        }
    }

    const handleBlur = useCallback((newContent) => {
        setContent(newContent);
    }, [setContent]);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Start typings...',
        height: '75vh',
    }), []);

    return (
        <PageContainer title="Blog" description="this is Blog">

            {
                window.localStorage.getItem('role') === 'student' ?
                    <Grid container spacing={2}>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                fullWidth
                                size='small'
                                disablePortal
                                id="combo-box-demo"
                                options={listBlog?.map(item => ({ label: item?.title, id: item?._id }))}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        <a href={`/blog/${option?.id}`}>{option?.label}</a>
                                    </li>
                                )}
                                renderInput={(params) => <TextField
                                    fullWidth {...params}
                                    label="Tìm kiếm bài viết"
                                />}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <DashboardCard title={'Bài viết mới nhất'}>
                                <Stack direction={'row'} alignItems={'start'} gap={2}>
                                    <img alt='' src={imageBlog} width={'50%'} />
                                    <Stack gap={2}>
                                        <Typography variant='h6' component={'a'} href={`/blog/${listBlog[0]?._id}`}>{listBlog[0]?.title}</Typography>
                                        <Typography>Tác giả: {listBlog[0]?.author?.name}</Typography>
                                        <div dangerouslySetInnerHTML={createMarkup(paragh)} />
                                    </Stack>
                                </Stack>
                            </DashboardCard>
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <DashboardCard>
                                        <Typography variant='h6' component={'a'} href={`/blog/${listBlog[1]?._id}`}>{listBlog[1]?.title}</Typography>
                                    </DashboardCard>
                                </Grid>
                                <Grid item xs={12}>
                                    <DashboardCard>
                                        <Typography variant='h6' component={'a'} href={`/blog/${listBlog[2]?._id}`}>{listBlog[2]?.title}</Typography>
                                    </DashboardCard>
                                </Grid>
                                <Grid item xs={12}>
                                    <DashboardCard>
                                        <Typography variant='h6' component={'a'} href={`/blog/${listBlog[3]?._id}`}>{listBlog[3]?.title}</Typography>
                                    </DashboardCard>
                                </Grid>
                                <Grid item xs={12}>
                                    <DashboardCard>
                                        <Typography variant='h6' component={'a'} href={`/blog/${listBlog[4]?._id}`}>{listBlog[4]?.title}</Typography>
                                    </DashboardCard>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <DashboardCard title={'Bài viết khác'}>
                                <Grid container spacing={2}>
                                    {
                                        listBlog?.length > 5 &&
                                        listBlog?.slice(5)?.map(item => (
                                            <Grid item xs={4} key={item?._id}>
                                                <BlogItem data={item} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </DashboardCard>
                        </Grid>
                    </Grid>
                    :
                    <>
                        <DashboardCard title={
                            <Stack alignItems={'center'} justifyContent={'space-between'} direction={'row'} mb={2}>
                                <Typography variant='h4'>Blog</Typography>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<IconUpload />}
                                >
                                    Upload ảnh
                                    <VisuallyHiddenInput type="file" onChange={handleChangeFile} />
                                </Button>
                            </Stack>
                        }>
                            {file &&
                                <Stack alignItems={'end'} mb={2}>
                                    {
                                        isLoading ? <Skeleton width={'100%'} animation="wave" /> : <Typography>{file}</Typography>
                                    }
                                </Stack>
                            }

                            <TextField
                                sx={{ mb: 2 }}
                                fullWidth
                                id="outlined-basic1"
                                label="Title"
                                variant="outlined"
                                name='question_text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DriveFileRenameOutlineOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => handleBlur(newContent)}
                            />

                            <Button sx={{ mt: 2 }} variant='contained' onClick={handleUpBlog}>Đăng bài</Button>
                        </DashboardCard>

                        <Box sx={{ mt: 4 }} />

                        <DashboardCard title={'Bài viết đã tạo'}>
                            <Grid container spacing={2}>
                                {
                                    listBlog?.length > 0 ?
                                        listBlog?.map(item => (
                                            <Grid item key={item?._id} xs={4}>
                                                <BlogItem data={item} />
                                            </Grid>
                                        ))
                                        :
                                        <Nothing title={'Không tìm thấy bài viết.'} />
                                }
                            </Grid>
                        </DashboardCard>
                    </>
            }
        </PageContainer>
    );
};

export default Blog;
