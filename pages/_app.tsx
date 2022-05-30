import React from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  
  return(
    <React.Fragment>
      <Head>
        <title>Parameter TimeTabling</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <Container maxWidth="xl" style={{marginBottom: 25, marginTop: 20}}>
        <Typography component="div" style={{boxShadow: '0px 1px 4px rgba(66, 66, 66, 0.5)', borderRadius: '2px', background: '#fff'}}>
          <Component {...pageProps} />
        </Typography>
      </Container>
    </React.Fragment>
  )
}

export default MyApp
