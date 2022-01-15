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

  function  datemanagemant(){

    var timecheck: boolean[] = new Array(data?.allTodosSortedByTime.data.length);
    var i: number = 0;
    while(i <= data?.allTodosSortedByTime.data.length - 1 ){
     if(data?.allTodosSortedByTime.data[i-1]?.time == data?.allTodosSortedByTime.data[i]?.time ){
        timecheck[i] =  false;
      }else{
        timecheck[i] =  true;
      }
      ++i;
      if(i == data?.allTodosSortedByTime.data.length){
        break;
      }
    }

    function timebar(index){
      if(index == 0 ) return(
          <div className={styles.margin}>time is  {data?.allTodosSortedByTime.data[0].time}</div>
      )

      if(timecheck[index]) return(
          <div>time is {data?.allTodosSortedByTime.data[index].time}</div>
      )

      return(
        null
      )
    }


    return(
      <>
          <div className={styles.todos}>
            {data?.allTodosSortedByTime.data.map((todo, index) => (
              <>
              {timebar(index)}
              <div>index is {index}</div>
              <div key={todo._id} className={styles.todo}>

                  
                  <div className={styles.task}>
                    <Link href="/todo/[id]" as={`/todo/${todo._id}`}>
                      {todo.task}
                    </Link>
                  </div>
                  <div className={styles.time}>
                    {todo.time}
                  </div>
                </div>
              </>
            ))}
          </div>
      </>
    )
  }



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
    {datemanagemant()}
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
