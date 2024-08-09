import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack, Button, Grid, FormControlLabel, RadioGroup, FormControl, Radio } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useLocation, useParams } from 'react-router';
import { fetchTestById } from 'src/service/test';
import toast from 'react-hot-toast';
import TestForm from 'src/components/forms/test-form';
import QuestionForm from 'src/components/forms/question-form';
import { fetchQuestionList } from 'src/service/question';


const EditTest = () => {

    const { state: testInfo } = useLocation()
    // const [testInfo, setTestInfo] = useState({})
    const [listQuestion, setListQuestion] = useState({})

    useEffect(() => {
        // getTestInfo()
        getListQuestion()
    }, [])

    // const getTestInfo = async () => {
    //     const res = await fetchTestById(id)
    //     console.log('getTestInfo', res)
    //     if (res?.code === 200) {
    //         setTestInfo(res?.data)
    //     } else {
    //         toast.error(res?.message)
    //     }
    // }

    const getListQuestion = async () => {
        const res = await fetchQuestionList(`test=${testInfo?._id}`)
        if (res?.code === 200) {
            setListQuestion(res?.data?.data)
        } else {
            toast.error(res?.message)
        }
    }

    return (
        <PageContainer title="Sample Page" description="this is Sample page">

            <TestForm type={'edit'} />

            <Box sx={{ mb: 4 }} />

            <QuestionForm />

        </PageContainer>
    );
};

export default EditTest;
