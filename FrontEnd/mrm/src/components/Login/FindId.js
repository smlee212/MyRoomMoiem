import * as React from 'react';

import './Login.css';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { FindId } from './FindIdLogic';

const theme = createTheme();

export default function FindIdPage() {

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            // alignItems: 'center', 
            justifyContent: 'center', 
            bgcolor: '#FAF6E9',
          }}
        >
          <div className='inbox'>
            <img src='images/logomrm.png' alt='logo' className='imgbox' />
            <div className='fontbox'>
              <h1 className='main-font'>마룸모</h1>
              <h1>마이 룸에서 하는 스터디 모임</h1>
            </div>
          </div>
        </Grid>
        
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} backgroundColor='#FAF6E9' square>

          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >

            <h1>아이디 찾기</h1>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={8}>
                  <TextField
                    margin='normal'
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="이름"
                    autoFocus
                    sx={{
                      bgcolor: '#FFFFFF'
                    }}
                  />
                </Grid>  
                <Grid item xs={8}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="이메일 주소"
                    sx={{
                      bgcolor: '#FFFFFF'
                    }}
                  />
                </Grid>  
                <Grid item xs={8}>
                  <Button
                    onClick={FindId}
                    fullWidth
                    variant="contained"
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      bgcolor: '#FFFFFF', 
                      color: '#000000', 
                      fontFamily: "GangwonEdu_OTFBoldA", 
                      boxShadow: "5px 5px 4px rgba(0, 0, 0, 0.15)" 
                    }}
                  >
                    아이디 찾기
                  </Button>
                  {/* <FormHelperTexts>{signUPError}</FormHelperTexts> */}
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="./" variant="body2" underline='hover'>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ 
                                mt: 3, 
                                mb: 2, 
                                bgcolor: '#FFFFFF', 
                                color: '#000000', 
                                fontFamily: "GangwonEdu_OTFBoldA", 
                                boxShadow: "5px 5px 4px rgba(0, 0, 0, 0.15)" 
                                }}
                            >
                                    취소
                            </Button>
                        </Link>
                    </Grid>
                  </Grid>
                </Grid>  
              </Grid> 
            </Box>
          </Box>
          </Grid>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Grid>
    </ThemeProvider>
  );
}
