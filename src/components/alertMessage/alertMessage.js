import React, {Component} from 'react';
import Alert from 'react-bootstrap/Alert';

class AlertMessage extends Component {
  render() {
    return (
      <Alert
        variant={this.props.variant}
        style={{textAlign: 'center'}}>
        {this.props.message}
      </Alert>);
  }
}

export default AlertMessage;
