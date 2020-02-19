import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import CommentMainBlock from '../commentMainBlock/commentMainBlock';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import {putCommentToServer} from '../../services/putCommentToServer'

const cookies = new Cookies();

class CommentsContainer extends Component {
  state = {
    commentsQuantity: this.props.data.length,
    commentsShown: 0,
    contentStrip: [],
    textValue: '',
  }

  leaveCommentButtonClicked = async () => {
    putCommentToServer(
      (cookies.get('UserName')) ? cookies.get('UserName') : 'anonymus',
      cookies.get('UserToken'),
      this.state.textValue,
      null
    )
    await this.props.callback();
  }

  updateInputValue(e) {
    this.setState({textValue: e.target.value});
  }

  render() {
    return (
      <Col md={{span: 6, offset: 3}}>
        <Form>
          {(this.props.authenticationRedux) ?
            <div>
              <br/><h5>Leave a comment:</h5><br/>
              <InputGroup className="justify-content-center">
                <FormControl
                  placeholder="Enter your comment"
                  aria-label="Comment data"
                  aria-describedby="basic-addon2"
                  onChange={e => this.updateInputValue(e)}
                />
                <InputGroup.Append className="justify-content-center">
                  {(this.state.textValue.length >= 1) ?
                    <Button variant="primary" active onClick={this.leaveCommentButtonClicked}>Apply</Button> :
                    <Button variant="primary" disabled>Apply</Button>}
                </InputGroup.Append>
              </InputGroup>
            </div> :
            <div/>}
          <br/>
        </Form>
        {this.props.data.map((data, i) =>
          (data.parentId === null) ?
            <CommentMainBlock key={data.id} data={data} callback={this.props.callback}/> : <div key={i}/>
        )}
        <br/><br/>
      </Col>
    );
  }
}

const mapStateToProps = state => ({authenticationRedux: state.authenticationRedux});

export default connect(mapStateToProps)(CommentsContainer);

// {this.props.data.map((data, i) =>
//   (data.parentId === null) ?
//     <CommentMainBlock key={data.id} data={data} callback={this.props.callback}/> : <div/>
// )}
