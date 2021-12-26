import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import React, {useState} from "react";

const Calendar = () => {
/*  const initialDate = new Date()
  const [startDate, setStartDate] = useState(initialDate)
  const handleChange = (date) => {
    setStartDate(date)
  }
  */

  return (
    <>
    <input type="date" id="start" name="trip-start"
       value="2018-07-22"
       min="2018-01-01" max="2018-12-31"></input>
    <DatePicker
    dateFormat="yyyy-MM-dd"
    //customInput={<button>{this.getFormatDate(this.state.day)}</button>} />
    />



    </>
  )    
};

export default Calendar;