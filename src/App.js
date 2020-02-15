import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import {getServerComments} from './services/getServerComments';
import {generateSubToken} from './services/generateSubToken';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Header from './components/header/Header';
import Bottom from './components/bottom/bottom';
import CommentsContainer from './components/commentsContainer/commentsContainer';
import Statistic from './components/statistic/statistic';
import AlertMessage from './components/alertMessage/alertMessage';
import {connect} from 'react-redux';

const cookies = new Cookies();
let visitedState = false;

class App extends Component {
  state = {
    serverResponded: false,
    serverContents: null,
  }

  constructor(props) {
    super(props);

    this.callback = this.callback.bind(this);
  }

  checkCookies() {
    if (cookies.get('UserToken')) {
      visitedState = true;
      this.props.AUTHENTIFICATION(true);
    } else {
      cookies.set('UserToken', generateSubToken(), {path: '/'});
      this.props.AUTHENTIFICATION(true);
    }
  }

  async init() {
    this.checkCookies();
    const serverContents = await getServerComments();

    if (serverContents) {
      this.setState({serverResponded: true, serverContents});
    }
    console.log(serverContents.result);
  }

  async callback() {
    this.init();
  }

  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Header/>
          {(this.state.serverResponded) ?
            <div>
              <Statistic data={this.state.serverContents.result} uservisit={visitedState}/>
              <CommentsContainer data={this.state.serverContents.result} callback={this.callback}/>
            </div> :
            <AlertMessage variant={'info'} message={'Awaiting server response'}/>}
        </Container>
        <br/><br/>
        <Bottom/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticationRedux: state.authenticationRedux
});

const mapDispachToProps = dispatch => ({
  AUTHENTIFICATION: variable => dispatch({
    type: 'AUTHENTIFICATION',
    value: variable
  })
});

export default connect(mapStateToProps, mapDispachToProps)(App);
