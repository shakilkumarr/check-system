import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
// import { createGlobalStyle } from 'styled-components';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <React.Fragment>
    <Head><title>Check System</title></Head>
    <Component {...pageProps} />
  </React.Fragment>
);

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp
