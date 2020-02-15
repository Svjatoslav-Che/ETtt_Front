import React, {Component} from 'react';
import bgimage from '../../assets/images/Cat_1920x840.jpg';
import Container from 'react-bootstrap/Container';

class Header extends Component {
  render() {
    return (
      <Container
        fluid
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: 'cover',
          textAlign: 'center',
          backgroundPositionY: 'center',
        }}>
        <br/><br/>
        <h1>What do you think about cats?</h1>
        <p><b>Leave a comment,<br/> or join our discussions</b></p>
        <br/><br/>
      </Container>);
  }
}

export default Header;
