// components/layout.js

import Head from 'next/head';
import Header from '../components/header';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Next Fauna GraphQL CRUD</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Header />
      <div>{children}</div>
    </main>
  </>
);

export default Layout;