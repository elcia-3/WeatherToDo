import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
const today = new Date();

class SamplePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: new Date(),
    }
    this.getFormatDate = this.getFormatDate.bind(this);
  }
  getFormatDate(date) {
    return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日";
  }
  render() {
    return (
      <div>
        <DatePicker
          locale="ja"
          selected={this.state.day}
           minDate={today}
          
          onChange={(date) => this.setState({day: date})}
          customInput={<button>{this.getFormatDate(this.state.day)}</button>} />
      </div>
    );
  }
}
export default SamplePage;