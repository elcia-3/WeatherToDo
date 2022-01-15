// pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from '../styles/login.module.css'
import Layout from '../components/layout/loginlayout';
import Image from 'next/image';

const Login = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return (
    <Layout>
      <form className={styles.box} onSubmit={onSubmit}>
        <div>
          <Image
            src="/WeatherToDo.png"
            alt="image"
            width={400}
            height={100}
          />

          <input
            type="email"
            placeholder='Email'
            className={styles.text}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <span role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <input
            type="password"
            className={styles.password}
            placeholder='Password'
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <span role="alert">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <button className={styles.submit} type="submit">Log in</button>
        </div>
      </form>

      {errorMessage && (
        <p role="alert">
          {errorMessage}
        </p>
      )}
    </Layout>
  );
};

export default Login;