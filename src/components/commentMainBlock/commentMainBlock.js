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

const COOKIES = new Cookies();

class CommentMainBlock extends Component {

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

  render() {
    return (
      <div>
        <br/>
        {((this.props.authenticationRedux) & (COOKIES.get('UserToken') === this.props.data.userToken)) ?
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
            </Media.Body>
          </Media>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {authenticationRedux: state.authenticationRedux};
};

export default connect(mapStateToProps)(CommentMainBlock);
