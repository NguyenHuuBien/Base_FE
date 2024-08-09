import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  sx
}) => {

  return (
    <Card
      sx={sx}
      elevation={9}
      variant={undefined}
    >
      {cardheading ? (
        <CardContent sx={{ width: '100%' }}>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ p: "30px", width: "100%" }}>
          {title ? (
            <Stack
              mb={3}
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={'center'}
              width={'100%'}
            >
              <Box sx={{ width: '100%' }}>
                {title ? <Typography variant="h5">{title}</Typography> : ''}

                {subtitle ? (
                  <Typography variant="subtitle2" color="textSecondary">
                    {subtitle}
                  </Typography>
                ) : (
                  ''
                )}
              </Box>
              {action}
            </Stack>
          ) : null}

          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
