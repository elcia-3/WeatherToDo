// pages/index.js

import useSWR from 'swr';
import { gql } from 'graphql-request';
import Layout from '../components/layout/homelayout';
import styles from '../styles/Home.module.css';
import { graphQLClient } from '../utils/graphql-client';
import Link from 'next/link';
import { getAuthCookie } from '../utils/auth-cookies';
import Image from 'next/image';



const Home = ({token}) => {
  const fetcher = async (query) => await graphQLClient(token).request(query);


  const { data, error ,mutate } = useSWR(
    gql`
      {
        allTodos {
          data {
            _id
            task
            completed
            time
          }
        }
      }
    `,
    fetcher
  );

// add
const toggleTodo = async (id, completed) => {
  const query = gql`
    mutation PartialUpdateTodo($id: ID!, $completed: Boolean!) {
      partialUpdateTodo(id: $id, data: { completed: $completed }) {
        _id
        completed
      }
    }
  `;

    const mutation = gql`
      mutation CreateATodo($task: String!, $owner: ID!) {
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
    id,
    completed: !completed,
  };

  try {
    await graphQLClient(token).setHeader('X-Schema-Preview', 'partial-update-mutation').request(mutation, variables);
    mutate();
  } catch (error) {
    console.error(error);
  }
};

const deleteATodo = async (id) => {
  const query = gql`
    mutation DeleteATodo($id: ID!) {
      deleteTodo(id: $id) {
        _id
      }
    }
  `;

  try {
    await graphQLClient(token).request(query, { id });
    mutate();
  } catch (error) {
    console.error(error);
  }
};

  if (error) return (
    <>
    <Layout>
      <div className={styles.unlogin}>
        <p>Welcome to Weather ToDo</p>
        <Link href="/signup">
          <div className={styles.button}>
            <a>Signup</a>
          </div>
        </Link>

        <Link href="/login">
          <div className={styles.button}>
            <a>Login</a>
          </div>
        </Link>
      </div>
    </Layout>
    </>
  );

  return (
    <>
    <Layout>
        {data ? (
          <ul>
            {data.allTodos.data.map((todo) => (
              <li key={todo._id} className={styles.todo}>
                <span  onClick={() => deleteATodo(todo._id)} className={styles.delete}>
                <Image
                  src="/../public/circle.svg"
                  alt="svg"
                  width={30}
                  height={30}
                />
 
                </span>
                <span
                  onClick={() => toggleTodo(todo._id, todo.completed)}
                  style={
                    todo.completed
                      ? { textDecorationLine: 'line-through' }
                      : { textDecorationLine: 'none' }
                  }
                >
                  <Link href="/todo/[id]" as={`/todo/${todo._id}`}>
                    {todo.task}
                  </Link>
                </span>
  
                <span>
                  {todo.time}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div>loading...</div>
        )}
    </Layout>
   </>
  );
};

export async function getServerSideProps(ctx) {
  const token = getAuthCookie(ctx.req);
  return { props: { token: token || null } };
}

export default Home;