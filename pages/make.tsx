import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';

import "react-datepicker/dist/react-datepicker.css"

const Today = new Date();
const today = new Date();

const kkk = "2021-10-10"

function SamplePage() {
   const [date, setdate] = useState(kkk);
   const [count, setCount] = useState(0); 
   const [string, setString] = useState("make"); 

    return (
        <>
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
            Click me
            </button>
        </div>
        <div>
            <p>date {date}</p>
            <p>{today.getFullYear() +"-"+ today.getMonth() + "-" + today.getDate()}</p>
            <p>date {string}</p>
            <button onClick={() => setString("opgg")}>
            Click me
            </button>
        </div>
                 <DatePicker
                    dateFormat="yyyy/MM/dd"
                    locale='ja'
                    selected={Today}
                    minDate={Today}
                  />
        <div>
            <input type="date"></input>
        </div>
    </>
    );
}
export default SamplePage;