// components/header.js

import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/header.module.css';
import useSWR from 'swr';

const Header = () => {
  const router = useRouter();
  
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data: user, mutate: mutateUser } = useSWR('/api/user', fetcher);

  const logout = async () => {
    const res = await fetch('/api/logout');
    if (res.ok) {
      mutateUser(null);
      router.push('/login');
    }
  };

  return (
    <header>
      <div className={styles.header}>
        <Link href="/">
          <a className={styles.home}>Home</a>
        </Link>

        <ul>
          {user ? (
            <>
              <li>
                <Link href="/profile">
                  <a>{user.email}</a>
                </Link>
              </li>
              <li>
                <button className={styles.logout} onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a>Signup</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;