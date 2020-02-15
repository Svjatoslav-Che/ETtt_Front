import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import IdentifityForms from '../identifityForms/identifityForms';

let impressionSummary = null;

class Statistic extends Component {
  state = {
    commentsImpression: undefined,
  }

  componentDidMount() {
    for (let i = 0; i < this.props.data.length; i++)
      impressionSummary = impressionSummary + this.props.data[i].assessment;
    if (impressionSummary >= 10)
      this.setState({commentsImpression: 'Positive'});
    if (impressionSummary <= -10)
      this.setState({commentsImpression: 'Negative'});
    if ((impressionSummary < 10) & (impressionSummary > -10))
      this.setState({commentsImpression: 'Neutral'});
  }

  render() {
    return (
      <Container fluid style={{backgroundColor: '#b8b5b2'}}>
        <Row>
          <Col sm={6} style={{textAlign: 'center', paddingBottom: '16px', paddingTop: '12px'}}>
            <h5>Total comments: {this.props.data.length}</h5>
            <p>Summary impression: <b>{this.state.commentsImpression}</b></p>
          </Col>
          <Col sm={6} style={{textAlign: 'center', paddingBottom: '16px', paddingTop: '12px'}}>
            <IdentifityForms uservisit={this.props.uservisit}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Statistic;
