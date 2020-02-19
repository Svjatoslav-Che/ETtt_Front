import React, {Component} from 'react';
import Media from 'react-bootstrap/Media';
import customAvatar from '../../assets/images/anonymusAvatar.jpg';
import userAvatar from '../../assets/images/avatarUser.jpg';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';
import {deleteCommentFromServer} from '../../services/deleteCommentFromServer';
import {plusButtonAssesment} from '../../services/plusButtonAssesment';
import {minusButtonAssesment} from '../../services/minusButtonAssesment';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import {putCommentToServer} from '../../services/putCommentToServer';
import Form from 'react-bootstrap/Form';
import {getServerCommentsParentId} from '../../services/getServerCommentsParentId';
import CommentMainBlock from '../commentMainBlock/commentMainBlock';

const cookies = new Cookies();

class CommentMainBlockShadow extends Component {
  state = {
    commentBox: false,
    textValue: '',
    serverContentsParentId: null,
    serverResponde: false,
  }

  callback() {
    this.props.callback();
  }

  leaveCommentButtonClicked = async () => {
    putCommentToServer(
      (cookies.get('UserName')) ? cookies.get('UserName') : 'anonymus',
      cookies.get('UserToken'),
      this.state.textValue,
      this.props.data.id
    );
    this.setState({commentBox: false});
    await this.props.callback();
  }

  updateInputValue(e) {
    this.setState({textValue: e.target.value});
  }

  commentButtonClicked = async () => {
    this.setState({commentBox: !this.state.commentBox});
  }

  minusButtonClicked = async () => {
    minusButtonAssesment(this.props.data.id);
    await this.props.callback();
  }

  plusButtonClicked = async () => {
    plusButtonAssesment(this.props.data.id);
    await this.props.callback();
  }

  deleteButtonClicked = async () => {
    deleteCommentFromServer(this.props.data.id);
    await this.props.callback();
  }

  async init() {
    const serverContents = await getServerCommentsParentId(this.props.data.id);
    if (serverContents) {
      this.setState({serverContentsParentId: serverContents, serverResponde: true});
    }
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <div>

        <br/>
        {((this.props.authenticationRedux) & (cookies.get('UserToken') === this.props.data.userToken)) ?
          <Media>
            <img src={userAvatar} width={64} height={64} className="mr-3" alt="Some one"/>
            <Media.Body>
              <h5>{this.props.data.userName}</h5>
              <p>{this.props.data.commentText}</p>
              <ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
                <ButtonGroup aria-label="Edit / Delete group">
                  <p>Assessment: {this.props.data.assessment}</p>
                </ButtonGroup>
                <ButtonGroup aria-label="Assesment group">
                  {/*<Button variant="primary" size="sm" onClick={this.editButtonClicked}>Edit</Button>*/}
                  <Button variant="light" size="sm" onClick={this.deleteButtonClicked}>Delete</Button>
                </ButtonGroup>
              </ButtonToolbar>

              <br/>
              <Form>
                {(this.state.commentBox) ?
                  <div>
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
                    <br/>
                    <div style={{float: 'right'}}>
                      <Button variant="secondary" size="sm" onClick={this.commentButtonClicked}>I Remind</Button>
                    </div>
                  </div> :
                  <div>
                    <br/>
                    <div style={{float: 'right'}}>
                      <Button variant="secondary" size="sm" onClick={this.commentButtonClicked}>Comment</Button>
                    </div>
                  </div>}
              </Form>
              <br/>

              {(this.state.serverResponde) ?
                this.state.serverContentsParentId.result.map((data, i) =>
                  <CommentMainBlock key={data.id} data={data} callback={this.props.callback}/>)
                : ''
              }

            </Media.Body>
          </Media> :
          <Media>
            <img src={customAvatar} width={64} height={64} className="mr-3" alt="Some one"/>
            <Media.Body>
              <h5>{this.props.data.userName}</h5>
              <p>{this.props.data.commentText}</p>
              <ButtonToolbar className="justify-content-between" aria-label="Toolbar with Button groups">
                <ButtonGroup aria-label="Edit / Delete group">
                  <p>Assesment:{' '}{this.props.data.assessment}{' '}</p>
                </ButtonGroup>
                <ButtonGroup aria-label="Assesment group">
                  <Button variant="primary" size="sm" onClick={this.plusButtonClicked}> + </Button>
                  <Button variant="secondary" size="sm" onClick={this.minusButtonClicked}> - </Button>
                </ButtonGroup>
              </ButtonToolbar>

              <br/>
              <Form>
                {(this.state.commentBox) ?
                  <div>
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
                    <br/>
                    <div style={{float: 'right'}}>
                      <Button variant="secondary" size="sm" onClick={this.commentButtonClicked}>I Remind</Button>
                    </div>
                  </div> :
                  <div>
                    <br/>
                    <div style={{float: 'right'}}>
                      <Button variant="secondary" size="sm" onClick={this.commentButtonClicked}>Comment</Button>
                    </div>
                  </div>}
              </Form>
              <br/>

              {(this.state.serverResponde) ?
                this.state.serverContentsParentId.result.map((data, i) =>
                  <CommentMainBlock key={data.id} data={data} callback={this.props.callback}/>)
                : ''
              }

            </Media.Body>
          </Media>
        }

      </div>
    );
  }
}

const mapStateToProps = state => ({authenticationRedux: state.authenticationRedux});

export default connect(mapStateToProps)(CommentMainBlockShadow);
