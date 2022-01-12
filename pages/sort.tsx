// pages/index.js

import React from "react";
import useSWR from 'swr';
import { gql } from 'graphql-request';
import Layout from '../components/layout/homelayout';
import styles from '../styles/Home.module.css';
import { graphQLClient } from '../utils/graphql-client';
import Link from 'next/link';
import { getAuthCookie } from '../utils/auth-cookies';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';


const Home = ({token}) => {
  const fetcher = async (query) => await graphQLClient(token).request(query);

  const [time1, settime1] = useState(null);
  const [time2, settime2] = useState(null);
  var t1;


  const calcResult = useMemo(() => test(time1), [time1]);

  function test(time1) {
    t1 == time1
    return t1
  }

  const { data, error ,mutate } = useSWR(
    gql`
      {
        allTodosSortedByTime {
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
  if (error) return (
    <>
    <Layout>

      <div className={styles.unlogin}>
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
          <div className={styles.todos}>
            {data.allTodosSortedByTime.data.map((todo) => (


              <div key={todo._id} className={styles.todo}
                 style={
                    todo.completed
                      ? { display: 'none' }
                      : { display: 'flex' }
                  }
              >


                <button onClick={() => settime1(todo.time) }>click</button>
          
                {() => settime1("13:00") }

                <div onChange={() => settime1(todo.time)}>time1 is {time1}</div>
                
                <div>time1 is {time1}</div>
                <div>calcResult is {calcResult}</div>

                <Image
                  src="/circle.svg"
                  alt="svg"
                  width={25}
                  height={25}
                />

                <div className={styles.text}> 

                  <div className={styles.task}>
                    <Link href="/todo/[id]" as={`/todo/${todo._id}`}>
                      {todo.task}
                    </Link>
                  </div>
                  <div className={styles.time}>
                    {todo.time}
                  </div>

                </div>
              </div>
            ))}
          </div>
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

function incrementtime() {
  throw new Error('Function not implemented.');
}
