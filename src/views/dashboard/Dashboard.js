import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import TestRecent from './components/TestRecent';
import TestSuggestion from './components/TestSuggestion';
import banner2 from 'src/assets/images/products/banner2.jpg';
import banner1 from 'src/assets/images/products/banner1.png';
import CourseRecent from './components/CourseRecent';
import CourseSuggestion from './components/CourseSuggestion';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <CourseRecent />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CourseSuggestion />
          </Grid>
          <Grid item xs={12}>
            <img
              src={banner2}
              alt="img"
              width="100%"
              style={{ objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TestRecent />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TestSuggestion />
              </Grid>
              <Grid item xs={12}>
                <TestSuggestion />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <img
              src={banner1}
              alt="img"
              width="100%"
              style={{ objectFit: 'cover' }}
            />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
