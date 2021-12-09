// pages/new.js

import { useState } from 'react';
import Router from 'next/router';
import { gql } from 'graphql-request';
import { useForm } from 'react-hook-form';
import Layout from '../components/layout';
import { graphQLClient } from '../utils/graphql-client';

const New = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async ({ task }) => {
    if (errorMessage) setErrorMessage('');

    const query = gql`
      mutation CreateATodo($task: String!) {
        createTodo(data: { task: $task, completed: false }) {
          task
          completed
        }
      }
    `;

    try {
      await graphQLClient.request(query, { task });
      Router.push('/');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return (
    <Layout>
      <h1>Create New Todo</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>Task</label>
          <input
            type="text"
            placeholder="e.g. do something"
            {...register('task', { required: 'Task is required' })}
          />
          {errors.task && (
            <span role="alert">
              {errors.task.message}
            </span>
          )}
        </div>

        <div>
          <button type="submit">Create</button>
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

export default New;