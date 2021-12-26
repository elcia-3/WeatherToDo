// pages/new.js

import { useState } from 'react';
import Router from 'next/router';
import { gql } from 'graphql-request';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout/newlayout';
import { graphQLClient } from '../utils/graphql-client';
import { getAuthCookie } from '../utils/auth-cookies';
import useSWR from 'swr'; // add
import styles from '../styles/new.module.css';

const New = ({token}) => {
   const { data: user } = useSWR('/api/user'); // add 
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async ({ task, time }) => {
    if (errorMessage) setErrorMessage('');

    // update
    const mutation = gql`
      mutation CreateATodo($task: String!, $time: String, $owner: ID!) {
        createTodo(
          data: { task: $task, completed: false, time: $time, owner: { connect: $owner } }
        ) {
          task
          completed
          time
          owner {
            _id
          }
        }
      }
    `;

    const variables = {
      task,
      time,
      owner: user && user.id,
    };

    const query = gql`
      mutation CreateATodo($task: String!) {
        createTodo(data: { task: $task, completed: false }) {
          task
          completed
        }
      }
    `;


    try {
      await graphQLClient(token).request(mutation, variables); // update
      Router.push('/');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return (
    <Layout>
      <form onSubmit={onSubmit} className={styles.formlayout}>
        <div className={styles.task}>
          <textarea
            placeholder="Task"
            {...register('task', { required: 'Task is required' })}
          />
          {errors.task && (
            <span role="alert">
              {errors.task.message}
            </span>
          )}
        </div>

        <div className={styles.time}>
          <input
            type="text"
            placeholder="Time"
            {...register('time')}
          />
        </div>

        <div>
          <button type="submit" className={styles.button}><span>Create</span></button>
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

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req);
  return { props: { token: token || null } };
}

export default New;