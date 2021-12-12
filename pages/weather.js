import Header from "../components/header"

import React, { Component } from 'react';
import { render } from 'react-dom';

class Exchange extends Component {
  constructor(props) {
    super(props);
    this.state = { //state初期化
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() { //render直後に行いたい処理を書くところ
    fetch("https://api.exchangeratesapi.io/latest") //api
      .then(res => res.json()) 
      .then(json => {
        console.log(json.rates);
        this.setState({
          isLoaded: true,
          items: json.rates
        });
      });
  }

  render() {
    var { items, isLoaded } = this.state;
console.log(items);
    if (!isLoaded) {
      return <div>...Loading</div>;
    } else {
      return (
        <div>
          <ul>
            {Object.keys(items).map(key => (
              <li key={key}>{key} - {items[key]}</li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Exchange;

if (typeof document !== 'undefined') {
  render(<Exchange />, document.getElementById('root'));
}