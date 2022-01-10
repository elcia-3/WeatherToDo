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
  }
  render() {
    return (
      <div>
        <DatePicker
          locale="ja"
          selected={this.state.day}
          minDate={today}
          dateFormat="yyyy-MM-dd"
          onChange={(date) => this.setState({day: date})}
           />
      </div>
    );
  }
}
export default SamplePage;