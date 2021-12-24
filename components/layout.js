// components/layout.js

import Head from 'next/head';
import Header from '../components/header';
import styles from '../styles/layout.module.css';
import Sidebar from '../components/sidebar'
import Link from 'next/link';

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Next Fauna GraphQL CRUD</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <Header />
      <div className={styles.WholePage}>
        <div className={styles.SidebarBox}>
          <Sidebar>
            <Link href="/">
              <a className={styles.current}>Inbox</a>
            </Link>
            <Link href="/new">
              <a>Create New Todo</a>
            </Link>
          </Sidebar>
        </div>
        <div className={styles.MainBox}>
          <div className={styles.MainContentBox}>
            {children}
          </div>
        </div>
      </div>
 

    </main>
  </>
);

export default Layout;