// pages/signup.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout/signuplayout';
import styles from '../styles/signup.module.css';

const Signup = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage('');

    try {
      const res = await fetch('/api/signup', {
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
      <form onSubmit={onSubmit} className={styles.formlayout}>
        <div className={styles.input}>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <span role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className={styles.input}>
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <span role="alert">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className={styles.input}>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register('password2', {
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
          />
          {errors.password2 && (
            <span role="alert">
              {errors.password2.message}
            </span>
          )}
        </div>

        <div>
          <button type="submit" className={styles.button}><span>Sign up</span></button>
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

export default Signup;