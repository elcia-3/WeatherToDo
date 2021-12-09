// components/layout.js

import Head from 'next/head';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Next Fauna GraphQL CRUD</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <div>{children}</div>
    </main>
  </>
);

export default Layout;