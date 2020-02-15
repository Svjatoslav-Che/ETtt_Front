import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from "react-bootstrap/Navbar";

class Bottom extends Component {
  render() {
    return (
      <Navbar expand="lg" variant="light" style={{backgroundColor: '#b8b5b2'}} fixed="bottom">
        <Container>
          <Navbar.Brand>{(new Date().getFullYear())}</Navbar.Brand>
        </Container>
      </Navbar>);
  }
}

export default Bottom;
