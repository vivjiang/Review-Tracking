import React, { Component } from 'react';


class Google extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={this.onInputChange}> Link Google </button>
      </div>
    );
  }
}

export default Google;
