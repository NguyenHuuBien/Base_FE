import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { fetchBlogById } from 'src/service/blog';
import { useParams } from 'react-router';
import Loading from 'src/components/shared/Loading';


const DetailBLog = () => {

    const [blogDetail, setBlogDetail] = useState({});
    const [isLoading, setLoading] = useState(false);
    const { id: blogId } = useParams()

    useEffect(() => {
        getListBlog()
    }, [])

    const getListBlog = async () => {
        setLoading(true)
        const res = await fetchBlogById(blogId)
        if (res?.code === 200) {
            setBlogDetail(res?.data)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <PageContainer title="Sample Page" description="this is Sample page">

            <DashboardCard title={blogDetail?.title}>
                {
                    isLoading ?
                        <Loading /> :
                        <div dangerouslySetInnerHTML={createMarkup(blogDetail?.content)} />
                }
            </DashboardCard>
        </PageContainer>
    );
};

export default DetailBLog;
