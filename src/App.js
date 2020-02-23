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
let sKey = 0;

class App extends Component {
  state = {
    serverResponded: false,
    serverContents: null,
    innerKey: 0,
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
      this.setState({serverResponded: true, serverContents: serverContents});
      sKey = Math.floor(Math.random() * 99999999);
    }
  }

  async callback() {
    console.log('callback run')
    this.init();
  }


  componentDidMount() {
    this.init();
    // setInterval(
    //   () => {
    //     if (this.props.needToRerender) {
    //       this.props.NEEDTORERENDER(false);
    //       this.init();
    //     }
    //   },
    //   100)
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Header/>
          {(this.state.serverResponded) ?
            <div>
              <Statistic data={this.state.serverContents.result} uservisit={visitedState}/>
              <CommentsContainer
                data={this.state.serverContents.result}
                callback={this.callback}
                sKey={sKey}
              />
            </div> :
            <AlertMessage variant={'info'} message={'Awaiting server response'}/>}
        </Container>
        <br/><br/>
        {/*{(this.props.needToRerender === true) ? this.init : ''}*/}
        <Bottom/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticationRedux: state.authenticationRedux,
  needToRerender: state.needToRerender,
});

const mapDispachToProps = dispatch => ({
  AUTHENTIFICATION: variable => dispatch({type: 'AUTHENTIFICATION', value: variable}),
  NEEDTORERENDER: variable => dispatch({type: 'NEEDTORERENDER', value: variable}),
});

export default connect(mapStateToProps, mapDispachToProps)(App);
