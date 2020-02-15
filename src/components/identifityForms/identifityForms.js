import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Cookies from 'universal-cookie';
import {connect} from 'react-redux';

const cookies = new Cookies();

class IdentifityForms extends Component {
  state = {
    userName: '',
    textValue: '',
  }

  updateInputValue(e) {
    this.setState({textValue: e.target.value});
  }

  applyButtonClicked = () => {
    this.setState({userName: this.state.textValue});
    cookies.set('UserName', this.state.textValue, {path: '/'});
    this.props.AUTHENTIFICATION(true);
  }

  logoutButtonClicked = () => {
    cookies.remove('UserToken', {path: '/'});
    cookies.remove('UserName', {path: '/'});
    this.setState({userName: '', textValue: '',});
    this.props.AUTHENTIFICATION(false);
  }

  componentDidMount() {
    if (cookies.get('UserName') !== undefined)
      this.setState({userName: cookies.get('UserName')});
  }

  render() {
    return (
      <div>
        {(this.state.userName === '') ?
          <div>
            {(this.props.uservisit) ? <div><h5>Like this brunch?</h5></div> :
              <div><h5>Visited first?</h5></div>}
            <p>Enter Your name or nickname to be able to leave a comment.</p>
            <InputGroup className="justify-content-center">
              <FormControl
                placeholder="Enter your name"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={e => this.updateInputValue(e)}
              />
              <InputGroup.Append className="justify-content-center">
                {(this.state.textValue.length >= 1) ?
                  <Button variant="primary" active onClick={this.applyButtonClicked}>Apply</Button> :
                  <Button variant="primary" disabled>Apply</Button>}
              </InputGroup.Append>
            </InputGroup>
          </div> :
          <div>
            <h5>Hello, <b>{cookies.get('UserName')}</b></h5>
            <p>Not you? You can relogin. Previous settings will be unavailable.</p>
            <InputGroup className="justify-content-center">
              <Button variant="primary" active onClick={this.logoutButtonClicked}>Logout</Button>
            </InputGroup>
          </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {authenticationRedux: state.authenticationRedux};
};

const mapDispachToProps = dispatch => {
  return {AUTHENTIFICATION: (variable) => dispatch({type: "AUTHENTIFICATION", value: variable})};
};

export default connect(mapStateToProps, mapDispachToProps)(IdentifityForms);
