import Header from "../components/header"
import React, { Component } from 'react';
import { render } from 'react-dom';

type Props = {
  name: string,
  weatherMain: string,
  temp :Number
};

const App = ({ name, weatherMain, temp }: Props) => {
  return (
    <>
      <div>{name}</div>
      <div>{weatherMain}</div>
      <div>{temp}℃</div>
    </>
  )
};

var city = 'Shizuoka';
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=b444cb1382145c9a52fed5d6a9180ce6";

export async function getServerSideProps() {
  const json = await fetch(url).then((r) => r.json());
  const name = json.name;
  const weatherMain = json.weather[0].main;
  const gettemp = parseFloat(json.main.temp) - 273.15;
  const temp = gettemp.toFixed(1);
  return {
    props: {
      name,
      weatherMain,
      temp
    },
  };
}
 
export default App;